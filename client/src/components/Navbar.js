import React, {useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import '../App.css'
import {UserContext} from '../App'

const Navbar =()=>
  {
const history = useHistory()
  const{state,dispatch}=useContext(UserContext)
  const renderList=()=>{
    if(state)
    {
      return[
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/createpost">Post</Link></li>,
        <li>
          <button class="btn waves-effect waves-light black" type="submit" name="action" onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push('/signin')
          }}>Logout</button>
        </li>
      ]
    }
    else{
      return[
        <li><Link to="/signup">Sign Up</Link></li>,
        <li><Link to="/signin">Sign In</Link></li>

      ]
    }
  }
    
        return (
            <nav>
            <div className="nav-wrapper #607d8b blue-grey">
              <Link to={state?"/":"/signin"} className="brand-logo left">WeTweet</Link>
              <ul id="nav-mobile" className="right ">
                
               {renderList()}
              </ul>
            </div>
          </nav>
        )
    
        }

export default Navbar
