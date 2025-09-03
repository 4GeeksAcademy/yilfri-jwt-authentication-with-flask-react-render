import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate();

	const [isLogged, setIsLogged] = useState(false)

	useEffect(() => {
		const jwt = localStorage.getItem('jwt-token');
		console.log(jwt)
		if (jwt == null) {
			setIsLogged(false)
		} else {
			setIsLogged(true)
		}
	}, [])

	const handleClick = () => {
		localStorage.removeItem('jwt-token');

		setTimeout(() => {
			navigate('/')
		}, 3000);

	}

	return (

		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">JSON Web Token</span>
				</Link>
				{isLogged ? (
					<div className="ml-auto">
						<Link to="/private">
							<button className="btn btn-primary me-1">Protected</button>
						</Link>
						<button type="button" className="btn btn-danger" onClick={handleClick}>Sign Out</button>
					</div>
				) : (

					<div className="ml-auto">
						<Link to="/login">
							<button className="btn btn-primary me-1">Login</button>
						</Link>
						<Link to="/signup">
							<button className="btn btn-success me-1">Sign Up</button>
						</Link>
					</div>
				)}

			</div>
		</nav>
	);
};