import { ReactNode } from 'react';
import style from './style.module.css';
export const Body = ({ children }: { children: ReactNode }) => {
	return <tbody className={style.head}>{children}</tbody>;
};

