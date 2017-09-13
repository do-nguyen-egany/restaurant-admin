import React from 'react';
import Parse from 'parse';
class User extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            showChangePassword:false,
            newPassword:'',
            confirmPassword:'',
            btnChangePasswordText:'Change password'
        };

        this.changePassword = this.changePassword.bind(this);
    }
    changePassword()
    {
        let currentUser = Parse.User.current();
        let id = currentUser.id;
        let username = currentUser.get('username');
        let state = this.state;
        if( !state.newPassword || !state.confirmPassword)
        {
            alert('password must has value');
        }
        else{
            let self  = this;
            if(state.newPassword !== state.confirmPassword)
            {
                alert('confirm password must equal new password');
            }
            else{
                this.setState({btnChangePasswordText:'saving....'});
                let query = new Parse.Query(Parse.User);
                query.get(id,{
                    success: function(u) {
                        u.set('password',state.newPassword);
                        u.save(null,{
                            success: function(results) {
                                alert('saved');
                                self.setState({btnChangePasswordText:'Change password'});
                                //relogin
                                Parse.User.logIn(username, state.newPassword, {
                                    success: function(user) {

                                    },
                                    error: function(user, error) {
                                        alert('Invalid user name or password');
                                    }
                                });
                            },
                            error: function(error) {
                                alert("Error: " + error.code + " " + error.message);
                            }
                        });
                    },
                    error: function(error) {
                        alert("Error: " + error.code + " " + error.message);
                    }
                })
            }
        }
    }

    render() {
        let currentUser = Parse.User.current();
        return (
            <div>
                <div className="row">
                    <div className="d-table header-table" >
                        <div className="d-table-cell">
                            <h2>
                                {currentUser.get('username')}
                            </h2>
                        </div>
                        <div className="d-table-cell text-right">

                        </div>
                    </div>
                </div>
                <div className="page-content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="form-group">
                                <label>Username</label>
                                <input className="form-control"
                                       value={currentUser.get('username')} disabled={true}/>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input className="form-control"
                                       value={currentUser.get('email')} disabled={true}/>
                            </div>
                            <div className="form-group">
                                <button className="btn bnt-sm"
                                        onClick={()=>{this.setState({
                                            showChangePassword: !this.state.showChangePassword
                                        })}}>
                                    Change password
                                </button>
                            </div>
                            <div className={this.state.showChangePassword ? '' : 'hide'}>

                                <div className="form-group">
                                    <label>New password</label>
                                    <input type="password" className="form-control"
                                           onChange={(e)=>{
                                               this.setState({newPassword:e.target.value})
                                           }}
                                           value={this.state.newPassword}/>
                                </div>
                                <div className="form-group">
                                    <label>Confirm password</label>
                                    <input type="password" className="form-control"
                                           onChange={(e)=>{
                                               this.setState({confirmPassword:e.target.value})
                                           }}
                                           value={this.state.confirmPassword}/>
                                </div>
                                <div className="form-group ">
                                   <button className="btn btn-sm"
                                           onClick={()=>{this.setState({
                                                showChangePassword: false
                                        })}}>
                                       Cancel
                                   </button>
                                    <button onClick={this.changePassword}
                                            style={{marginLeft:'10px'}} className="btn btn-sm btn-primary">
                                        {this.state.btnChangePasswordText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount()
    {

    }

}

export default User;