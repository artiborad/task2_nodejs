const express=require("express")
const nodemailer = require("nodemailer");
const router = express.Router()
const cartProducts = require("../models/model") 
const mongoose =require("mongoose")
const stockProduct= require("../../stock_table/models/model")
const { count } = require("../../stock_table/models/model")
var fs = require('fs');
var https = require('https');
const { getMaxListeners } = require("process");


router.get("/",async (req,res)=>{
    try{
        const data = await cartProducts.find({})
        res.send(data)
    }catch(e){
        res.send(e)
    }
})

// router.post("/one",async (req,res)=>{
//     try{
//         const data = await cartProducts.findOne({_id:req.body.id});
//         let quantity = data.quantity;
//         res.send({data:data,quantity:quantity})
//     }catch(e){
//         res.send(e)
//     }
// })


// router.post("/",async(req,res)=>{
//     const product= new Products({
//         id:req.body.id,
//         product_id:req.body.product_id,
//         quantity:req.body.quantity
//     })
    
//         try{
//             const data= await product.save()
//             res.send(data)
//         } catch(e){
//             res.send(e)
//         }

    
   
// })
// router.post("/",async(req,res)=>{
//     const product= new cartProducts({
//         id:req.body.id,
//         product_id:req.body.product_id,
//         quantity:req.body.quantity
        
//     })
    
    
//     stockProduct.find({product_id:product.product_id})
    
//     try{
//         if(stockProduct){
//             stockProduct.findOneAndUpdate({product_id:product.product_id},{
//                 count:count- product.quantity
//             }
//             )
//             res.send(stockProduct)


//         }} catch(e){
//             res.send(e)
//         } })


// router.post("/",async(req,res)=>{
//     const product= new cart_table({
//                 id:req.body.id,
//                 product_id:req.body.product_id,
//                 quantity:req.body.quantity})

//     // let cart = stock_table.findById({"_id":product.id})
//     // try{
//     //     if(cart){
//     //         res.send(cart)
//     //     }
//     // }catch(e){
//     //     res.send(e)
//     // }
//     const filter = {"_id":req.body.id}
//     const update ={"count":count - req.body.quantity} 
//     let cart= stock_table.findOneAndUpdate(filter,update)
//     try{
//         await cart.save()
//         res.send(cart)
//     }catch(e){
//         res.send(e)
//     }

// })


// router.post("/createcart",async(req,res)=>{
//     const product= new cartProducts({
//         id:req.body.id,
//         product_id:req.body.product_id,
//         quantity:req.body.quantity
//     })
//     let p= product.save()
//     let cart = await  stockProduct.find({product_id:req.body.product_id});
//     console.log(cart)
//     cart = cart[0].toObject();
//     try{
//         if(cart){
//             let filter = cart.count - req.body.quantity;
//             console.log("filter:= "+filter)
//             if(filter>0){
//                 let data = await stockProduct.findOneAndUpdate({product_id:req.body.product_id},{
//                     $inc : {count:-filter}
//                 }
//                 )
//                 res.send(data)
//             }else{
//                 res.send({
//                     "msg":"product is not available "
//                 })
//             }
            
//         }
//     } catch(e){
//             res.send(e.message)
//         } 
// })


router.patch("/updatecart",async(req,res)=>{
    // const updates = Object.keys(req.body)
    // console.log(updates)
    
    try{
        const d= await cartProducts.find({product_id:req.body.product_id})
        // const d1 = await d[0].toObject()
        let d1 = d[0]
        // console.log("d1"+d.quantity)
        d1 = d1.quantity - req.body.quantity;
        console.log("d1:=="+d1)
        const data = await  cartProducts.findOneAndUpdate({product_id:req.body.product_id},{
            quantity:req.body.quantity
        }) 
        const a= await data.save()
        // console.log(a.quantity)
        const data1 = await stockProduct.find({product_id:req.body.product_id})
        // console.log("data"+data1)
        // const final = await data.save()
        // res.json(final)
        let ab = data1[0].toObject()
        // console.log("ab"+ab.count)
        // if(data1.count>){
        //     console.log("true")
        // }
        
    //    if(d1.quantity<req.body.quantity){
        let final = await stockProduct.findOneAndUpdate({product_id:req.body.product_id},{
            $inc : {count : d1}
        })
        let ans = await final.save()
        res.send(ans)
    // }
    //    }
    //    else{
    //     let final = await stockProduct.findOneAndUpdate({product_id:req.body.product_id},{
    //         $inc : {count :req.body.quantity}
    //     })
    //     let ans = await final.save()
    //     res.send(ans)
    //    }
      
           

        
        
       
        // updates.forEach((update)=>{
        //     data[update]=req.body[update]
        // const final = await stockProduct.find({product_id:req.body.product_id})
        }
        
        
    catch(e){
        res.send(e.message)
    }
})

router.patch("/patch",async(req,res)=>{

    
    try{
        const d= await cartProducts.find({product_id:req.body.product_id})
        
        let d1 = d[0]
        
        d1 = d1.quantity - req.body.quantity;
        console.log("d1:=="+d1)
        const data = await  cartProducts.findOneAndUpdate({product_id:req.body.product_id},{
            quantity:req.body.quantity
        }) 
        const a= await data.save()
        
        const data1 = await stockProduct.find({product_id:req.body.product_id})
     
        let ab = data1[0].toObject()
        
        let final = await stockProduct.findOneAndUpdate({product_id:req.body.product_id},{
            $inc : {count : d1}
        })
        let ans = await final.save()
        res.send(ans)
    
    } 
    catch(e){
        res.send(e.message)
    }
})
// router.post("/2",async(req,res)=>{
//             const product= new cartProducts({
//                 id:req.body.id,
//                 product_id:req.body.product_id,
//                 quantity:req.body.quantity
//             })
//             let cart = stockProduct.find({product_id:product.product_id})
//             try{
//                 if(cart){
//                     // res.send(cart)
//                     const data =stockProduct.count= stockProduct.count- product.quantity
//                     const d = await data.save()
//                     res.send(d)
//                 }} catch(e){
//                     res.send(e)
//                 } 
// })




// router.post("/3",async(req,res)=>{
//     const cartProduct = new cartProducts({
//         id:req.body.id,
//         product_id:req.body.product_id,
//         quantity:req.body.quantity
//     })

//     let cart = stockProduct.findOne({product_id:cartProduct.product_id})
//     try{
//         if(cart){
//             let update= stockProduct.count-cartProduct.quantity
            
//             let data = await update.save()
//             res.send(data)
//         }

//     }catch(e){
//         res.send(e)
//     }
// })

// router.post("/",async (req,res)=>{
//     const {id,product_id}=req.body
//     const quantity =req.body.quantity
//     let cart = stockProduct.find({product_id:product_id})
//     if(cart){
//         // const count = cart.count- quantity
//         // const data = await count.save()
//         // res.send(cart)
//         // cart[quantity].reduce((acc,nex)=>acc - nex)
        
//         // cart = await cart.save()
//         res.send(cart.product_id)
//     }
// })

// router.post("/",async(req,res)=>{
//     const{id,quantity}=req.body
//     const product_id =req.body.product_id
//     try{
//         let cart = await stockProduct.findOne({product_id})

//         if(cart){
//             let productindex = cart.stockProduct.findIndex(p=>p.product_id==product_id)
//             if(productindex>-1){
//                 let productItem = cart.stockProduct[productindex]
//                 productItem.count = productindex.count-req.body.quantity
//                 cart.stockProduct[productindex]=productItem
//             }
//             cart = await cart.save()
//             res.send(cart)
        
//         }
//     }
//     catch(e){
//         res.send(e)
//     }
// })

// router.post("/",async(req,res)=>{
//     const {product_id,id}= req.body
//     const quantity=Number.parseInt(req.body.quantity)
//     const cart = await stockProduct.findOne({product_id:product_id})
//     if(cart){
//         const data = stockProduct.count.reduce((acc,nex)=>acc-nex)
//         await data.save()
//         res.send(data)
//     }

// })

router.patch("/:id",async(req,res)=>{
    const updates = Object.keys(req.body)
    
    try{
        const data = await cartProduct.findById(req.params.id) 
        updates.forEach((update)=>{
            data[update]=req.body[update]
        })
        
        const final = await data.save()
        res.json(final)
    }catch(e){
        res.send(e)
    }
})


router.delete("/del",async(req,res)=>{
    try{
        const data = await cartProducts.findOneAndDelete({product_id:req.body.product_id})
        const final =await stockProduct.findOneAndUpdate({product_id:stockProduct.product_id},{
            $inc : {count:data.quantity}
        })
        res.send({data,"msg":"deleted succesfully "})

    }catch(e){
        res.send(e.message)
    }
})
router.delete("/:id",async(req,res)=>{
    try{
        const data = await cartProducts.findByIdAndDelete(req.params.id)
        res.send(data)
    }catch(e){
        res.send(e)
    }
})



// router.post("/createcart",async (req,res)=>{
//     const product= new cartProducts({
//         id:req.body.id,
//         product_id:req.body.product_id,
//         quantity:req.body.quantity
//     })
//     let p= product.save()
//     let cart = await  stockProduct.find({product_id:req.body.product_id});
    
    



//     console.log(cart)
//     cart = cart[0].toObject();
//     let rec = cart.owner_email
//     console.log(rec)
//   //  let testAccount = await nodemailer.createTestAccount();
//     let transporter =await nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true, 
//         auth: {
//           user:'developer5gloryautotech@gmail.com', 
//           pass: 'Arti@321', 
//         },
//         tls:{
//             rejectUnauthorized:false
//         }
//       })

//     let info = await transporter.sendMail({
//             from: 'developer5gloryautotech@gmail.com', 
//             to: "yash.gloryautotech@gmail.com", 
//             subject: "product info", 
//             text: "hello", 
//          });

//     try{
//         if(cart){
//             let filter = cart.count - req.body.quantity;
//             console.log("filter:= "+filter)
//             if(filter>0){
//                 let data = await stockProduct.findOneAndUpdate({product_id:req.body.product_id},{
//                     $inc : {count:-filter}
//                 }
//                 )
//                 res.send({data,"msgID":info.messageId,"url":nodemailer.getTestMessageUrl(info)})
//             }else{
//                 res.send({
//                     "msg":"product is not available "
//                 })
//             }
            
//         }
//     } catch(e){
//             res.send(e.message)
//         } 
// })

router.post("/createcart",async (req,res)=>{
    const product= new cartProducts({
        id:req.body.id,
        product_id:req.body.product_id,
        quantity:req.body.quantity
    })
    let p= product.save()
    let cart = await  stockProduct.find({product_id:req.body.product_id});
    
    



    console.log(cart)
    cart = cart[0].toObject();
    let rec = cart.owner_email
    console.log(rec)
  //  let testAccount = await nodemailer.createTestAccount();
    let transporter =await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
          user:'developer5gloryautotech@gmail.com', 
          pass: 'Arti@321', 
        },
        tls:{
            rejectUnauthorized:false
        }
      })

    let info = await transporter.sendMail({
            from: 'developer5gloryautotech@gmail.com', 
            to:JSON.stringify(rec), 
            subject: "product info", 
            text:JSON.stringify(req.body), 
         });

    try{
        if(cart){
            let filter = cart.count - req.body.quantity;
            console.log("filter:= "+filter)
            if(filter>0){
                let data = await stockProduct.findOneAndUpdate({product_id:req.body.product_id},{
                    $inc : {count:-filter}
                }
                )
                res.send({data,"msgID":info.messageId,"url":nodemailer.getTestMessageUrl(info)})
            }else{
                res.send({
                    "msg":"product is not available "
                })
            }
            
        }
    } catch(e){
            res.send(e.message)
        } 
})




module.exports = router;