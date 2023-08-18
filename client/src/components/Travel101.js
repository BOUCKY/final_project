import React, {useEffect}from "react"
import PackingList from "./PackingList"
import TravelTips from './TravelTips'
import '../styling/travel101.css'

function Travel101(){

    useEffect(() => {
        document.title="Traveler's Club | Travel 101"
        document.body.style.backgroundColor="white"
    }, [])

    return(
        <div className="travel-page">
            <PackingList />
            <TravelTips />
        </div>
    )
}

export default Travel101