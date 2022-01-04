import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import image from "./work.png";

const Front = () => {

    let history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push("/login");
    }


    return (
        <>
            <div className="d-flex">
                <div className="container front">
                    <div className="fdiv" style={{ color: '#08FDD8' ,marginTop: '10px'}} > Welcome To, </div >
                    <div className="fdiv" style={{ color: '#08FDD8'}}>E~Note</div>

                </div >
                
                <div className="container"> <span className="display">Welcome To, E~Note</span>

                    <p className="fpara mx-2" style={{ color: 'white', marginTop: '10px' }}>
                        Save your notes in simple note taking website,
                        extend your collection by adding more notes and
                        your notes will be secured.
                    </p>

                    {!localStorage.getItem('token') ? <div><Link style={{ marginLeft: '0px' }} className="fbutton btn btn-primary my-3 " to="/login" role="button">Login</Link>
                        <Link className="fbutton btn btn-primary my-3 mx-2" to="/signup" role="button">Signup</Link></div> :
                        <button onClick={handleLogout} style={{ backgroundColor: '#08FDD8', color: '#1D1D1D', border: 'none' }} className="fbutton btn btn-primary my-3">Logout</button>
                    }
     
                </div>
                
            </div>
            <div >
                <img className="image" src={image} />
            </div>
            
            
        </>
        
    )

}

export default Front
