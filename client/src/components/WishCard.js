import React, { useState, useContext } from "react"
import { UserContext } from "../context/user"
import WishForm from "./WishForm"

function WishCard({id, place, placeCity, placeState, placeCountry, placeImage, removeWishCard, addNewTrip}){

    const {user} = useContext(UserContext)
    const [ShowWishForm, setShowWishForm] = useState(false)

    const handleMove = () => {
        setShowWishForm(true);
    }
    
    function handleDelete(){
        fetch(`/wishes/${id}`,
        {method: "DELETE",})
        .then(() => removeWishCard(id))  
    }


    return (
        <div className="wish-card">
                {ShowWishForm && (
                    <WishForm
                        place={place}
                        user={user}
                        addNewTrip={addNewTrip}
                        handleDelete={handleDelete}
                        wish_id={id}
                        onClose={() => setShowWishForm(false)}
                    />
                )}
            <div className="wish-card-content">
                <div className="wish-card-info">
                    <img className='wish-pic'src={placeImage} alt={placeCity} />
                    {placeState ? <p className="wish-location">{placeCity}, {placeState}</p> : <p className="wish-location">{placeCity}</p>}
                    <p className="wish-location">{placeCountry}</p>
                    <div className="buttons">
                        <button className='wish-delete-button' onClick={handleMove}>I Went There!</button>
                        <button className='wish-delete-button' onClick={handleDelete}>Nevermind...</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default WishCard