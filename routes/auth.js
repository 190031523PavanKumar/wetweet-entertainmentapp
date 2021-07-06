const express= require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const users =mongoose.model('user')
const jwt =require('jsonwebtoken')
const {JWT_SECRET} =require('../keys')
const requireLogin = require('../middleware/requireLogin')


router.get('/protected',requireLogin,(request,response)=>{
    response.send("hello Pavan")
})
router.post('/signup',(request,response)=>{
    const {name,email,password}=request.body
    if(!name||!email||!password)
    {
       return response.status(422).json({error:"please enter all the fields"})
    }
    users.findOne({email:email}).then((savedUser)=>{
        if(savedUser){
            return response.status(422).json({error:"user already exists"})
        }
        bcrypt.hash(password,12).then(hashedpassword =>{
            const u =new users({
                name,
                email,
                password:hashedpassword
            })
            u.save()
            .then(u=>{
                response.json({message:"successfully signedup"})
            })
            .catch(err=>{
                console.log(err)
            })

        })
       
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/signin',(request,response)=>{
    const{email,password}=request.body
    if(!email||!password)
    {
        return response.status(422).json({error:"please enter all the fields"})
    }
    users.findOne({email:email}).then((savedUser)=>{
        if(!savedUser){
            return response.status(422).json({error:"invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password).then(doMatch=>{
            if(doMatch)
            {
             const token =jwt.sign({_id:savedUser._id},JWT_SECRET)
             const {_id,name,email}=savedUser
             response.json({token,user:{_id,name,email}})
            }
            else {
                return response.status(422).json({error:"invalid email or password"})
            }
        })
        .catch(error=>{
            console.log(error)
        })
    })
    .catch(error=>{
        console.log(error)
    })


})
module.exports=router