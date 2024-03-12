const express = require('express');
const mongoose = require('mongoose');
const { connectDB } = require('./config/DB');
const AuthRouter = require('./Routes/AutherRouts');
const blogRouter = require('./Routes/BlogRouter');
const CmtRouter = require('./Routes/CmtRouter');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

connectDB();

const app = express();
const PORT = process.env.PORT || 2222;

// Use CORS with specific options if needed
app.use(cors());
app.use(bodyParser.json());

app.get("/" ,(req, res) =>{   
   res.send("Project home page");  
    }
);
// Use express.json() for parsing the request body
app.use(express.json());

app.use('/Auther',AuthRouter);
app.use('/blogAuth',blogRouter);
app.use('/comment',CmtRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
});

// const express = require('express');
// const mongoose = require('mongoose');
// const { connectDB } = require('./config/DB');
// const AuthRouter = require('./Routes/AutherRouts');
// const blogRouter = require('./Routes/BlogRouter');
// const CmtRouter = require('./Routes/CmtRouter');
// const cors = require('cors');
// require('dotenv').config();

// connectDB();

// const app = express();
// const PORT = process.env.PORT || 2222;

// // Use CORS with specific options if needed
// app.use(cors());

// // Add the following middleware to handle CORS headers explicitly
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Update this with your frontend origin
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// app.get("/", (req, res) => {
//   res.send("Project home page");
// });

// // Use express.json() for parsing the request body
// app.use(express.json());

// app.use('/Auther', AuthRouter);
// app.use('/blogAuth', blogRouter);
// app.use('/comment', CmtRouter);

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
