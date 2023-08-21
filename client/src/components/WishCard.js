function WishCard({id, placeCity, placeState, placeCountry, placeImage, removeWishCard}){

    function handleDelete(){
        fetch(`/wishes/${id}`,
        {method: "DELETE",})
        .then(() => removeWishCard(id))  
    }

    return (
        <div className="trip-card">
            <div className="tripcard-content">
                <div className="trip-card-info">
                    <img className='trip-pic'src={placeImage} alt={placeCity} />
                    {placeState ? <p className="trip-location">{placeCity}, {placeState}</p> : <p className="trip-location">{placeCity}</p>}
                    <p className="trip-location">{placeCountry}</p>
                    <button className='trip-delete-button' onClick={handleDelete}>🗑</button>
                </div>
            </div>
        </div>
    )

}

export default WishCard