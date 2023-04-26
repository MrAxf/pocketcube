export const multiply = (matrixA: number[][], matrixB: number[][]) => {
	const result = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	];
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			for (let k = 0; k < 3; k++) {
				result[i][j] += matrixA[i][k] * matrixB[k][j];
			}
		}
	}
	return result;
};

export const rotation3Dmatrix = (rotationX: number, rotationY: number, rotationZ: number) => {
	let result = [
		[1, 0, 0],
		[0, 1, 0],
		[0, 0, 1]
	];

	result = multiply(result, [
		[Math.cos(rotationZ), -Math.sin(rotationZ), 0],
		[Math.sin(rotationZ), Math.cos(rotationZ), 0],
		[0, 0, 1]
	]);
	result = multiply(result, [
		[Math.cos(rotationY), 0, Math.sin(rotationY)],
		[0, 1, 0],
		[-Math.sin(rotationY), 0, Math.cos(rotationY)]
	]);
	result = multiply(result, [
		[1, 0, 0],
		[0, Math.cos(rotationX), -Math.sin(rotationX)],
		[0, Math.sin(rotationX), Math.cos(rotationX)]
	]);

	return result;
};

export const anglesFromMatrix = (matrix: number[][]) => ({
	rotationX: Math.atan2(matrix[2][1], matrix[2][2]),
	rotationY: Math.atan2(
		-matrix[2][0],
		Math.sqrt(Math.pow(matrix[2][1], 2) + Math.pow(matrix[2][2], 2))
	),
	rotationZ: Math.atan2(matrix[1][0], matrix[0][0])
});

export const DEG30 = Math.PI / 6;
export const DEG45 = Math.PI / 4;
export const DEG90 = Math.PI / 2;
export const DEG180 = Math.PI;
export const DEG270 = (3 * Math.PI) / 2;
export const DEG360 = 2 * Math.PI;
