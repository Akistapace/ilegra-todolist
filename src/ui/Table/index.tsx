import { Body } from './Body';
import { Cell } from './Cell';
import { Head } from './Head';
import { Root } from './Root';
import { Row } from './Row';

export const Table = {
	root: Root,
	head: Head,
	body: Body,
	row: Row,
	cell: Cell,
} as const;

