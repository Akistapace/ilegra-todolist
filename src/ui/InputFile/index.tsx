import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import style from './style.module.css';
import { Icons } from '../Icons';

type Props = {
	placeholder?: string;
	children?: React.ReactNode;
	register?: UseFormRegisterReturn;
	setValue: (fieldName: 'attachment', value: File[]) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputFile = ({ children, register, setValue, ...rest }: Props) => {
	const [preview, setPreview] = useState<string[]>([]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			const fileArray = Array.from(files);
			fileArray.forEach((file) => {
				const reader = new FileReader();
				reader.onloadend = () => {
					setPreview((prev) => [...prev, reader.result as string]);
				};
				if (file.type.startsWith('image')) {
					reader.readAsDataURL(file);
				} else {
					setPreview((prev) => [...prev, '']);
				}
			});

			setValue('attachment', fileArray);
		}
	};

	const handleRemoveFile = (index: number) => {
		const newPreview = preview.filter((_, i) => i !== index);
		setPreview(newPreview);

		if (rest.onChange) {
			rest.onChange({
				target: { value: newPreview },
			} as unknown as React.ChangeEvent<HTMLInputElement>);
		}
	};

	return (
		<div className={style.fileInput}>
			<input
				id='attachment'
				type='file'
				accept='image/*'
				multiple
				{...(register || {})}
				{...rest}
				onChange={handleFileChange}
				style={{ display: 'none' }}
			/>
			<label className={style.button} htmlFor='attachment'>
				<Icons.attachment />
				Anexar Arquivos
			</label>

			{preview.length > 0 && (
				<div className={style.wrapper}>
					{preview.map((image, index) => (
						<div key={index} className={style.preview}>
							{image ? (
								<img src={image} alt='Preview' className={style.image} />
							) : (
								<span>Arquivo não suportado</span>
							)}
							<span
								className={style.closeIcon}
								onClick={() => handleRemoveFile(index)}
							>
								&times;
							</span>
						</div>
					))}
				</div>
			)}

			{children}
		</div>
	);
};

