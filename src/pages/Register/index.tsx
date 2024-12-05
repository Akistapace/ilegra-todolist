import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormRegister } from '../../components/FormRegister';
import useAuthControl from '../../store/userAuthControl';
import style from './style.module.css';
const PageRegister = () => {
	const { isAuthenticated } = useAuthControl();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) navigate('/to-do-list');
	}, [isAuthenticated]);

	return (
		<div className={`page ${style.pageRegister}`}>
			<div className={`${style.block} ${style.blockLeft}`}>
				<FormRegister />
			</div>
			<div className={`${style.block} ${style.blockRight}`}>
				<h1 className='title'>Ilegra Test</h1>
				<p>Sign in</p>
			</div>
		</div>
	);
};

export default PageRegister;

