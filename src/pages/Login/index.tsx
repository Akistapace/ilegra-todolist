import { useEffect } from 'react';
import { FormLogin } from '../../components/FormLogin';
import useAuthControl from '../../store/userAuthControl';
import style from './style.module.css';
import { useNavigate } from 'react-router-dom';
export const PageLogin = () => {
	const isAuthenticated = useAuthControl((state) => state.isAuthenticated);
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) navigate('/to-do-list');
	}, [isAuthenticated]);

	return (
		<div className={`page ${style.pageLogin}`}>
			<div className={`${style.block} ${style.blockLeft}`}>
				<h1 className='title'>Ilegra Test</h1>
				<p>Login</p>
			</div>
			<div className={`${style.block} ${style.blockRight}`}>
				<FormLogin />
			</div>
		</div>
	);
};

