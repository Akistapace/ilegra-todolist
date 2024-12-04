import { ReactNode } from 'react';
import style from './style.module.css';
export const Row = ({ children }: { children: ReactNode }) => {
	return <tr className={style.tr}>{children}</tr>;
};

