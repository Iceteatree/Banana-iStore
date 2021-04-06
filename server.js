// importing all the relevant modules needed to run the server
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

require('dotenv').config();
require('isomorphic-fetch');

// Initialising express with a variable name of app
const app = express();

// Using the body parser and helmet middleware so that I can pass data from frontend as well as have some basic security for the backend.
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(helmet());

// Testing to see if the server is online
app.get('/', (req, res) => {
    res.send("Server is working");
})

// Post request basically passing data from the frontend to the backend which then fetches the data from the API and then sends it back to the frontend
app.post('/search', (req, res) => {
    let rawSearch = req.body.search;
    let option = req.body.option;
    // This is so that the format of the search bar is correct for the api
    let term = rawSearch.split(" ").join("+");
    let url = `https://itunes.apple.com/search?term=${term}&media=${option}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.send(err);
    });
});

// Express needs to serve up resources that have been built from React App.
if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'banana-istore-frontend/build')));
    app.get('*',(req,res)=>
    {res.sendFile(path.resolve(__dirname,
    'banana-istore-frontend', 'build','index.html'));
  });
}


// Server is listening to environmental variables on hidden .env file.
app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}/`)
});
