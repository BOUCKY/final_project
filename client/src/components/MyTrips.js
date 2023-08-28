import TripCard from "./TripCard"
import TripForm from "./TripForm"
import WishCard from "./WishCard"
import { useState, useEffect, useContext } from "react"
import '../styling/mytrips.css'
import { UserContext } from "../context/user"

function MyTrips(){

// -----PAGE TITLE-----
    useEffect(() => {
        document.title="Traveler's Club | My Trips"
    }, [])

// -----STATE-----
    const {user} = useContext(UserContext)
    const [trips, setTrips] = useState([])
    const [wishes, setWishes] = useState([])
    const [myTrips, setMyTrips] = useState(true)

// -----FETCH REQUESTS-----
    useEffect(() => {
        fetch('/trips')
            .then(r => r.json())
            .then(data => setTrips(data))
    }, [])

    useEffect(() => {
        fetch('/wishes')
            .then(r => r.json())
            .then(data => setWishes(data))
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

// -----FUCTIONALITY-----
    // Delete functions
    const removeTripCard = (id) => {
        setTrips((currentTrips) => 
            currentTrips.filter((trip) => trip.id !== id)
        )
    }

    const removeWishCard = (id) => {
        setWishes((currentWishes) => 
            currentWishes.filter((wish) => wish.id !== id)
        )
    }

    // Patch functions
    const updateRating = (tripId, newRating) => {
        const tripIndex = trips.findIndex(trip => trip.id === tripId)
        const updatedRating = parseInt(newRating)
    
        if (tripIndex !== -1) {
          const updatedTrips = [...trips]
          updatedTrips[tripIndex] = {
            ...updatedTrips[tripIndex],
            rating: updatedRating,
          }
          console.log(updatedTrips[tripIndex])
          setTrips(updatedTrips)
        }
      }
    
      const updateComments = (tripId, newComments) => {
        const tripIndex = trips.findIndex(trip => trip.id === tripId);
    
        if (tripIndex !== -1) {
          const updatedTrips = [...trips]
          updatedTrips[tripIndex] = {
            ...updatedTrips[tripIndex],
            comments: newComments,
          }
    
          setTrips(updatedTrips)
        }
      }

    // Creates the trip and wish cards + renders them based on the current user
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
            setRating={newRating => updateRating(filteredTrip.id, newRating)}
            setComments={newComments => updateComments(filteredTrip.id, newComments)}
        />
    ))

    
    const wishTrip = wishes.filter((wish) => wish.user_id === user?.id).map(filteredWish => (
        <WishCard
            key={filteredWish.id}
            id={filteredWish.id}
            place={filteredWish.place}
            place_id={filteredWish.place.id}
            placeCity={filteredWish.place.city}
            placeState={filteredWish.place.state}
            placeCountry={filteredWish.place.country}
            placeImage={filteredWish.place.image}
            removeWishCard={removeWishCard}
            addNewTrip={addNewTrip}
        />
    ))

    return (
        <div className='trip-page'>
            <div className='trip-list'>
                <div className="trip-header-container">
                    <p className={`trip-header ${myTrips ? "underline" : ""}`} onClick={() => setMyTrips(true)}>My Trips</p>
                    <p className={`wish-header ${!myTrips ? "underline" : ""}`} onClick={() => setMyTrips(false)}>Wish List</p>
                </div>
            <div className="card">
                {myTrips ? eachTrip : wishTrip}
            </div>
            </div>
            {myTrips && (
                <div className="big-form-container">
                    <div className='form-container'>
                        <p className="trip-header">Add a Trip!</p>
                        <TripForm user={user} addNewTrip={addNewTrip}/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MyTrips