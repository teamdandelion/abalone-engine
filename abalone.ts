

interface GameRules {
	sideLength: number;
	maxPiecesPerMove: number;
	startingNumberPieces: number;
	marblesToWin: number;
	movesUntilTie: number;
}

interface Coordinate {
	x: number;
	y: number;
}

interface GameState {
	rules: GameRules;
	blackPieces: Coordinate[];
	whitePieces: Coordinate[];
	nextPlayer: Player
	turnCounter: number;
}

interface Move {
	direction: Direction;
	pieces: Coordinate[];
}

enum Direction {
	NORTH,
	NORTHEAST,
	SOUTHEAST,
	SOUTH,
	SOUTHWEST,
	NORTHWEST,
}

enum Player {
	WHITE,
	BLACK,
}

enum Outcome {
	ONGOING,
	WHITE,
	BLACK,
	TIE,
}

function outcome(gs: GameState): Outcome {
	if (gs.turnCounter > gs.rules.movesUntilTie) {
		return Outcome.TIE;
	}
	var losingThreshold = gs.rules.startingNumberPieces - gs.rules.marblesToWin;
	if  (gs.blackPieces.length < losingThreshold) {
		return Outcome.WHITE;
	} 
	if (gs.whitePieces.length < losingThreshold) {
		return Outcome.BLACK;
	}
	return Outcome.ONGOING;
}
