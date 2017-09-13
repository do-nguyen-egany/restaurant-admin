const CONFIG = {
    PARSER_SERVER:{
        APP_ID: window.APP_ID,
        URL: `http://${window.PARSE_HOST}:1337/parse`
    },
    menus:[
        {
            title:'Dashboard',icon:'fa-dashboard',url:'/home'
        },
        {
            title:'Gallery',icon:'fa-file-image-o',url:'/galleries'
        },
        {
            title:'Categories',icon:'fa-file-image-o',url:'/categories'
        },
        {
            title:'Items',icon:'fa-tag',url:'/items'
        },
        {
            title:'Contact',icon:'fa-file-text-o ',url:'/contact'
        }
    ]
}

export default CONFIG;