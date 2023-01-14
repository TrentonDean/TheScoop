const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const port = 8000;

require('dotenv').config();
require('./config/mongoose.config');

app.use(cors({origin:"http://localhost:3000"}))
app.use(express.json());                           
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/user.routes");
userRoutes(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );