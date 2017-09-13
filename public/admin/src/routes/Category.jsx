import React from 'react';
import Parse from 'parse';
import CategoryModel from '../models/CategoryModel';
import {browserHistory} from 'react-router';

class Category extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            id: 0,
            currentCategory:{},
            name:''
        };
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.getCategory = this.getCategory.bind(this);

    }
    getCategory(id)
    {
        let CategoryInstance = new CategoryModel();
        let query = new Parse.Query(CategoryInstance);
        let self = this;
        query.get(id, {
            success: function(g) {
                self.setState({
                    currentCategory:g,
                    name:g.get('name')
                });
            },
            error: function(object, error) {
                alert('not found');
            }
        });
    }
    save()
    {
        let state = this.state;
        let id = state.id;
        let c = new CategoryModel();
        if(id!=0)
        {
            c = state.currentCategory;
        }
        c.set('name',state.name);
        c.save(null, {
            success: function(_c) {
                alert('saved');
                if(id==0)
                {
                    browserHistory.push('/category/'+_c.id);
                }
            },
            error: function(result, error) {
                alert('error:' + error.code);
            }
        });
    }
    delete()
    {
        let c = confirm('Delete?');
        if(c)
        {
            let g = this.state.currentCategory;
            g.destroy({
                success: function(myObject) {
                    alert('deleted');
                    browserHistory.push('/categories');
                },
                error: function(myObject, error) {

                }
            });
        }
    }



    render() {
        let id = this.state.id;
        let state = this.state;
        return (
            <div >
                <div className="row">
                    <div className="d-table header-table" >
                        <div className="d-table-cell">
                            <h2>
                                {id == 0 ? 'New category' : state.name}
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
                                <input className="form-control" type="text" value={state.name}
                                        onChange={(e)=>{this.setState({name:e.target.value})}} />
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
            id:this.props.params.id
        });
        if(id!=0)
        {
            this.getCategory(id);
        }
    }
    componentWillReceiveProps(newProps)
    {
        let id = newProps.params.id;
        this.setState({id:id});
        if(id!=0)
        {
            this.getCategory(id);
        }
    }

}

export default Category;