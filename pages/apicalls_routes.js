const express=require('express')
const router=express.Router()

const control=require('./control_apicall')

router.post('/register' , (req,res) =>{
    console.log("Res",req.body)

    // let data={}
    // data.body

})


module.exports=router