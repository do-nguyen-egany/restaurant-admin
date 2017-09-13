import React from 'react';
import Parse from 'parse';
import {browserHistory} from 'react-router';
import Header from './components/Header.jsx';
class App extends React.Component {

    constructor(props)
    {
        super(props);


    }

    render() {
        return (
            <div id="wrapper">
                <Header/>
                <main id="page-wrapper">
                    {this.props.children}
                </main>
            </div>
        );
    }

    componentDidMount()
    {
        let user = Parse.User.current();
        if(!user)
        {
            browserHistory.push('/login');
        }
        else{
            //browserHistory.push('/home');
        }
    }

}

export default App;