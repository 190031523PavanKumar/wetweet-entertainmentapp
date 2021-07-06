const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require('../keys')

const mongoose = require('mongoose')
const user=mongoose.model("user")

module.exports =(request,response,next)=>{
    const{authorization} = request.headers
    if(!authorization)
    {
        return response.status(401).json({error:"you must login"})
    }
    const token=authorization.replace("Pavan","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err)
        {
            return response.status(401).json({error:"you must login"})
        }
        const {_id}=payload
        user.findById(_id).then(userdata=>{
            request.user = userdata
            next()
        })
        

    })
    
}