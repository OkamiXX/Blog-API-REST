//--------------------------------------------------------------------------------------------//

// Imports fundamental packages for the server.
const express = require('express');
const cors = require('cors');
const routes = require('./routes')

// Deconstructs the connection function from the db folder.
const {connection} = require('./db/connection');

// Connects to the DB
connection();

//--------------------------------------------------------------------------------------------//

// Stores the express function.
const app = express();
const PORT = process.env.PORT || 3001;

//--------------------------------------------------------------------------------------------//

// MIDDLEWARE
// Cors set-up
app.use(cors());
// JSON body parser for the body object.
app.use(express.json());


app.use(routes);



// Server creation.
app.listen(PORT, () => {
    // Logs to the console once the express server is connected.
    console.log(`\nServer running on port : ${PORT}: 
Feel free to open http://localhost:${PORT}/ if you are a DEV like me :)`)
})
