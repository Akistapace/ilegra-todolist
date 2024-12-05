import style from './style.module.css';
interface Props {
	width?: string;
	height?: string;
}
export const Spinner = ({ width, height }: Props) => {
	const size = {
		width: width || '15px',
		height: height || '15px',
	};
	return <span className={style.spinner} style={size}></span>;
};

