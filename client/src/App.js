import React,{useEffect,createContext,useReducer,useContext} from 'react'
import Navbar from './components/Navbar'
import './App.css'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Profile from './components/screens/Profile'
import Login from './components/screens/Login'
import Signup from './components/screens/Signup'
import Createpost from './components/screens/Createpost'
import UserProfile from './components/screens/UserProfile'
import {reducer,initialState} from './reducers/userReducer'

export const UserContext = createContext()


const Routing=()=>{
  const history = useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user =JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
     
    }
    else
    history.push('/signin')
  },[])
  
  return(
    <Switch>
    <Route exact path="/">
      <Home/>
    </Route>
    <Route path="/signin">
      <Login/>
    </Route>
    <Route path="/signup">
      <Signup/>
    </Route>
    <Route exact path="/profile">
      <Profile/>
    </Route>
    <Route path="/createpost">
      <Createpost/>
    </Route>
    <Route path="/profile/:userid">
      <UserProfile/>
    </Route>
    </Switch>
  )
}



function App() {
  const[state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Navbar/>
    <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
