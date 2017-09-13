import React from 'react';
import Parse from 'parse';
import ContactModel from '../models/ContactModel';

class Contact extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            name:'',
            phone:'',
            map:'',
            facebook:'',
            email:''
        };
        this.save = this.save.bind(this);

    }
    save()
    {
        let ContactInstance = new ContactModel();
        let query = new Parse.Query(ContactInstance);
        let state = this.state;
        query.find({
            success: function(results) {
                let c = new ContactModel();
                if(results.length > 0)
                {
                    c = results[0];
                }
                c.set('name',state.name);
                c.set('phone',state.phone);
                c.set('map',state.map);
                c.set('facebook',state.facebook);
                c.set('email',state.email);
                c.save(null,{
                    success: function(g) {
                        alert('saved');
                    },
                    error: function(cc, error) {
                    }
                });
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }

    render() {
        let state = this.state;
        return (
            <div>
                <div className="row">
                    <div className="d-table header-table" >
                        <div className="d-table-cell">
                            <h2>
                                Contact
                            </h2>
                        </div>
                        <div className="d-table-cell text-right">
                            <button onClick={this.save} className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
                <div className="page-content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="form-group">
                                <label>Name</label>
                                <input className="form-control"
                                       value={state.name}
                                       onChange={(e)=>{this.setState({name:e.target.value})}}/>
                                <p className="help-block">Name of restaurant</p>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input className="form-control"
                                       value={state.email}
                                       onChange={(e)=>{this.setState({email:e.target.value})}}/>
                                <p className="help-block">Email of restaurant</p>
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input className="form-control"
                                       value={state.phone}
                                       onChange={(e)=>{this.setState({phone:e.target.value})}}/>
                                <p className="help-block">Phone of restaurant</p>
                            </div>
                            <div className="form-group">
                                <label>Google map</label>
                                <input className="form-control"
                                       value={state.map}
                                       onChange={(e)=>{this.setState({map:e.target.value})}}/>
                                <p className="help-block">Map url of restaurant</p>
                            </div>
                            <div className="form-group">
                                <label>Facebook url</label>
                                <input className="form-control"
                                       value={state.facebook}
                                       onChange={(e)=>{this.setState({facebook:e.target.value})}}/>
                                <p className="help-block">Facebook url of restaurant</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount()
    {
        let ContactInstance = new ContactModel();
        let query = new Parse.Query(ContactInstance);
        let self = this;
        query.find({
            success: function(results) {
                if(results.length > 0)
                {
                    let c = results[0];
                    self.setState({
                        name: c.get('name'),
                        phone: c.get('phone'),
                        map: c.get('map'),
                        facebook: c.get('facebook'),
                        email: c.get('email')
                    });
                }

            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }

}

export default Contact;