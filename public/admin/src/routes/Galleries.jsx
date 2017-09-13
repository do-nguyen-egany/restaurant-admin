import React from 'react';
import { Link } from 'react-router'
import Parse from 'parse';
import GalleryModel from '../models/GalleryModel';
class Galleries extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            galleries:[]
        };
        this.renderGalleries = this.renderGalleries.bind(this);

    }

    renderGalleries()
    {
        return this.state.galleries.map(function (g,i) {
            let photo = g.get("image");
            return(
                <div key={'g-'+i} className="col-xs-12 col-sm-6 col-md-3" style={{marginBottom:'10px'}}>
                    <Link  to={`/gallery/${g.id}`}
                           style={{padding:'20px', display:'block', border:'1px solid #d4d4d4'}}>
                        <img src={photo.url()}
                             className="img-responsive center-block"
                             style={{height:200}} />
                    </Link>
                </div>
            )
        })
    }

    render() {
        return (
            <div >
                <div className="row">
                    <div className="d-table header-table" >
                        <div className="d-table-cell">
                            <h2>
                                Galleries
                            </h2>
                        </div>
                        <div className="d-table-cell text-right">
                            <Link className="btn btn-primary" to="/gallery/0">{'Add new gallery'}</Link>
                        </div>
                    </div>
                </div>
                <div className="page-content">
                    <div className="row">
                        {this.renderGalleries()}
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount()
    {
        let Gallery = new GalleryModel();
        let query = new Parse.Query(Gallery);
        let self = this;
        query.find({
            success: function(results) {
                self.setState({
                    galleries: results
                });
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }

}

export default Galleries;