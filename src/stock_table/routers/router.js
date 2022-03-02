const express=require("express")
const router = express.Router()
const Product = require("../models/model") 
const mongoose =require("mongoose")
// const { count } = require("../models/model")

// const cartData=require("../../cart_table/routers/router")

router.get("/get",async(req,res)=>{
    
    try{
        const data = await Product.find({})
        res.send(data)
    }catch(error){
        res.send(error)
    }
})


router.post("/post",async(req,res)=>{
    const product= new Product({
        
        product_id:req.body.product_id,
        product_name:req.body.product_name,
        count:req.body.count
    })
    try{
        const data= await product.save()
        res.send(data)
    }catch(e){
        res.send(e)
    }
})

// router.post("/post",(req,res)=>{
//     const product= Product.stock_table.create({
        
//         product_id:req.body.product_id,
//         product_name:req.body.product_name,
//         count:req.body.count
//     })
    
//     const cart = Product.cart_table.create({
//             id:Product.stock_table._id,
//             product_id:Product.stock_table.product_id,
//             quantity:Product.stock_table.count

//         })
//     try{
            
        
//         }
//         catch(e){
//         res.send(e)
//     }

// })


router.patch("/patch/:id",async(req,res)=>{
    const updates = Object.keys(req.body)
    
    try{
        const data = await Product.findById(req.params.id) 
        updates.forEach((update)=>{
            data[update]=req.body[update]
        })
        
        const final = await data.save()
        res.json(final)
    }catch(e){
        res.send(e)
    }
})
// router.patch("/patch/:id",async(req,res)=>{
//     const updates = Object.keys(req.body)
    
//     try{
//         const data = await Object.keys(req.body)
//         const query = {"quantity":req.body.count};
//         // const data = await Product.findById(req.params.id) 
//         // updates.forEach((update)=>{
//         //     data[update]=req.body[update]
//         // })
//         Product.findOneAndUpdate(query,{$set:
//             {count:Product.stock_table.count-Product.cart_table.quantity}})
        
//         const final = await data.save()
//         res.json(final)
//     }catch(e){
//         res.send(e)
//     }
// })

router.delete("/delete/:id",async(req,res)=>{
    try{
        const data = await Product.findByIdAndDelete(req.params.id)
        res.send(data)
    }catch(e){
        res.send(e)
    }
})
module.exports = router;
// module.exports=Product;