import { useNavigate } from 'react-router-dom';
import style from './style.module.css';
import { Button } from '../../ui/Button';
export const PageHome = () => {
	const navigate = useNavigate();

	const handleNavigate = (page: string) => navigate(page);

	return (
		<div className={`container ${style.pageHome}`}>
			<div>
				<Button type='button' onClick={() => handleNavigate('/login')}>
					Entrar
				</Button>
				<Button type='button' onClick={() => handleNavigate('/register')}>
					Cadastrar
				</Button>
			</div>
		</div>
	);
};

