import { spring, type Spring } from 'svelte/motion';

interface CubePiece {
	rotationX: number;
	rotationY: number;
	rotationZ: number;
}

interface CubeContextData {
	pieces: Map<string, Spring<CubePiece>>
	getPiece: (pieceInfo: Array<boolean>) => Spring<CubePiece> | undefined
}

const key = Symbol();

const pieceKeys = [
	'ftl',
	'ft',
	'ftr',
	'fl',
	'f',
	'fr',
	'fdl',
	'fd',
	'fdr',
	'tl',
	't',
	'tr',
	'l',
	'r',
	'dl',
	'd',
	'dr',
	'btl',
	'bt',
	'btr',
	'bl',
	'b',
	'br',
	'bdl',
	'bd',
	'bdr'
];

const cubeFaces = {
	top: [
		['top', 'top', 'top'],
		['top', 'top', 'top'],
		['top', 'top', 'top'],
	],
	front: [
		['front', 'front', 'front'],
		['front', 'front', 'front'],
		['front', 'front', 'front'],
	],
	back: [
		['back', 'back', 'back'],
		['back', 'back', 'back'],
		['back', 'back', 'back'],
	],
	down: [
		['down', 'down', 'down'],
		['down', 'down', 'down'],
		['down', 'down', 'down'],
	],
	left: [
		['left', 'left', 'left'],
		['left', 'left', 'left'],
		['left', 'left', 'left'],
	],
	right: [
		['right', 'right', 'right'],
		['right', 'right', 'right'],
		['right', 'right', 'right'],
	],
}

const createIntialCubePiece = (): CubePiece => ({
	rotationX: 0,
	rotationY: 0,
	rotationZ: 0
});

const createCubeData = (): CubeContextData => {
	const pieces = new Map<string, Spring<CubePiece>>(
		pieceKeys.map((key) => [key, spring(createIntialCubePiece(), {
			stiffness: .1,
			damping: .9
		})])
	);

	const getPiece = (pieceInfo: Array<boolean>) => pieces.get("fbtdlr".split('').filter((_, index) => pieceInfo[index]).join(''));

	return { pieces, getPiece };
};

export { key, createCubeData };
export type { CubePiece, CubeContextData };
