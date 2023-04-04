const express = require('express')
const {auth} = require('express-openid-connect');

const app = express();
//setting view engine

app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));

app.listen(3000);

//PUT CALLBACK URL AND LOGOUT URL IN AUTH0 WEBSITE
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'wigIGwWHVWbprP06oFsyfsj2ES1jimAZ',
  issuerBaseURL: 'https://dev-27uosa110wk5thd2.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    console.log(req.oidc.isAuthenticated());
    res.render('index',{isAuthenticated:req.oidc.isAuthenticated()});
});