import PackingList from "./PackingList"
import TravelTips from './TravelTips'
import '../styling/travel101.css'

function Travel101(){
    return(
        <div className="travel-page">
            <PackingList />
            <TravelTips />
        </div>
    )
}

export default Travel101