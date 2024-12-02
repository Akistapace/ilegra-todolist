import style from './style.module.css';

interface Props {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
}
export const Modal = ({ children, isOpen, onClose }: Props) => {
	const handleOverlayClick = (event: React.MouseEvent) => {
		if ((event.target as HTMLElement).classList.contains(style.modal)) {
			onClose();
		}
	};

	if (!isOpen) return null;

	return (
		<div className={style.modal} onClick={handleOverlayClick}>
			<div className={style.modalContent}>
				<span className={style.closeIcon} onClick={onClose}>
					&times;
				</span>
				{children}
			</div>
		</div>
	);
};

