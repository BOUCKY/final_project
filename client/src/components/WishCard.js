function WishCard({id, placeCity, placeState, placeCountry, placeImage, removeWishCard}){

    function handleDelete(){
        fetch(`/wishes/${id}`,
        {method: "DELETE",})
        .then(() => removeWishCard(id))  
    }

    return (
        <div className="wish-card">
            <div className="wish-card-content">
                <div className="wish-card-info">
                    <img className='wish-pic'src={placeImage} alt={placeCity} />
                    {placeState ? <p className="wish-location">{placeCity}, {placeState}</p> : <p className="wish-location">{placeCity}</p>}
                    <p className="wish-location">{placeCountry}</p>
                    <button className='wish-delete-button' onClick={handleDelete}>🗑</button>
                </div>
            </div>
        </div>
    )

}

export default WishCard