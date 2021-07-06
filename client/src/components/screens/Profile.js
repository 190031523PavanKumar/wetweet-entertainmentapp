import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'

function Profile() {
    const[mypics,setpics]=useState([])
    const{state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        fetch("/mypost",{
            headers:{
                "Authorization":localStorage.getItem("jwt")
            }
        }).then(response =>response.json()).then(result=>{
            setpics(result.mypost)
        })

    },[])
    return (
        <div>
        <div style={{display:"flex",justifyContent:"space-around",borderBottom:"1px solid black",margin:"18px 0px"}}>
            <div >
                <img style={{width:"160px" ,height:"160px" ,borderRadius:"50%"}} src="https://images.unsplash.com/photo-1564490292125-2e3c78a0ef44?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2FsbHBhcGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></img>
            </div>
            <div>
                <h5>{state?state.name:"loading"}</h5>
                <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                <h6>30 Posts</h6>
                <h6>300 Followers</h6>
                <h6>305 Following</h6>
                </div>
            </div> 

            
        </div>
        <div className="gallery">
            {
                mypics.map(x=>{
                    return(
                        <img className="item" src={x.photo} alt={x.title}></img>
                    )
                })
            }

            </div>
        </div>
        
    
    )
}

export default Profile
