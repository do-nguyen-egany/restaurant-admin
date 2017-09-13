import React from 'react';
import { Link } from 'react-router'
import Parse from 'parse';
import ItemModel from '../models/ItemModel';
class Items extends React.Component {

    constructor(props)
    {
        super(props);
        this.state={
            items:[],
            perPage:5,
            currentPage:1,
            totalItems:0,
            search:''
        };
        this.getItems = this.getItems.bind(this);
        this.paging = this.paging.bind(this);
        this.pagingWithDir= this.pagingWithDir.bind(this);
        this.changeSearch = this.changeSearch.bind(this);

    }
    changeSearch(e)
    {
        let self = this;
        if (e.key === 'Enter') {
            this.setState({
                currentPage:1,
            },function () {
                self.getItems();
            });
        }

    }



    render() {
        let rows = this.state.items.map(function (item,i) {
            return(
                <tr key={`item-${i}`}>
                    <td>
                        {item.id}
                    </td>
                    <td>
                        {
                            item.get('image') ?
                                <img style={{height:'60px'} }
                                src={item.get('image').url()} className="img-responsive center-block"/>
                                :null
                        }
                    </td>
                    <td>
                        {item.get('name')}
                    </td>
                    <td>
                        {item.get('price')}
                    </td>
                    <td>
                        {item.get('category') ? item.get('category').get('name') : '' }
                    </td>
                    <td>
                        <Link to={`/item/${item.id}`}>
                            Edit
                        </Link>
                    </td>
                </tr>
            )
        });
        let total = this.state.totalItems;
        let totalPage = Math.ceil(total/this.state.perPage);
        let currentPage = this.state.currentPage;
        let pages = (Array(totalPage).fill(0)).map(function (i,index) {
            let page = index+1;
            return(

                <li key={`page-${index}`} className={page==currentPage ? 'active' : ''}>
                    <a onClick={()=>{this.paging(page)}} href="javascript:void(0)">{page}</a>
                </li>
            )
        },this);

        return (
            <div >
                <div className="row">
                    <div className="d-table header-table" >
                        <div className="d-table-cell">
                            <h2>
                                Items
                            </h2>
                        </div>
                        <div className="d-table-cell text-right">
                            <Link className="btn btn-primary" to="/item/0">{'Add new item'}</Link>
                        </div>
                    </div>
                </div>
                <div className="page-content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="form-inline">
                                <div className="form-group" style={{float:'right'}}>
                                    <input placeholder="Search product name"
                                           value={this.state.search}
                                           onKeyPress={this.changeSearch}
                                           onChange={(e)=>{this.setState({search:e.target.value})}}
                                           className="form-control"/>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <table className="table table-items">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {rows}
                            </tbody>
                        </table>
                    </div>

                    <div className="row">
                        <div className="col-xs-12 col-md-3">
                            <div className="form-inline">
                                <div className="form-group">
                                    <label>Per page:</label>
                                    <select className="form-control"
                                            onChange=
                                            {(e)=>
                                                {
                                                let self = this;
                                                this.setState(
                                                    {
                                                        perPage:parseInt(e.target.value)
                                                    },function () {
                                                        self.paging(currentPage)
                                                    });
                                                }
                                            }
                                            value={this.state.perPage}>
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={15}>15</option>
                                        <option value={30}>30</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-9">
                            <nav aria-label="Page navigation " className="text-center">
                                <ul className="pagination " style={{margin:0}}>
                                    <li className={(currentPage == 1 ) ? 'disabled' : ''}>
                                        <a onClick={()=>{this.pagingWithDir(false)}}
                                           href="javascript:void(0)" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                        </a>
                                    </li>
                                    {pages}
                                    <li className={(currentPage >= totalPage ) ? 'disabled' : ''}>
                                        <a onClick={()=>{this.pagingWithDir(true)}} href="javascript:void(0)" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                    </div>

                </div>
            </div>
        );
    }

    getItems()
    {
        let ItemInstance = new ItemModel();
        let query = new Parse.Query(ItemInstance);
        query.contains('name',this.state.search);

        let self = this;
        //get total first
        query.count({
            success: function(count) {
                self.setState({
                    totalItems: count
                },function () {
                    let queryItems = new Parse.Query(ItemInstance);
                    queryItems.contains('name',this.state.search);
                    queryItems.include("category");
                    queryItems.limit(this.state.perPage);
                    queryItems.skip(this.state.perPage*(this.state.currentPage-1));
                    queryItems.find({
                        success: function(results) {
                            self.setState({
                                items: results
                            });
                        },
                        error: function(error) {
                            alert("Error: " + error.code + " " + error.message);
                        }
                    });
                });
            },
            error: function(error) {

            }
        });
    }

    paging(page)
    {
        let self = this;
        self.setState({
            currentPage:page
        },function () {
            self.getItems();
        });
    }

    pagingWithDir(isNext=true)
    {
        let p = this.state.currentPage;
        let total = this.state.totalItems;
        let totalPage = Math.ceil(total/this.state.perPage);
        let newPage = isNext ? (p+1) : p-1;
        if(newPage != p && newPage <= totalPage )
        {
            this.paging(newPage)
        }

    }

    componentDidMount()
    {

        this.getItems();
    }

}

export default Items;