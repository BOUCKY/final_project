import { NavLink } from "react-router-dom";
import '../styling/navbar.css';
import { useState, useContext } from "react";
import { UserContext } from "../context/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function NavBar( {navigate} ) {    

    // User state
    const {user, setUser} = useContext(UserContext)

    // Tab state + toggle
    const [currentTab, setCurrentTab] = useState("home")
    const handleTab = (tab) => {
        setCurrentTab(tab)
    }

    // Sense when a different tab is clicked
    const [navClick, setNavClick] = useState(false)
    const handleNavClick = () => {
        setNavClick(!navClick)
    }

    // Logout function
    const handleLogout = () => {
    fetch("https://travelers-club-backend.onrender.com/logout",{
      method: "DELETE"
    })
      .then( r => {
        if (r.ok) {
          setUser(null)
          navigate('/')
        }
      })
    }
    console.log(user)

    return (
        <div className="header">
            <div className="left-side-nav">
                {/* <img className="my-trails" src={mytrails} alt='My Trails' height={75}/> */}
                <p>The Traveler's Club</p>
            </div>
                <div className="center-nav">
                    {user ? <><p className="hello">Welcome, {user.username}</p><img className="current-user-img" src={user.profile_image} alt={user.username}/></> : null}
                </div>
                <div>
                    <button className="mobile" onClick={handleNavClick}>
                        {navClick ? <FontAwesomeIcon icon={faTimes} size="2x" /> : <FontAwesomeIcon icon={faBars} size="2x" />}
                    </button>
                </div>
                <div className={`nav-bar ${navClick ? 'active' : ''}`}>
                    <li className="nav-bar-list"><NavLink className={`nav-bar-link ${currentTab === "home" ? 'underline' : ''}`} onClick={() => {handleNavClick(); handleTab('home');}} to="home">Home</NavLink></li>
                    <li className="nav-bar-list"><NavLink className={`nav-bar-link ${currentTab === "list" ? 'underline' : ''}`} onClick={() => {handleNavClick(); handleTab('list');}} to="list">Travel 101</NavLink></li>
                    <li className="nav-bar-list"><NavLink className={`nav-bar-link ${currentTab === "social" ? 'underline' : ''}`} onClick={() => {handleNavClick(); handleTab('social');}} to="social">Social</NavLink></li>
                    <li className="nav-bar-list"><NavLink className={`nav-bar-link ${currentTab === "trips" ? 'underline' : ''}`} onClick={() => {handleNavClick(); handleTab('trips');}} to="trips">My Trips</NavLink></li>
                    <li className="nav-bar-list"><button className="nav-bar-link" onClick={handleLogout}>Logout</button></li>
                </div>
        </div>

    )
}

export default NavBar