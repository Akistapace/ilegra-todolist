import style from './style.module.css';
export const PageNotFound = () => {
	return (
		<div className={`page ${style.pageNotFound}`}>
			<h1>Página não encontrada</h1>
		</div>
	);
};

