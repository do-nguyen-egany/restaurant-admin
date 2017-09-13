import React from 'react';
import {browserHistory} from 'react-router';
import Parse from 'parse';
class Login extends React.Component {

    constructor(props)
    {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            userName:'',
            password:'',
            loginBtnText: 'Login'
        };

    }
    login(e)
    {
        e.preventDefault();
        let self = this;
        this.setState({loginBtnText: 'Login.....'});
        let state = this.state;

        Parse.User.logIn(state.userName, state.password, {
            success: function(user) {
                self.setState({loginBtnText: 'Login'});
                browserHistory.push('/home');
            },
            error: function(user, error) {
                self.setState({loginBtnText: 'Login'});
                alert('Invalid user name or password');
            }
        });
        return false;
    }
    render(){
        let state = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="login-panel panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Please Sign In</h3>
                            </div>
                            <div className="panel-body">
                                <div role="form">
                                    <fieldset>
                                        <div className="form-group">
                                            <input className="form-control"
                                                   onChange={(e)=>{this.setState({userName:e.target.value})}}
                                                   placeholder="User name"
                                                   value={state.userName} />
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="Password"
                                                   onChange={(e)=>{this.setState({password:e.target.value})}}
                                                   name="password" type="password" value={state.password}/>
                                        </div>
                                        <button onClick={this.login}
                                                className="btn btn-lg btn-success btn-block">
                                            {state.loginBtnText}
                                            </button>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount()
    {
        let user = Parse.User.current();
        if(user)
        {
            browserHistory.push('/home');
        }

    }

}

export default Login;