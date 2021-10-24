const express = require('express')
const router = express.Router()

// const control=require('./control_apicall')

router.post('/registeruser', function (req, res) {



    // (req,res) =>{
    console.log("Res", req.body)
    res.send({ "gfhfhf": "hkhhkjh" })
    return res
    // let data={}
    // data.body

}

)


module.exports = router;