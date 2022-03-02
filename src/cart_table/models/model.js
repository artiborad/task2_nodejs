const mongoose = require('mongoose')
const stock_table=require("../../stock_table/models/model")
const cartSchema = mongoose.Schema({
    product_id: {
        type: Number,
        required: true
    },
    // id: {
    //     type: Number,
    //     required: true
    // },
    quantity:{
            type:Number,
            require:true
        }
});


const cart_table = mongoose.model('cart_table', cartSchema)
// module.exports = new mongoose.model("cart_table", cartSchema)
module.exports = cart_table