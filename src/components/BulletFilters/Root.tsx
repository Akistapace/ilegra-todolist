import style from './style.module.css';

interface Props {
	children: React.ReactNode;
}
export const Root = ({ children }: Props) => {
	return <div className={style.filterButtons}> {children}</div>;
};

