require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://admin123:${encodeURIComponent(process.env.MONGOOSE_PASS)}@cluster0.e8eumsa.mongodb.net/BloodCamp?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, ()=>{
    console.log("MongooDB is connected in Atlas");
})

// mongoose.connect("mongodb://localhost:27017/bloodcamp-api", {useNewUrlParser:true, useUnifiedTopology:true}, () => {
//     console.log("mongdb is connected in localhost");
// });