import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faHeart as heart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faStar as star } from '@fortawesome/free-regular-svg-icons'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'

function TripCard({id, placeCity, placeState, placeCountry, placeImage, rating, comments, favorite, handleFavorite, removeTripCard, setRating, setComments}){

    function handleDelete(){
        fetch(`/trips/${id}`,
        {method: "DELETE",})
        .then(() => removeTripCard(id))
        
    }

    const trash = <FontAwesomeIcon icon={faTrashCan} style={{color: "#7e4c42",}} size='xs' />
    const edit = <FontAwesomeIcon icon={faPenToSquare} style={{color: "#7e4c42",}} size='xs' />
    const outlinedHeart = <FontAwesomeIcon icon={heart} style={{color: "#e02b07",}} />
    const filledHeart = <FontAwesomeIcon icon={solidHeart} style={{color: "#e02b07",}} />
    const outlinedStar = <FontAwesomeIcon icon={star} style={{ color: "#f7c94a" }} />
    const filledStar = <FontAwesomeIcon icon={solidStar} style={{ color: "#f7c94a" }} />


    function generateStarIcons(rating) {
        const totalStars = 5;
        const filledStars = rating;
        const outlinedStars = totalStars - filledStars;
        const stars = [];
    
        for (let i = 0; i < filledStars; i++) {
            stars.push(filledStar);
        }
    
        for (let i = 0; i < outlinedStars; i++) {
            stars.push(outlinedStar);
        }

        return stars;
    }

    const [editing, setEditing] = useState(false); // Add state for editing mode
    const [editedRating, setEditedRating] = useState(rating); // Edited rating state
    const [editedComments, setEditedComments] = useState(comments); // Edited comments state

    const stars = generateStarIcons(editedRating)
  
    const handleEdit = () => {
      setEditing(true);
    };
  
    const handleSave = () => {
      // Perform API call to update rating and comments
      fetch(`/trips/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: parseInt(editedRating), comments: editedComments }),
      })
        .then(response => response.json())
        .then(updatedTrip => {
          // Update the local state with the updated trip data
          setRating(updatedTrip.rating);
          setComments(updatedTrip.comments);
          setEditing(false); // Exit editing mode after saving
        })
        .then(console.log(rating))
        console.log("Save button clicked")

    };


    return (
        <div className="trip-card">
            <div className="tripcard-content">
            {editing ? (
          <div className="edit-mode">
            <label htmlFor="rating">Rating:
            <input
              type="number"
              value={editedRating}
              onChange={e => setEditedRating(e.target.value)}
            />
            </label>
            <label htmlFor="comments">Comments:
            <textarea
              value={editedComments}
              onChange={e => setEditedComments(e.target.value)}
            />
            </label>
            <div className="buttons">
                <button className='save'onClick={handleSave}>Save</button>
                <button className='save'onClick={handleSave}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="display-mode">
            <div className="trip-card-info">
                    <img className='trip-pic'src={placeImage} alt={placeCity} />
                    {placeState ? <p className="trip-location">{placeCity}, {placeState}<button className='heart'onClick={(e) => handleFavorite(id,!favorite)}>{favorite ? filledHeart : outlinedHeart}</button></p> : <p className="trip-location">{placeCity}<button className='heart'onClick={(e) => handleFavorite(id,!favorite)}>{favorite ? filledHeart : outlinedHeart}</button></p>}
                    <p className="trip-location">{placeCountry}</p>
                    <p className="trip-card-title">My Rating:</p>
                    <p className='trip-rating'> {stars}</p>
                    <p className="trip-comments">"{comments}"</p>
                    <div className="trip-buttons">
                        <button className='trip-delete-button' onClick={handleDelete}>{trash}</button>
                        <button className='trip-edit-button'onClick={handleEdit} >{edit}</button>
                    </div>
                </div>
          </div>
        )}
                
            </div>
        </div>
    )

}

export default TripCard