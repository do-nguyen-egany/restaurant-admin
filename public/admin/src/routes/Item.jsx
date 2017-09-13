import React from 'react';
import Parse from 'parse';
import ItemModel from '../models/ItemModel';
import {browserHistory} from 'react-router';
import CategoryModel from '../models/CategoryModel';

class Item extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            id: 0,
            currentItem:{},
            name:'',
            price:0,
            categories:[],
            categoryID:0,
            description:''
        };
        this.getCategories = this.getCategories.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.getItem = this.getItem.bind(this);
    }

    getCategories()
    {
        let CategoryInstance = new CategoryModel();
        let query = new Parse.Query(CategoryInstance);
        let self = this;
        query.find({
            success: function(results) {
                self.setState({
                    categories: results
                });
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }
    getItem(id)
    {
        let ItemInstance = new ItemModel();
        let query = new Parse.Query(ItemInstance);
        let self = this;
        query.get(id, {
            success: function(g) {
                self.setState({
                    currentItem:g,name:g.get('name'),price:g.get('price'),description:g.get('description'),
                    categoryID:g.get('category') ? g.get('category').id : 0
                });
                document.getElementById("item-img").src = g.get('image').url();
            },
            error: function(object, error) {
                alert('not found');
            }
        });
    }

    save()
    {
        let state = this.state;
        let id = this.state.id;
        let newItem = new ItemModel();
        if(id!=0)
        {
            newItem = this.state.currentItem;
        }
        newItem.set('name',state.name);
        newItem.set('price',parseFloat(state.price));
        newItem.unset('category');
        newItem.set('description',state.description);
        state.categories.forEach(function (c) {
            if(c.id == state.categoryID)
            {
                newItem.set('category',c);
            }
        });
        newItem.save(null,{
            success: function(i) {
                if(document.getElementById("item-file").value != "")
                {
                    let fileUploadControl = $("#item-file")[0];
                    if (fileUploadControl.files.length > 0) {
                        let file = fileUploadControl.files[0];
                        let name = file.name;
                        let parseFile = new Parse.File(name, file);
                        parseFile.save().then(function() {
                            // save gallery
                            i.set("image", parseFile);
                            i.save(null, {
                                success: function(ii) {
                                    alert('saved');
                                    if(id==0)
                                    {
                                        browserHistory.push('/item/'+ii.id);
                                    }
                                },
                                error: function(__r, __err) {

                                }
                            });

                        }, function(error) {
                            console.log(error);
                        });
                    }

                }
                else{
                    alert('saved');
                    if(id==0)
                    {
                        browserHistory.push('/item/'+i.id);
                    }
                }


            },
            error: function(result, error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });

    }

    delete()
    {
        let c = confirm('Delete?');
        if(c)
        {
            let g = this.state.currentItem;
            g.destroy({
                success: function(myObject) {
                    alert('deleted');
                    browserHistory.push('/items');
                },
                error: function(myObject, error) {

                }
            });
        }
    }



    render() {
        let id = this.state.id;
        let state = this.state;
        let categories = state.categories.map(function (c,i) {
            return(
                <option key={'c-'+i} value={c.id}>
                    {c.get('name')}
                </option>
            )
        });
        return (
            <div>
                <div className="row">
                    <div className="d-table header-table" >
                        <div className="d-table-cell">
                            <h2>
                                {id == 0 ? 'New item' : state.name}
                            </h2>
                        </div>
                        <div className="d-table-cell text-right">
                            <button className="btn btn-primary"
                                    onClick={this.save} disabled={state.name.length < 1}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
                <div className="page-content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="form-group">
                                <label>Name</label>
                                <input className="form-control"
                                       type="text" value={state.name}
                                       onChange={(e)=>{this.setState({name:e.target.value})}} />
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <input className="form-control"
                                       type="text" value={state.price}
                                       onChange={(e)=>{this.setState({price:e.target.value})}} />
                            </div>
                            <div className="form-group">
                                <label>Main image</label>
                                <input id="item-file" type="file" accept="image/*"/>
                            </div>
                            <div className="form-group">
                                <img className="img-responsive" id="item-img" />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select className="form-control"
                                        onChange={(e)=>{this.setState({categoryID:e.target.value})}}
                                        value={state.categoryID}>
                                    <option value={'0'}>
                                        --Category--
                                    </option>
                                    {categories}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea className="form-control"
                                          onChange={(e)=>{this.setState({description:e.target.value})}}
                                          value={state.description}></textarea>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        {id!=0 ?
                            <button className="btn btn-danger" onClick={this.delete}>Delete</button>
                            :null
                        }
                    </div>
                </div>
            </div>
        );
    }



    componentDidMount()
    {
        let id = this.props.params.id;
        this.setState({
            id:id
        });
        document.getElementById("item-file").onchange = function () {
            let reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("item-img").src = e.target.result;
            };
            reader.readAsDataURL(this.files[0]);
        };
        this.getCategories();
        if(id!=0)
        {
            this.getItem(id);
        }

    }
    componentWillReceiveProps(newProps)
    {
        let id = newProps.params.id;
        this.setState({id:id});
        if(id!=0)
        {
            this.getItem(id);
        }

    }

}

export default Item;