require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session')
const authCT = require('./controller/authController')
const itemsCT = require('./controller/itemsController')

const app = express()
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, console.log(`${SERVER_PORT} bugs in the code`))
})

app.use( express.static( `${__dirname}/../build` ) );
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24*3
    }
}))

// User account endpoints
app.post('/auth/register', authCT.register);
app.get('/auth/user', authCT.userData)
app.put('/auth/login', authCT.login);
app.delete('/logout', authCT.logout)
app.put('/auth/update', authCT.updateUser)

// Items list endpoints
app.get('/getItems', itemsCT.getItems)
app.get('/getcategorys', itemsCT.getItemsCategorys)
app.put('/get-category-points', itemsCT.getItemsCategoryPoints)
app.post('/create-new-item-post', itemsCT.createNewItemPost)
app.get(`/get-user-posted-items/:id`, itemsCT.getUsersListedItems)
app.delete(`/delete-posted-item/:id`, itemsCT.deletePostedItem)
app.get(`/search-items-by-title`, itemsCT.searchByTitle)
app.get(`/search-items-by-category`, itemsCT.searchByCategory)

// items array endpoints


// Endpoints for testing
// app.get('/auth/allUsers', authCT.allUsers)