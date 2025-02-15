import { useState, useEffect, useContext } from "react"
import { UserContext } from "../context/user"
import '../styling/auth.css'

function Auth({navigate}){

// -----PAGE TITLE + COLOR-----
    useEffect(() => {
        document.title="Traveler's Club"
        document.body.style.backgroundColor="#7e4c42"
    }, [])

// -----STATE-----
    const {user, setUser} = useContext(UserContext)
    const [ isLogin, setIsLogin ] = useState(0) // if 1 we'll fetch to .../login, if 2, we'll fetch to .../signup
    const [ formData, setFormData ] = useState({username:"",password:"", profile_image: null}) // holds login form data

// -----FUNCTIONALITY-----

    // Login / Signup form, rendered conditionally
    function handleSubmit(e){
        e.preventDefault()
        const route = isLogin === 1 ? "login" : "signup"

        let requestBody;
        let contentType;

        if(isLogin === 1){
            requestBody = JSON.stringify(formData);
            contentType = "application/json";
        } else {
            const formdata = new FormData();
            formdata.append('username', formData.username);
            formdata.append('password', formData.password);
            if (formData.image){
                formdata.append('image', formData.image);
            }
            requestBody = formdata;

            contentType = undefined
        }
        fetch(`/${route}`,{
            method: "POST",
            headers: contentType ? {"Content-Type": contentType} : {},
            body: requestBody
        })
            .then( r => {
                if (r.ok) {
                    return r.json()
                } else {
                    throw new Error('Request failed')
                }
            })
            .then( user => {
                if (user)
                    setFormData({username:"",password:""})
                setUser(user)
                navigate('home')
            })
            .catch( error => {
                console.log("Invalid login")
                setFormData({username:"",password:""})
            })
    }

    // If the user is still logged in when they open the page, navigate them to the Home page so the nav bar isn't displayed on the Auth page
    if(user){
        navigate('/home')
    } 
    return(
        <div className="authentication">
            <p className="welcome">Welcome to The Traveler's Club!</p>
            <p className="continue">To continue, please Login or Signup.</p>
            {isLogin === 0 ? 
            <div className="login-or-signup">
                <button className="longin-signup-btn" onClick={(e)=>{setIsLogin(1)}}>Login</button>
                <button className="longin-signup-btn" onClick={(e)=>{setIsLogin(2)}}>Signup</button>
            </div>
            :
            <div className="form-div">
                <form className="login-signup-form" onSubmit={handleSubmit}>
                    <label className="form-titles" htmlFor="username">Username:</label>
                        <input 
                            onChange= {(e)=>{setFormData({...formData, username: e.target.value})}}
                            type="text"
                            name= "username"
                            placeholder="username"
                            className="input-text"
                            value={formData.username}
                        ></input>
                    <label className="form-titles" htmlFor="password">Password:</label>
                        <input 
                            onChange= {(e)=>{setFormData({...formData, password: e.target.value})}}
                            type="password"
                            name= "password"
                            placeholder="password"
                            className="input-text"
                            value={formData.password}
                        ></input>
                        {isLogin === 2 ? <div className='signup-image-upload'>
                            <label className="form-titles" htmlFor='profile_image'>Profile Picture:</label>
                                <input 
                                    className="choose-pic"
                                    type="file"
                                    name="image"
                                    onChange={(e) => {setFormData({...formData, image: e.target.files[0]})}}/>
                        </div> : null}
                    <div className="login-btn-container"><button className="login-signup-submit-btn" type="submit">{isLogin === 1 ? "Login" : "Signup"}</button></div>
                </form>
            </div>
            }
        </div>
    )
}

export default Auth