import { useState, useEffect } from "react"

function TripForm({user, place=null, addNewTrip}){

    const [formData, setFormData] = useState({rating:0, comments:''})
    const [inputPlace, setInputPlace] = useState('')
    const [placeCities, setPlaceCities] = useState([])

    useEffect(() => {
        fetch('https://travelers-club-backend.onrender.com/places')
            .then(r => r.json())
            .then(places => setPlaceCities(places.map(place => place.city)))
    }, [])

    const handleTab = (e) => {
        const matchingPlace = placeCities.find((place) => (place.toLowerCase().startsWith(inputPlace.toLocaleLowerCase()) ))

        if (e.key === 'Tab'){
            e.preventDefault()
            setInputPlace(matchingPlace)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({...formData, user_id: user.id, place_id: placeCities.indexOf(inputPlace)+1})
        fetch('https://travelers-club-backend.onrender.com/trips', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...formData, user_id: user.id, place_id: placeCities.indexOf(inputPlace)+1})
        })
            .then(r => r.json())
            .then(newTrip => addNewTrip(newTrip))
                setFormData({ rating: 0, comments: '' });
                setInputPlace('')
    }

    if(!!place){
        setFormData({...formData, place_id: place.id})
    }


    return(
        <div className="trip-form">
            <form onSubmit={handleSubmit} className="form">
                <label htmlFor="place-id">City:
                    <input
                        onChange={(e) => setInputPlace(e.target.value)}
                        onKeyDown={handleTab}
                        type="text"
                        placeholder="City name here . . ."
                        className="input-text"
                        value={inputPlace}
                    ></input>
                </label>
                <label htmlFor="rating">Rating:
                    <input
                        onChange={(e) => {setFormData({...formData, rating: e.target.value})}}
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
                        onChange={(e) => {setFormData({...formData, comments: e.target.value})}}
                        type='text'
                        placeholder="Your comments . . ."
                        className="input-text"
                        value={formData.comments}
                    ></textarea>
                </label>
                {placeCities.includes(inputPlace) ? <div className="btn-container"><button type="submit" className="submit-btn">Submit</button></div> : <div className="btn-container"><p className="shy-submit-btn">Submit</p></div> }
            </form>
        </div>
    )

}

export default TripForm