import style from './style.module.css';

type Bullet = {
	value: string;
	label: string;
};
interface Props {
	bullets: Bullet[];
	nameFilter: string;
	onclick: (bullet: string) => void;
}
export const Bullets = ({ bullets, nameFilter, onclick }: Props) => {
	return (
		<div className={style.filterButtonGroup}>
			{bullets?.map((bullet) => (
				<span
					key={bullet.value}
					className={`${style.bullet} ${bullet.value === nameFilter && style.bulletActive}`}
					onClick={() => onclick(bullet.value)}
					data-testid={'filter-' + bullet.value}
				>
					{bullet.label}
				</span>
			))}
		</div>
	);
};

