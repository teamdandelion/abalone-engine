
module AbaloneEngine {

    export interface GameRules {
        sideLength            : number;
        maxPiecesPerMove      : number;
        startingNumberPieces  : number;
        marblesLosingThreshold: number; // when you have fewer than this many marbles, you lose
        movesUntilTie         : number;
    }

    export interface Coordinate {
        x: number;
        y: number;
    }

    export interface GameState {
        rules      : GameRules;
        blackPieces: Coordinate[];
        whitePieces: Coordinate[];
        nextPlayer : Player
        turnCounter: number;
    }

    export interface Move {
        direction: Direction;
        pieces   : Coordinate[];
    }

    export enum Direction {
        NORTH    ,
        NORTHEAST,
        SOUTHEAST,
        SOUTH    ,
        SOUTHWEST,
        NORTHWEST,
    }

    export enum Player {
        WHITE,
        BLACK,
    }

    export enum Outcome {
        ONGOING,
        WHITE  ,
        BLACK  ,
        TIE    ,
    }

    interface PieceMap {[stringifiedCoordinate: string]: Player;} // useful representation: map from coordinate to which player controls that space


    function getPieceMap(gs: GameState): PieceMap {
        var pm: PieceMap = {};
        gs.blackPieces.forEach((c: Coordinate) => pm[c.toString()] = Player.BLACK);
        gs.whitePieces.forEach((c: Coordinate) => pm[c.toString()] = Player.WHITE);
        return pm;
    }

    export function outcome(gs: GameState): Outcome {
        if (gs.turnCounter > gs.rules.movesUntilTie)                 return Outcome.TIE;
        if (gs.blackPieces.length < gs.rules.marblesLosingThreshold) return Outcome.WHITE;
        if (gs.whitePieces.length < gs.rules.marblesLosingThreshold) return Outcome.BLACK;
        return Outcome.ONGOING;
    }

    function getAdjacentCoord(c: Coordinate, d: Direction): Coordinate {

    }

    function isWithinBoardBoundaries(c: Coordinate, r: GameRules) {

    }

    enum Alignment {
        STRAIGHT;
        LEFT;
        RIGHT;
        INVALID;
    }

    interface DecomposedDirection {
        alignment: Alignment;
        isPositive: boolean;
    }

    function getAlignment(c1: Coordinate, c2: Coordinate): Alignment {

    }

    function piecesAreInALine(pieces: Coordinate[]) {
        if (pieces.length < 2) return true;
        var origin = pieces[0];
        var alignments = pieces.slice(1).map((c: Coordinate) => getAlignment(c, origin));
        var uniqAlignments = _.uniq(alignments);
        if (uniqAlignments.length !== 1) return false;
        var alignment = uniqAlignments[0];
        if (alignment === Alignment.INVALID) return false;
        var distances = pieces.map((c: Coordinate) => getDistance(c, origin));
        var greatestDistance = _.max(distances) - _.min(distances);
        // at this point we have verified that they are all on the same alignment, so the pieces are a continuous line iff
        // the dstances from any arbitrary point are a continuous subsequence of the integers (necessarily including 0)
        // we can verify this efficiently by just checking the distance from the lowest to the highest distance
        if (greatestDistance + 1 !== pieces.length) return false;
        return true;
    }

    export function isValid(move: Move, gs: GameState): boolean {
        if (move.pieces.length === 0) return true; // can always pass
        if (move.pieces.length > gs.rules.maxPiecesPerMove) return false;
        var pieceMap = getPieceMap(gs);
        // verify each piece exists and is owned by the right player
        if (move.pieces.some((c: Coordinate) => pieceMap[c.toString()] !== gs.nextPlayer)) return false; 
        

        function adjacentSpaceIsAvailable(c: Coordinate): boolean {
            var nextSpace = getAdjacentCoord(c, move.direction);
            return isWithinBoardBoundaries(nextSpace, gs.rules) && pieceMap[nextSpace] === undefined;
        }

        if (!piecesAreInALine(move.pieces)) return false; 

        var piecesAlignment = getAlignment(move.pieces);
        if (piecesAlignment == null) return false; // pieces were not in a line :(
        var isAStraightMove = piecesAlignment === decomposeDirection(move.direction).alignment;
        if (isAStraightMove) {
            // do the stragith move stuff
        } else {
            return move.pieces.every(adjacentSpaceIsAvailable);
        }

    }
}