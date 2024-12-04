import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import useAuthControl from '../../store/userAuthControl';
import './style.css';
interface Prop {
	children: ReactNode;
}

const Layout = ({ children }: Prop) => {
	const isAuthenticated = useAuthControl((state) => state.isAuthenticated);
	const user = useAuthControl((state) => state.user);
	const logout = useAuthControl((state) => state.logout);

	return (
		<div className='body'>
			<header className='header'>
				<Link to='/'>
					<strong>To-Do List</strong>
				</Link>
				<nav>
					{isAuthenticated ? (
						<>
							<strong>Welcome, {user?.name}!</strong>

							<Button type='button' variant='small' onClick={logout}>
								Log Out
							</Button>
						</>
					) : (
						<>
							<Link to='/login'>Login</Link>
							<Link to='/register'>Sign in</Link>
						</>
					)}
				</nav>
			</header>
			<main className='main'>{children}</main>
			<footer className='footer'>
				<p>Fernando Aquistapace</p>
			</footer>
		</div>
	);
};

export default Layout;

