import React from 'react';
import CONFIG from '../config';
import { Link } from 'react-router';
import Parse from 'parse';
import {browserHistory} from 'react-router';
class Header extends React.Component {

    constructor(props)
    {
        super(props);
        this.renderMenus = this.renderMenus.bind(this);
        this.logout = this.logout.bind(this);
    }
    logout()
    {
        Parse.User.logOut().then(() => {
            browserHistory.push('/login');
        });
    }

    renderMenus()
    {
        let menus = CONFIG.menus;
        return menus.map(function (menu,index) {
            return(
                <li key={`menu-${index}`}>
                    <Link to={menu.url}>
                        <i className={`fa ${menu.icon} fa-fw`}></i>
                        {menu.title}
                    </Link>
                </li>
            )
        });
    }

    render() {
        return (
            <nav className="navbar navbar-default navbar-static-top"
                 role="navigation" style={{marginBottom:0}} >
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle"
                            data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="/">ADMIN</a>
                </div>

                <ul className="nav navbar-top-links navbar-right">

                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                            <i className="fa fa-user fa-fw"></i> <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <Link to="/user">
                                    <i className="fa fa-user fa-fw"></i>
                                    {'Profile'}
                                </Link>
                            </li>
                            <li>
                                <a onClick={this.logout} href="javascript:void(0)">
                                    <i className="fa fa-sign-out fa-fw"></i>
                                    Logout
                                </a>
                            </li>
                        </ul>

                    </li>

                </ul>


                <div className="navbar-default sidebar" role="navigation">
                    <div className="sidebar-nav navbar-collapse">
                        <ul className="nav">
                            {this.renderMenus()}
                        </ul>
                    </div>

                </div>

            </nav>
        );
    }

}

export default Header;