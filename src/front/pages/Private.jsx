import React, { useState, useEffect } from "react"


export const Private = () => {
    const [isLogged, setIsLogged] = useState(false)

    const fetchProtected = async () => {
        const url = import.meta.env.VITE_BACKEND_URL
        const jwt = localStorage.getItem('jwt-token');

        try {
            const response = await fetch(`${url}/api/protected`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + jwt
                }
            })
            const result = await response.json();
            console.log(result)

            if (response.status == 200) {
                setIsLogged(true)
            } else {
                setIsLogged(false)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProtected()
    }, [])

    return (
        <div className="container">
            <h1 className="text-center text-primary">
                PROTECTED
            </h1>
            {isLogged ? (
                <p>Logged</p>
            ) : (
                <p>Not logged</p>
            )}

        </div>
    )
}