import { ReactNode } from 'react';
import style from './style.module.css';
export const Head = ({ children }: { children: ReactNode }) => {
	return <thead className={style.head}>{children}</thead>;
};

