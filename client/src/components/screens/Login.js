import React,{useState,useContext} from 'react'
import {UserContext} from '../../App'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'


function Login() {
    const{state,dispatch}=useContext(UserContext)
    const[email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const history =useHistory()

    const PostData =()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
            M.toast({html: "invalid Email",classes:"#f44336 red"})
            return
        }
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then((response)=>
            response.json()
        ).then((data)=>{
            console.log(data)
            if(data.error)
            {
                M.toast({html: data.error,classes:"#f44336 red"})
            }
            else{
                localStorage.setItem("jwt",'Pavan'+data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html: "Signed In Successfully",classes:"#4caf50 green"})
                history.push('/')
            }
        })
    }
    return (
        <div className="mycard">
            <div className="card auth-card">
                <h1>WeTweet</h1>
                <input type="text" placeholder="E-Mail" value={email} onChange={(e)=>setemail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
                <button className="btn waves-effect  #000000 black" type="submit" name="action" onClick={PostData}>Sign In </button>
                <h6>
                    <Link to='signup'>Don't have an account? Sign up</Link>
                </h6>
            </div>
        </div>
    )
}

export default Login
