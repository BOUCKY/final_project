import React, { useState, useEffect, useContext} from "react"
import { UserContext } from "../context/user"
import UserCard from "./UserCard"
import '../styling/social.css'

function Social(){

    useEffect(() => {
        document.title = "Traveler's Club | Social"
    }, [])

    const {user} = useContext(UserContext)
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        fetch('/users')
        .then(r => r.json())
        .then(data => setAllUsers(data))
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const [search, setSearch] = useState('')

    const filteredUsers = user && user.id // Check if user is not null and has an 'id' property
    ? allUsers
        .filter(eachUser => eachUser.id !== user.id)
        .filter(filteredUser => filteredUser.username.toLowerCase().startsWith(search.toLowerCase()))
        .map(filteredUser => (
            <UserCard 
                key={filteredUser.id}
                id={filteredUser.id}
                username={filteredUser.username}
                image={filteredUser.profile_image}
                trips={filteredUser.trips}
            />
        ))
    : []

    return(
        <div className="user-card-list">
            <div className="user-list-header">
                <p>Friends</p>
                <div className="search-container">
                    <input
                        className="search-input"
                        icon="search"
                        placeholder="Search Friends . . ."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="social-card">
                {filteredUsers}
            </div>
        </div>
    )

}

export default Social