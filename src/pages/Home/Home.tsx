import { useNavigate } from 'react-router-dom';
import style from './style.module.css';
import { Button } from '../../ui/Button';
export const PageHome = () => {
	const navigate = useNavigate();

	const handleNavigate = (page: string) => navigate(page);

	return (
		<div className={`page ${style.pageHome}`}>
			<Button
				type='button'
				variant='medium'
				onClick={() => handleNavigate('/login')}
			>
				Login
			</Button>
			<Button
				type='button'
				variant='medium'
				onClick={() => handleNavigate('/register')}
			>
				Sign in
			</Button>
		</div>
	);
};

