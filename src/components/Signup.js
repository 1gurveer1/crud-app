import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import { useHistory,Link } from 'react-router-dom'

const Signup = () => {

    const [signup, setSignup] = useState({name: "", email: "", password: "" })
    let history = useHistory();


    const handleSubmit = async (e) => {

        e.preventDefault();
        const {name, email, password} = signup;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password})
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.token);
            history.push("/notes")
        }
        else {
            alert('Invalid Email or Password');
        }
    }

    const onChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    return (
        <div className="container">
            <Card className="signup" style={{marginTop: '60px'}}>
                <Card.Body>
                    <Card.Title style={{ textAlign: 'center', fontSize: '30px', color: '#08FDD8' }}>Signup</Card.Title>
                    <Card.Text>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Username </label>
                                <input type="name" className="form-control" id="name" name="name" minLength={4} onChange={onChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email </label>
                                <input type="email" className="form-control" id="email" name="email" onChange={onChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password" minLength={5} onChange={onChange} required />
                            </div>

                            <button type="submit" className="button my-3" >Signup</button>
                            <div style={{ textAlign: 'center' }}>Already have an account?<Link className="mx-2" style={{ textDecoration: 'none', color: '#08FDD8' }} to="/login"> Login</Link></div>
                        </form>

                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Signup