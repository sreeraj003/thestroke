// require('dotenv').config()
// const mongoose = require('mongoose')

// const connect = ()=>{const mongoose = require('mongoose')
// mongoose.set('strictQuery', false);
// mongoose.connect(process.env.MONGOOSE_URL+process.env.MONGOOSE_COLLECTION,{useNewUrlParser: true})}

// module.exports ={ connect}

require("dotenv").config();
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.t6fbeqt.mongodb.net/stroke?retryWrites=true&w=majority`;
const connect = () => {
    
    const mongoose = require("mongoose");
    mongoose.set('strictQuery', true);
    mongoose
    .connect(uri)
    .then(() => console.log("mongo connected"))
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
};
module.exports = {
    connect
     
};