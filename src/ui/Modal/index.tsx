import { lazy, Suspense } from 'react';
import { Button, Icons, Spinner } from '../../ui';
const ModalContent = lazy(() => import('./Modal.content'));
import style from './style.module.css';
interface Props {
	children: React.ReactNode;
	isOpen: boolean;
	onClick: () => void;
	onClose: () => void;
}
export const Modal = ({ children, isOpen, onClose, onClick }: Props) => {
	return (
		<>
			<Button type='button' variant='small' onClick={onClick} data-testid='button'>
				<Icons.add />
				Criar Tarefa
			</Button>
			{isOpen && (
				<Suspense
					fallback={
						<div className={style.fallback}>
							<Spinner width={'40px'} height={'40px'} />
						</div>
					}
				>
					<ModalContent onClose={onClose}>{children}</ModalContent>
				</Suspense>
			)}
		</>
	);
};

