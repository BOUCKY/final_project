import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserTripCard from './UserTripCard';

function UserTrips() {
  const {userId} = useParams()
  const [userTrips, setUserTrips] = useState([])
  const [username, setUsername] = useState('')

  useEffect(() => {
    fetch(`/users/${userId}/trips`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API response is an object with a 'trips' property
        const trips = data.trips || [] // Initialize with an empty array if 'trips' is missing
        setUserTrips(trips)
        setUsername(data.username)
      })
  }, [userId])

  const userTripCards = userTrips.map((trip) => (
    <UserTripCard
        key={trip.id}
        id={trip.id}
        placeCity={trip.place.city}
        placeState={trip.place.state}
        placeCountry={trip.place.country}
        placeImage={trip.place.image}
        rating={trip.rating}
        comments={trip.comments}
    />
  ))

  return (
    <div className='trip-page'>
        <div className='trip-list'>
            <p className="trip-header">{username}'s Trips</p>
            <div className="card">
                {userTripCards}
            </div>
        </div>
      
      
    </div>
  );
}

export default UserTrips;
