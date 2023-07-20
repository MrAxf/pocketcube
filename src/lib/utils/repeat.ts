export default async function repeat(action: () => void, numTimes: number) {
	for (let i = 0; i < numTimes; i++) {
		await action();
	}
}
