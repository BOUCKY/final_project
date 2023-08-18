import TripCard from "./TripCard"
import TripForm from "./TripForm"
// import WishList from "./WishList"
import React, { useState, useEffect, useContext } from "react"
import '../styling/mytrips.css'
import { UserContext } from "../context/user"

function MyTrips(){

    useEffect(() => {
        document.title="Traveler's Club | My Trips"
    }, [])

    const {user} = useContext(UserContext)
    const [trips, setTrips] = useState([])
    // const [myTrips, setMyTrips] = useState(true)

    useEffect(() => {
        fetch('/trips')
            .then(r => r.json())
            .then(data => setTrips(data))
    }, [])

    const addNewTrip = (newTrip) => {
        setTrips([...trips, newTrip])
    }

    const handleFavorite = (tripId, updatedVal) => {
        fetch(`trips/${tripId}` ,{
            method: 'PATCH',
            headers:{"Content-Type" : "application/json"},
            body: JSON.stringify({favorite: updatedVal})
        })
            .then(r => r.json())
            .then(updatedTrip => setTrips(trips.map(trip => {
                if (trip.id !== tripId){
                    return trip
                }
                else {
                    return updatedTrip
                }
            })))
    }

    const removeTripCard = (id) => {
        setTrips((currentTrips) => 
            currentTrips.filter((trip) => trip.id !== id)
        )
    }

    const eachTrip = trips.filter((trip) => trip.user_id === user?.id).map(filteredTrip => (
        <TripCard
            key={filteredTrip.id}
            id={filteredTrip.id}
            placeCity={filteredTrip.place.city}
            placeState={filteredTrip.place.state}
            placeCountry={filteredTrip.place.country}
            placeImage={filteredTrip.place.image}
            rating={filteredTrip.rating}
            comments={filteredTrip.comments}
            favorite={filteredTrip.favorite}
            handleFavorite={handleFavorite}
            removeTripCard={removeTripCard}
        />
    ))
    
    return (
        <div className='trip-page'>
            <div className='trip-list'>
                <div className="trip-header-container">
                    <p className="trip-header">My Trips</p>
                    {/* <button className="tributton-header" onClick={setMyTrips(true)}>My Trips</button>
                    <button className="trip-header" onClick={setMyTrips(false)}>Wish List</button> */}
                </div>
            <div className="card">
                {/* {myTrips ? {eachTrip} : {wishTrip}} */}
                {eachTrip}
            </div>
            </div>
            <div className="big-form-container">
                <div className='form-container'>
                    <p className="trip-header">Add a Trip!</p>
                    <TripForm user={user} addNewTrip={addNewTrip}/>
                </div>
            </div>
        </div>
    )
}

export default MyTrips