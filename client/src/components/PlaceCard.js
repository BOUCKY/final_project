import '../styling/home.css'

function PlaceCard({city, state, country, image, addToWishList, inWishList}){

    return (
        <div className="place-card">
            <div className="placecard-content">
                <div className="placecard-image">
                    <img className='place-pic'src={image} alt={city} />
                </div>
                <div className="place-card-info">
                    {state ? <p className="place-location">{city}, {state}</p> : <p className="place-location">{city}</p>}
                    <p className="place-location">{country}</p>
                    {inWishList ? <button id="added" className="add-to-wish-list">Added!</button> : <button className="add-to-wish-list" onClick={addToWishList}>Add to Wish List</button>}
                </div>
            </div>
        </div>
    )
}

export default PlaceCard