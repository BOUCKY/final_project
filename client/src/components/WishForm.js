import { useState, useEffect } from "react"

function WishForm({user, place, addNewTrip, handleDelete, onClose}){

    const [formData, setFormData] = useState({rating:0, comments:''})

    const handleSubmit = (e) => {
        e.preventDefault()

        const newTripData = {
            ...formData,
            user_id: user.id,
            place_id: place.id
        }
        console.log(newTripData)
        fetch("/trips", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTripData),
        })
            .then((r) => r.json())
            .then((newTrip) => {
                addNewTrip(newTrip);
                setFormData({ rating: 0, comments: "" })
                onClose()
                handleDelete()
            })
    }


    const handleRatingChange = (e) => {
        setFormData({ ...formData, rating: e.target.value });
    };

    const handleCommentsChange = (e) => {
        setFormData({ ...formData, comments: e.target.value });
    };

    return(
        <div className="trip-form">
            <form onSubmit={handleSubmit} className="form">
                <label htmlFor="place-id">City:
                    <p className="input-text">{place.city}</p>
                </label>
                <label htmlFor="rating">Rating:
                    <input
                        onChange={handleRatingChange}
                        type='number'
                        min={0}
                        max={5}
                        placeholder="Rate out of 5 stars . . ."
                        className="input-num"
                        value={formData.rating}
                    ></input>
                </label>
                <label htmlFor="comments">Comments:
                    <textarea
                        onChange={handleCommentsChange}
                        type='text'
                        placeholder="Your comments . . ."
                        className="input-text"
                        value={formData.comments}
                    ></textarea>
                </label>
                <div className="btn-container">
                    <button type="submit" className="submit-btn">Submit</button>
                </div>
            </form>
        </div>
    )

}

export default WishForm