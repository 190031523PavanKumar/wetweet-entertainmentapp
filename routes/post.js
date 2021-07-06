const { response } = require('express')
const express = require('express')
const router =express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post =mongoose.model('Post')

router.get('/allpost',requireLogin,(request,response)=>{
    Post.find().populate("postedby","_id name").populate("comments.postedby","_id name").then(result=>{
        response.json({result})
    }).catch(err=>{
        console.log(err)
    })
})
router.post('/createpost',requireLogin,(request,response)=>{
    const {title,body,photo} = request.body
    if(!title||!body||!photo)
    {
        return response.status(422).json({error:"please enter all the fields"})
    }
   request.user.password=undefined
    const post = new Post({
        title,
        body,
        photo,
        postedby:request.user
    })
    post.save().then(result=>{
        response.json({post:result})
    }).catch(err=>{
        console.log(err)
    })
    })
router.get('/mypost',requireLogin,(request,response)=>{
    Post.find({postedby:request.user._id}).populate("postedby","_id name").then(mypost=>{
        response.json({mypost})
    }).catch(err=>{
        console.log(err)
    })
})

router.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.put('/comment',requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedby:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedby","_id name")
    .populate("postedby","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedby","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedby._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})
module.exports=router