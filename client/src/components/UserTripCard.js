import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as star } from '@fortawesome/free-regular-svg-icons'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'

function UserTripCard({placeCity, placeState, placeCountry, placeImage, rating, comments}){

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
                    {placeState ? <p className="trip-location">{placeCity}, {placeState}</p> : <p className="trip-location">{placeCity}</p>}
                    <p className="trip-location">{placeCountry}</p>
                    <p className="trip-card-title">Rating:</p>
                    <p className='trip-rating'> {stars}</p>
                    <p className="trip-comments">"{comments}"</p>
                </div>
            </div>
        </div>
    )

}

export default UserTripCard