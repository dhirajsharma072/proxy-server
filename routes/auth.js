const express = require('express')
const authController = require('../controllers/auth')
const router = express.Router()

router.post('/auth/token',(req,res,next)=>{
console.log(req.body)
next()
}, authController.createToken)


module.exports = router
