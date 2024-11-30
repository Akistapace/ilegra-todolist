import { FC, ReactNode } from 'react';
// import { Link } from 'react-router-dom';
// import useAuthControl from '../store/userAuthControl';
import style from './style.module.css';

// interface AuthControl {
// 	isAuthenticated: boolean;
// 	user: {
// 		name: string;
// 		email: string;
// 		password: string;
// 	} | null;
// 	logout: () => void;
// }
interface layoutProp {
	children: ReactNode;
}
const Layout: FC<layoutProp> = ({ children }) => {
	// const { isAuthenticated, logout } = useAuthControl((state: AuthControl) => ({
	// 	isAuthenticated: state.isAuthenticated,
	// 	user: {
	// 		name: state.user?.name,
	// 		email: state.user?.email,
	// 		password: state.user?.password, // Only for demonstration purposes, do not store passwords in the state. Use a secure storage system instead.
	// 	},
	// 	logout: state.logout,
	// 	// Only for demonstration purposes, do not store the logout function in the state. Use a secure storage system instead.
	// }));

	return (
		<div className={style.body}>
			<header className={style.header}>
				<nav>
					{/* {isAuthenticated ? (
						<>
							<Link to='/to-do-list'>Dashboard</Link>
							<button onClick={logout}>Log Out</button>
						</>
					) : (
						<Link to='/login'>Login</Link>
					)} */}
				</nav>
			</header>
			<main className={style.main}>{children}</main>
			<footer className={style.footer}>
				<p>Fernando Aquistapace</p>
			</footer>
		</div>
	);
};

export default Layout;

