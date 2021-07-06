import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'


function Createpost() {
  const[title,settitle]=useState("")
  const[body,setbody]=useState("")
  const[image,setimage]=useState("")
  const[url,seturl]=useState("")
  const history =useHistory()
  useEffect(()=>{
    fetch("/createpost",{
      method:"post",
      headers:{
        "Content-Type":"application/json",
        "Authorization":localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        title,
        body,
        photo:url
      })

    }).then(response=>response.json())
    .then(data=>{
      if(data.error)
      {
        M.toast({html: data.error,classes:"#f44336 red"})
      }
      else{
       
        M.toast({html: "Posted Successfully",classes:"#4caf50 green"})
        history.push('/')
      }
    }).catch(error=>{
      console.log(error)
    })

  },[url])
  

  const PostData=()=>{
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","wetweet")
    data.append("cloud_name","we-tweet")
    fetch("	https://api.cloudinary.com/v1_1/we-tweet/image/upload",{
      method:"post",
      body:data
    })
    .then(response=>response.json())
    .then(data=>{seturl(data.url)})
    .catch(error=>{console.log(error)})

    
  }
    return (
        <div className="card createpost">
          <h1>Create Post</h1>
          <div>
            <input type="text" placeholder="title" value={title} onChange={(e)=>settitle(e.target.value)}/>
            <input type="text" placeholder="body" value={body} onChange={(e)=>setbody(e.target.value)}/>
            <div class="file-field input-field">
      <div class="btn">
        <span>Upload Image</span>
        <input type="file" onChange={(e)=>setimage(e.target.files[0])}/>
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text"/>
      </div>
    </div>
    <button className="btn waves-effect  #000000 black" type="submit" name="action" onClick={PostData}>Post </button>
          </div>

        </div>
    )
}

export default Createpost
