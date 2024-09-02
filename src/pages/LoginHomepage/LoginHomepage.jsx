import { useNavigate } from 'react-router-dom';
import './loginHomepage.css';
import { useState } from 'react';
import landingImg from '../../assets/landing-image.jpg';

export default function LoginHomepage({ initialPath }) {
	const navigate = useNavigate();
	const [user, setUser] = useState({
		username: '',
	});

	const users = ['grumpy19', 'cooljmessy', 'happyamy2016', 'jessjelly'];

	function handleUserChange(e) {
		const newUsername = e.target.value;
		setUser((prevUser) => ({ ...prevUser, username: newUsername }));
	}

	function handleLogin(e) {
		e.preventDefault();
		localStorage.setItem('username', user.username);
		navigate(initialPath);
	}

	return (
		<div className='login-homepage'>
			<div className='login-homepage__form-container'>
				<div className='login-container__h1-container'>
					<h1 className='login-container__h1'>Welcome to NC News</h1>
				</div>
				<div className='login-homepage__image-container'>
					<img
						className='login-homepage__image'
						src={landingImg}
						alt='illustration of a man holding a phone device'
					/>
				</div>
				<div className='login-container__p-container'>
					<p className='login-container__p'>
						Select a username from the dropdown below to begin your journey. You
						can read articles, vote on them, add comments, or delete your
						previous comments.
					</p>
				</div>
				<section className='login-section'>
					<form action='' className='login-form' onSubmit={handleLogin}>
						<div className='form-group'>
							<label htmlFor='username' className='form-label'>
								Select Username
							</label>
							<select
								id='username'
								onChange={handleUserChange}
								value={user.username}
								className='form-select'
								required
							>
								<option value='' disabled>
									Choose a username
								</option>
								{users.map((username) => (
									<option key={username} value={username}>
										{username}
									</option>
								))}
							</select>
						</div>
						<button type='submit' className='login-button'>
							Sign In
						</button>
					</form>
				</section>
			</div>
		</div>
	);
}
