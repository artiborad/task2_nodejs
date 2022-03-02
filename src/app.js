const express = require("express")
const mongoose = require("mongoose")
const app = express()
const proRoute = require("./stock_table/routers/router")
const cartRoute = require("./cart_table/routers/router")



const dbURI="mongodb+srv://arti:arti1234@cluster0.yj4az.mongodb.net/loginapi?retryWrites=true&w=majority"


app.use(express.json())
app.use("/req",proRoute)
app.use("/cart",cartRoute)



mongoose.connect(dbURI , {useNewUrlParser: true}).then(()=>{
    console.log("connection sucessfully")
}).catch((error)=>{
    console.log("not connnected"+error)
})
const jwt =require("jsonwebtoken")
// const fun =async ()=>{
//     const token = jwt.sign({"_id":"abc123"},"thisisanewtoken")
//     console.log(token)
// }
// fun()
app.listen(9000, () => {console.log("Server started: 9000")})