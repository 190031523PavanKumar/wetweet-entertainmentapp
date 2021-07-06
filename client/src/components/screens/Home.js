import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'

function Home() {
    const [data,setdata]=useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch("/allpost",{
            headers:{
                "Authorization":localStorage.getItem("jwt")
            }
        }).then(response=>response.json()).then(result=>{
            
            setdata(result.result)
        })
    },[])
    
    const likePost = (id)=>{
        fetch("/like",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(response=>response.json())
        .then(result=>{
                 //   console.log(result)
          const newData = data.map(x=>{
              if(x._id==result._id){
                  return result
              }else{
                  return x
              }
          })
          setdata(newData)
        }).catch(err=>{
            console.log(err)
        })
  }
  const unlikePost = (id)=>{
        fetch("/unlike",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(response=>response.json())
        .then(result=>{
          //   console.log(result)
          const newData = data.map(x=>{
              if(x._id==result._id){
                  return result
              }else{
                  return x
              }
          })
          setdata(newData)
        }).catch(err=>{
          console.log(err)
      })
  }
   
  const makeComment = (text,postId)=>{
    fetch('/comment',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId,
            text
        })
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        const newData = data.map(x=>{
          if(x._id==result._id){
              return result
          }else{
              return x
          }
       })
      setdata(newData)
    }).catch(err=>{
        console.log(err)
    })
}
const deletePost = (postid)=>{
    fetch(`/deletepost/${postid}`,{
        method:"delete",
        headers:{
            Authorization:localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        const newData = data.filter(item=>{
            return item._id !== result._id
        })
        setdata(newData)
    })
}

   
    return (
        
          <div className="hoome">
              {
                  data.map(x=>{
                      return(
                        <div className="card home-card" key={x._id}>
                         <h5 style={{padding:"5px"}}><Link to={x.postedby._id !== state._id?"/profile/"+x.postedby._id :"/profile"  }>{x.postedby.name}</Link> {x.postedby._id == state._id 
                            && <i className="material-icons" style={{
                                float:"right"
                            }} 
                            onClick={()=>deletePost(x._id)}
                            >delete</i>

                            }</h5>
                         <div className="card-image">
                             <img src={x.photo}></img>
                         </div>
                         <div className="card-content">
                         <i className="material-icons" style={{color:"red"}}>favorite</i>
                         {x.likes.includes(state._id)
                            ? 
                             <i className="material-icons"
                                    onClick={()=>{unlikePost(x._id)}} 
                              >thumb_down</i>
                            : 
                            <i className="material-icons"
                            onClick={()=>{likePost(x._id)}}
                            >thumb_up</i>
                            }
                         <h6>{x.likes.length} likes</h6>
                             <h6>{x.title}</h6>
                             <p>{x.body}</p>
                             {
                                    x.comments.map(record=>{
                                        return(
                                        <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedby.name}</span> {record.text}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,x._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form>
                         </div>
                         </div>
                      )
                  })
              }
             
                   
            
              
           
              
                 
              
          </div>
    )
}

export default Home
