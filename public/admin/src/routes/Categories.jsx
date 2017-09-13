import React from 'react';
import { Link } from 'react-router'
import Parse from 'parse';
import CategoryModel from '../models/CategoryModel';
class Categories extends React.Component {

    constructor(props)
    {
        super(props);
        this.state={
            categories:[]
        }

    }



    render() {
        let rows = this.state.categories.map(function (c,i) {
            return(
                <tr key={`c-${i}`}>
                    <td>
                        {c.id}
                    </td>
                    <td>
                        {c.get('name')}
                    </td>
                    <td>
                        <Link to={`/category/${c.id}`}>
                            Edit
                        </Link>
                    </td>
                </tr>
            )
        });
        return (
            <div >
                <div className="row">
                    <div className="d-table header-table" >
                        <div className="d-table-cell">
                            <h2>
                                Categories
                            </h2>
                        </div>
                        <div className="d-table-cell text-right">
                            <Link className="btn btn-primary" to="/category/0">{'Add new category'}</Link>
                        </div>
                    </div>
                </div>
                <div className="page-content">
                    <div className="row">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {rows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount()
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

}

export default Categories;