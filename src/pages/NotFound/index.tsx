import style from './style.module.css';
const PageNotFound = () => {
	return (
		<div className={`page ${style.pageNotFound}`}>
			<h1>Página não encontrada</h1>
		</div>
	);
};

export default PageNotFound;

