import React from 'react';
import Parse from 'parse';
import GalleryModel from '../models/GalleryModel';
import {browserHistory} from 'react-router';

class Gallery extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            id: 0,
            currentGallery:{}
        };
        this.save = this.save.bind(this);
        this.getGallery = this.getGallery.bind(this);
        this.delete = this.delete.bind(this);

    }
    delete()
    {
        let c = confirm('Delete?');
        if(c)
        {
            let g = this.state.currentGallery;
            g.destroy({
                success: function(myObject) {
                    alert('deleted');
                    browserHistory.push('/galleries');
                },
                error: function(myObject, error) {

                }
            });
        }
    }
    save()
    {
        let id = this.state.id;
        if(document.getElementById("file").value != "") {
            let fileUploadControl = $("#file")[0];
            if (fileUploadControl.files.length > 0) {
                let file = fileUploadControl.files[0];
                let name = file.name;
                let parseFile = new Parse.File(name, file);
                let newGallery = new GalleryModel();
                if(id!=0)
                {
                    newGallery = this.state.currentGallery;
                }
                parseFile.save().then(function() {
                    // save gallery
                    newGallery.set("image", parseFile);
                    newGallery.save(null, {
                        success: function(g) {
                            alert('saved');
                            if(id==0)
                            {
                                browserHistory.push('/gallery/'+g.id);
                            }
                        },
                        error: function(gameScore, error) {

                        }
                    });

                }, function(error) {
                    console.log(error);
                });
            }
        }
        else{
            alert('Please choose image');
        }
    }

    render() {
        let id = this.state.id;
        let g = this.state.currentGallery;
        return (
            <div >
                <div className="row">
                    <div className="d-table header-table" >
                        <div className="d-table-cell">
                            <h2>
                                {id == 0 ? 'New gallery' : (g ? g.get('image').name() : g.id)}
                            </h2>
                        </div>
                        <div className="d-table-cell text-right">
                            <button className="btn btn-primary" onClick={this.save}>Save</button>
                        </div>
                    </div>
                </div>
                <div className="page-content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="form-group">
                                <label>Upload image</label>
                                <input id="file" type="file" accept="image/*"/>
                            </div>
                            <div className="form-group">
                                <img className="center-block img-responsive" id="img" />
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

    getGallery(id)
    {
        let GalleryInstance = new GalleryModel();
        let query = new Parse.Query(GalleryInstance);
        let self = this;
        query.get(id, {
            success: function(g) {
                self.setState({
                    currentGallery:g
                });
                document.getElementById("img").src = g.get('image').url();
            },
            error: function(object, error) {
                alert('not found');
            }
        });
    }

    componentDidMount()
    {
        let id = this.props.params.id;
        this.setState({
            id:this.props.params.id
        });
        document.getElementById("file").onchange = function () {
            let reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("img").src = e.target.result;
            };
            // read the image file as a data URL.
            reader.readAsDataURL(this.files[0]);
        };
        if(id!=0)
        {
            this.getGallery(id);
        }
    }
    componentWillReceiveProps(newProps)
    {
        let id = newProps.params.id;
        this.setState({id:id});
        if(id!=0)
        {
            this.getGallery(id);
        }
    }

}

export default Gallery;