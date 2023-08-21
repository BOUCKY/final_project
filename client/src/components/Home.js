import React, {useState, useEffect, useContext}from "react"
import { UserContext } from "../context/user"
import PlaceCard from "./PlaceCard"
import '../styling/home.css'

function Home(){

    useEffect(() => {
        document.title="Traveler's Club | Home"
        document.body.style.backgroundColor="white"
    }, [])

    const {user} = useContext(UserContext)

    const [places, setPlaces] = useState([])
    const [wishes, setWishes] = useState([])
    const [search, setSearch] = useState('')


    const addToWishList = (destination, userId) => {
        const newWish = {
            user_id: userId,
            place_id: destination.id,
        }

        fetch('/wishes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newWish),
        })
        .then(response => response.json())
        .then(data => {
            setWishes(prevWishes => [...prevWishes, data])
            console.log('Added to wish list:', newWish)
        })
        .catch(error => {
            console.error('Error adding to wish list:', error)
        })
    }

    useEffect(() => {
        fetch('/places')
        .then(r => r.json())
        .then(data => setPlaces(data))
    },[])

    const filteredPlaces = places.filter(place => place.city && place.city.toLowerCase().startsWith(search.toLowerCase()))
    .map(filteredPlaces => (
        <PlaceCard
            key={filteredPlaces.id}
            city={filteredPlaces.city}
            state={filteredPlaces.state}
            country={filteredPlaces.country}
            image={filteredPlaces.image}
            addToWishList={() => addToWishList(filteredPlaces, user.id)}
        />
    ));

    return(
        <div className="place-list">
            <div className="place-list-header">
                <p>Destinations</p>
                <div className="search-container">
                    <input
                        className="search-input"
                        icon="search"
                        placeholder="Search Destinations . . ."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="card">
                {filteredPlaces}
            </div>
        </div>
    )
}

export default Home