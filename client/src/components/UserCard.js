import { Link } from 'react-router-dom'

function UserCard({id, username, image, trips}){

    return(
        <div className="user-card">
            <div className="user-content">
                <div className="user-card-info">
                    <Link to={`/user/${id}/trips`}>
                        <p className="card-username">{username}</p>
                        <img className="user-card-image" src={image} alt={username}/>
                    </Link>
                </div>
                <p className="user-trips">Trips: {trips.length}</p>
            </div>
        </div>
    )

}

export default UserCard