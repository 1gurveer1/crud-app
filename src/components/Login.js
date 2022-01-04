import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'

const Login = () => {

    const [login, setLogin] = useState({ email: "", password: "" })
    let history = useHistory();


    const handleSubmit = async (e) => {

        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: login.email, password: login.password })
        });

        const json = await response.json();
        console.log(json);
        if(json.success) 
        {
            localStorage.setItem('token', json.token);
            history.push("/notes")
        }
        else
        {
            alert('Invalid Email or Password');
        }
    }

    const onChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    return (
        <div className="container">
            <Card className="login" style={{marginTop: '60px'}}>
                <Card.Body>
                    <Card.Title style={{ textAlign: 'center', fontSize: '30px', color: '#08FDD8' }}>Login</Card.Title>
                    <Card.Text>
                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email </label>
                                <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"
                                    onChange={onChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password"
                                    onChange={onChange} required />
                            </div>

                            <button type="submit" className="button my-3">Login</button>

                            <div style={{ textAlign: 'center' }}>Need an account ? <Link className="mx-2" style={{ textDecoration: 'none', color: '#08FDD8' }}  to="/signup"> sign up</Link></div>

                        </form>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Login
