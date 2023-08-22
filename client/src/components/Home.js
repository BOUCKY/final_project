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
    const [inWishList, setInWishList] = useState(false)
    const [userWishes, setUserWishes] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetch('/wishes')
            .then(r => r.json())
            .then(data => setUserWishes(data))
    }, [])

    const checkWishList = (placeId) => {
        if (userWishes.some(wish => wish.place_id === placeId)) {
            return true
        }
        return false
    }

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

    const updatePlaceListWithWishStatus = () => {
        const placesWithWishStatus = places.map(place => ({
            ...place,
            inWishList: checkWishList(place.id),
        }))
        return placesWithWishStatus;
    }

    const filteredPlacesWithWishStatus = updatePlaceListWithWishStatus()

    const filteredPlaces = filteredPlacesWithWishStatus
    .filter(place => place.city && place.city.toLowerCase().startsWith(search.toLowerCase()))
    .map(filteredPlace => (
        <PlaceCard
            key={filteredPlace.id}
            city={filteredPlace.city}
            state={filteredPlace.state}
            country={filteredPlace.country}
            image={filteredPlace.image}
            addToWishList={() => addToWishList(filteredPlace, user.id)}
            inWishList={filteredPlace.inWishList}
        />
    ))

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