import React from 'react'
import {Link} from "react-router-dom"

const Navbar = () => {
    return (

        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#181818', color: '#08EFA0'}}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{ color: '#08FDD8' }} >E-Note</Link>
                <button style={{border: '1px solid #08EFA0' }} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i style={{ color: '#08EFA0' }}className="fas fa-sliders-h"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/notes" style={{ color: '#08FDD8' }}>Notes</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/create" style={{ color: '#08FDD8'}}>Create Blog</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/blogs" style={{ color: '#08FDD8' }}>Blogs</Link>
                        </li>
                        
                    </ul>
                    
                </div>
            </div>
        </nav>
    )
}

export default Navbar
