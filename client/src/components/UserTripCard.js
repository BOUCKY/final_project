function UserTripCard({placeCity, placeState, placeCountry, placeImage, rating, comments}){

    return (
        <div className="trip-card">
            <div className="tripcard-content">
                <div className="trip-card-info">
                    <img className='trip-pic'src={placeImage} alt={placeCity} />
                    {placeState ? <p className="trip-location">{placeCity}, {placeState}</p> : <p className="trip-location">{placeCity}</p>}
                    <p className="trip-location">{placeCountry}</p>
                    <p className="trip-card-title">My Rating:</p>
                    <p className='trip-rating'> {'⭐️'.repeat(rating)}</p>
                    <p className="trip-comments">"{comments}"</p>
                </div>
            </div>
        </div>
    )

}

export default UserTripCard