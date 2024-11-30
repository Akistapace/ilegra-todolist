import { useNavigate } from 'react-router-dom';
import { FormLogin } from '../../components/FormLogin';
import useAuthControl from '../../store/userAuthControl';
import style from './style.module.css';
export const Register = () => {
	const navigate = useNavigate();
	const login = useAuthControl((state) => state.login);

	const handleLogin = () => {
		login(); // Simulate login
		// Add logic for actual authentication
		navigate('/to-do-list');
		console.log('redirect');
	};
	return (
		<div className={`container ${style.pageRegister}`}>
			<div className={`${style.block} ${style.blockLeft}`}>
				<FormLogin />
				<button onClick={handleLogin}>Log In</button>
			</div>
			<div className={`${style.block} ${style.blockRight}`}>
				<p>Teste Ilegra</p>
				<p>Cadastro</p>
			</div>
		</div>
	);
};

