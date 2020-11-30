/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   Tom
* @Last Modified time: 2019-10-17 10:52:24
*/
const Router = require('express').Router;

const UserModel = require('../models/user.js');
const OrderModel = require('../models/order.js');
const ProductModel = require('../models/product.js');

const router = Router();

//权限控制
router.use((req,res,next)=>{
    if(req.userInfo.isAdmin){
        next()
    }else{
        res.send({
            code:10
        });
    }
})

async function getCounts(){
    try{
        //不存在继发关系,同时触发
        const userPromise = UserModel.estimatedDocumentCount()
        const orderPromise = OrderModel.estimatedDocumentCount()
        const productPromise = ProductModel.estimatedDocumentCount()
        
        const usernum = await userPromise
        const ordernum = await orderPromise
        const productnum = await productPromise
        
        return {
            usernum:usernum,
            ordernum:ordernum,
            productnum:productnum
        }        
    }
    catch(e){
        return {
            usernum:0,
            ordernum:0,
            productnum:0
        }       
    }
}

//系统统计
router.get('/',(req,res)=>{
    getCounts()
    .then(data=>{
        res.json({
            code:0,
            data:data
        })
    })
})

module.exports = router;