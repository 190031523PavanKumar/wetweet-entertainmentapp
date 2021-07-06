import React,{useState}from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

function Signup() {
    const [name,setname]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const history = useHistory()
    const PostData=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
            M.toast({html: "invalid Email",classes:"#f44336 red"})
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        }).then(response=>response.json())
        .then(data=>{
            if(data.error)
            {
                M.toast({html: data.error,classes:"#f44336 red"})
            }
            else{
                M.toast({html: data.message,classes:"#4caf50 green"})
                history.push('/signin')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    

    

    return (
        <div className="mycard">
            <div className="card auth-card">
                <h1>WeTweet</h1>
             
                <input type="text"  placeholder="Name" value={name} onChange={(event)=>{setname(event.target.value)}} ></input>
                
                <input type="text"  placeholder="E-mail" value={email} onChange={(event)=>{setemail(event.target.value)}}></input>
                
                
                <input type="password"  placeholder="Password" value={password} onChange={(event)=>{setpassword(event.target.value)}}></input>
               
                <button class="btn waves-effect waves-light black" type="submit" name="action" onClick={PostData}>Sign Up</button>
                <h6>
                    <Link to="/signin">Already? Have An Account</Link>
                </h6>
            </div>
        </div>
    )
}

export default Signup
