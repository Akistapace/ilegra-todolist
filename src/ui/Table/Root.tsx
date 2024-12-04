import { ReactNode } from 'react';
import style from './style.module.css';
export const Root = ({ children }: { children: ReactNode }) => {
	return <table className={style.table}>{children}</table>;
};

