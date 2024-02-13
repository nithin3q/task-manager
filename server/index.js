require("dotenv").config();
require('express-async-errors');
const connectDB = require("./db/connect");
const express = require("express");
const cors = require('cors')
const app = express();
const mainRouter = require("./routes/user");
const taskRoutes = require("./routes/taskRoutes");

app.use(express.json());

app.use(cors())
app.use("/api/v1", mainRouter);
app.use('/tasks', taskRoutes);

const port = process.env.PORT || 3000;

const start = async () => {

    try {        
        await connectDB(process.env.MONGO_URI || 'mongodb+srv://nithinappari:75nlIXu4s977F7U6@cluster0.7ljelcs.mongodb.net/?retryWrites=true&w=majority');
        

        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })

    } catch (error) {
       console.log(error); 
    }
}

start();

