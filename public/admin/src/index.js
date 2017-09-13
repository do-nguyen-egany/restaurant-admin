import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route,browserHistory } from 'react-router';

import App from './App.jsx';
import Home from './routes/Home.jsx';
import Login from './routes/Login.jsx';
import NotFound from './routes/NotFound.jsx';
import Galleries from './routes/Galleries.jsx';
import Gallery from './routes/Gallery.jsx';
import Contact from './routes/Contact.jsx';
import Categories from './routes/Categories.jsx';
import Category from './routes/Category.jsx';
import Items from './routes/Items.jsx';
import Item from './routes/Item.jsx';
import User from './routes/User.jsx';

import Parse from 'parse';
import CONFIG from './config'
import GalleryModel from './models/GalleryModel';
import ContactModel from './models/ContactModel';
import CategoryModel from './models/CategoryModel';
import ItemModel from './models/ItemModel';

Parse.initialize(CONFIG.PARSER_SERVER.APP_ID);
Parse.serverURL = CONFIG.PARSER_SERVER.URL;
Parse.Object.registerSubclass('Gallery', GalleryModel);
Parse.Object.registerSubclass('Contact', ContactModel);
Parse.Object.registerSubclass('Contact', CategoryModel);
Parse.Object.registerSubclass('Item', ItemModel);

$(document).ready(function () {

    ReactDOM.render(
        <Router history={browserHistory} >
            <Route path="/" component={App} >
                <Route path="home" component={Home} />
                <Route path="galleries" component={Galleries} />
                <Route path="gallery/:id" component={Gallery} />
                <Route path="contact" component={Contact} />
                <Route path="categories" component={Categories} />
                <Route path="category/:id" component={Category} />
                <Route path="items" component={Items} />
                <Route path="item/:id" component={Item} />
                <Route path="user" component={User} />
            </Route>
            <Route path="/login" component={Login} >
            </Route>
            <Route path='*' component={NotFound} />
        </Router>
        ,
        document.getElementById('root')
    );

});