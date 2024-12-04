// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(
	func: T,
	delay: number,
	immediate: boolean = false
): (...args: Parameters<T>) => void {
	let timeoutId: ReturnType<typeof setTimeout>;
	let lastInvokeTime: number = 0;

	return (...args: Parameters<T>) => {
		const invokeFunc = () => {
			lastInvokeTime = Date.now();
			func(...args); // Chama a função diretamente sem a necessidade de `this` ou `.apply`
		};

		const shouldInvoke = immediate && !lastInvokeTime;

		clearTimeout(timeoutId);

		if (shouldInvoke) {
			invokeFunc();
		}

		timeoutId = setTimeout(() => {
			const timeElapsed = Date.now() - lastInvokeTime;
			if (timeElapsed >= delay) {
				invokeFunc();
			}
		}, delay);
	};
}

