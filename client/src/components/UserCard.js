
function UserCard({username, image, trips}){
    
    const eachTrip = trips.map(trip => {
        return <li key={trip.id}>{trip.place.city}</li>
    })

    return(
        <div className="user-card">
            <div className="user-content">
                <div className="user-card-info">
                    <p className="card-username">{username}</p>
                    <img className="user-card-image" src={image} alt={username}/>
                    <p className="user-trips">{username}'s Trips:</p>
                    <li>{eachTrip}</li>
                </div>
            </div>
        </div>
    )

}

export default UserCard