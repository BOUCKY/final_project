import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faHeart as heart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faStar as star } from '@fortawesome/free-regular-svg-icons'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'

function TripCard({id, placeCity, placeState, placeCountry, placeImage, rating, comments, favorite, handleFavorite, removeTripCard}){

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

    const stars = generateStarIcons(rating)


    return (
        <div className="trip-card">
            <div className="tripcard-content">
                <div className="trip-card-info">
                    <img className='trip-pic'src={placeImage} alt={placeCity} />
                    {placeState ? <p className="trip-location">{placeCity}, {placeState}<button className='heart'onClick={(e) => handleFavorite(id,!favorite)}>{favorite ? filledHeart : outlinedHeart}</button></p> : <p className="trip-location">{placeCity}<button className='heart'onClick={(e) => handleFavorite(id,!favorite)}>{favorite ? filledHeart : outlinedHeart}</button></p>}
                    <p className="trip-location">{placeCountry}</p>
                    <p className="trip-card-title">My Rating:</p>
                    <p className='trip-rating'> {stars}</p>
                    <p className="trip-comments">"{comments}"</p>
                    <div className="trip-buttons">
                        <button className='trip-delete-button' onClick={handleDelete}>{trash}</button>
                        <button className='trip-edit-button'>{edit}</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default TripCard