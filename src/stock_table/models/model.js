const validator=require("validator")
const mongoose=require("mongoose")
const stockSchema = mongoose.Schema({
    product_id:{
        type:Number,
        required:true
    },
    product_name:{
        type:String,
        require:true
    },
    count:{
        type:Number,
        required:true
    },
    owner_email:{
        type:String,
        require:true,
        validator(value){
            if (!validator.isEmail(value)) {
              throw new Error("email is invalid")
            }
          }

    }
},{
    timestamps:true
})

// const cartSchema = mongoose.Schema({
//     product_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref:"cart"
//     },
//     id: {
//         type: String,
//         required: true
//     },
//     quantity:{
//             type:Number,
//             require:true
//         }
// });




const stock_table = mongoose.model("stock_table",stockSchema)
module.exports = stock_table;
// module.exports=new  mongoose.model("stock_table",stockSchema)
// module.exports=mongoose.model("cart_table",cartSchema)