import style from './style.module.css';

interface Props {
	children: React.ReactNode;
	onClose: () => void;
}
const Modal = ({ children, onClose }: Props) => {
	const handleOverlayClick = (event: React.MouseEvent) => {
		if ((event.target as HTMLElement).classList.contains(style.modal)) {
			onClose();
		}
	};

	return (
		<div className={style.modal} onClick={handleOverlayClick} data-testid='modal'>
			<div className={style.modalContent}>
				<span
					className={style.closeIcon}
					onClick={onClose}
					data-testid='close-modal'
				>
					&times;
				</span>
				{children}
			</div>
		</div>
	);
};

export default Modal;

