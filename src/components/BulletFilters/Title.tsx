import style from './style.module.css';
interface Props {
	children: React.ReactNode;
}
export const Title = ({ children }: Props) => {
	return <p className={style.filterTitle}>{children}</p>;
};

