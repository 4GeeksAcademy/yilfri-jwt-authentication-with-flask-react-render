import React, { useState } from "react"
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alertFields, setAlertFields] = useState('d-none')
    const [alertMessage, setAlertMessage] = useState('')

    const navigate = useNavigate();

    const signup = async (email, password) => {
        const url = import.meta.env.VITE_BACKEND_URL

        const data = {
            email: email,
            password: password
        }

        try {
            const response = await fetch(`${url}/api/signup`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const result = await response.json();
            console.log(result)

            if (response.status == 201) {
                setAlertMessage("¡Wellcome!")
                setAlertFields('d-block')

                setTimeout(() => {
                    setAlertFields('d-none')
                    setAlertMessage('')

                    navigate('/')
                }, 3000);

                localStorage.setItem("jwt-token", result.access_token);
            } else {
                setAlertFields('d-block')
                setAlertMessage(result.msg)

                setTimeout(() => {
                    setAlertFields('d-none')
                    setAlertMessage('')
                }, 3000);
            }

        } catch (error) {
            setAlertFields('d-block')
            setAlertMessage("An error has occurred. Please try again later.")

            setTimeout(() => {
                setAlertFields('d-none')
                setAlertMessage('')
            }, 3000);
        }
    }

    const handleSignUp = (e) => {
        e.preventDefault()

        if (email == '' || password == '') {
            setAlertFields('d-block')
            setAlertMessage('You must complete all fields.')

            setTimeout(() => {
                setAlertFields('d-none')
                setAlertMessage('')
            }, 3000);
        } else {
            signup(email, password)
        }
    }

    return (
        <div className="container">
            <h1 className="text-center text-success">
                SIGN UP
            </h1>
            <div className={`alert alert-warning ${alertFields}`} role="alert">
                {alertMessage}
            </div>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={(e) => handleSignUp(e)}>Submit</button>
            </form>
        </div>
    )
}