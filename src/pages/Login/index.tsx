import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormLogin } from '../../components/FormLogin';
import useAuthControl from '../../store/userAuthControl';
import style from './style.module.css';
const PageLogin = () => {
	const { isAuthenticated } = useAuthControl();
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

export default PageLogin;

