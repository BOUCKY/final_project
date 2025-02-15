import React, {useState, useEffect, useContext}from "react"
import { UserContext } from "../context/user"
import PlaceCard from "./PlaceCard"
import '../styling/home.css'

function Home(){

// -----PAGE TITLE-----
    useEffect(() => {
        document.title="Traveler's Club | Home"
        document.body.style.backgroundColor="white"
    }, [])

// -----STATES-----
    const {user} = useContext(UserContext)
    const [places, setPlaces] = useState([])
    // eslint-disable-next-line
    const [inWishList, setInWishList] = useState(false)
    const [userWishes, setUserWishes] = useState([])
    const [search, setSearch] = useState('')


// -----FETCH REQUESTS-----

    // get all of the wishes, then filter to see only the current user's
    useEffect(() => {
        fetch('/wishes')
            .then(r => r.json())
            .then(data => {
                const filteredWishes = data.filter(wish => wish.user_id === user?.id)
                setUserWishes(filteredWishes)
            })
    }, [user])// eslint-disable-line react-hooks/exhaustive-deps

    // Check to see if the place is in the current users' wish list. If it is, return true. If it's not, return false.
    const checkWishList = (placeId) => {
        if (userWishes.some(wish => wish.place_id === placeId)) {
            return true
        }
        return false
    }

    // add a new wish to the wish list
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
            setUserWishes(prevWishes => [...prevWishes, data])
            console.log('Added to wish list:', newWish)
        })
        .catch(error => {
            console.error('Error adding to wish list:', error)
        })
    }

    // Get all of the places / destinations
    useEffect(() => {
        fetch('/places')
        .then(r => r.json())
        .then(data => setPlaces(data))
    },[])


// -----FUNCTIONALITY-----

    // Gives each place / destination a status based on the return from the checkWishList function
    const updatePlaceListWithWishStatus = () => {
        const placesWithWishStatus = places.map(place => ({
            ...place,
            inWishList: checkWishList(place.id),
        }))
        return placesWithWishStatus;
    }

    // Creates the layout for the place /destination cards but is also a search function based on either city, state, or country
    const filteredPlacesWithWishStatus = updatePlaceListWithWishStatus()
    const filteredPlaces = filteredPlacesWithWishStatus
    .filter(place => 
        (place.city && place.city.toLowerCase().startsWith(search.toLowerCase())) ||
        (place.state && place.state.toLowerCase().startsWith(search.toLowerCase())) ||
        (place.country && place.country.toLowerCase().startsWith(search.toLowerCase())))
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