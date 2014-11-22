
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
    }

    interface DecomposedDirection {
        alignment: Alignment;
        isPositive: boolean;
    }


    export function isValid(move: Move, gs: GameState): boolean {
        if (move.pieces.length === 0) return true; // can always pass
        if (move.pieces.length > gs.rules.maxPiecesPerMove) return false;
        var pieceMap = getPieceMap(gs);
        // verify each piece exists and is owned by the right player
        if (move.pieces.some((c: Coordinate) => pieceMap[c.toString()] !== gs.nextPlayer)) return false; 
        // handle the singleton case on its own: just verify we are moving into a valid unoccupied space on the board
        if (move.pieces.length === 1) {
            var nextSpace = getAdjacentCoord(move.pieces[0], move.direction);
            return isWithinBoardBoundaries(nextSpace, gs.rules) && pieceMap[nextSpace] === undefined;
        }
        var piecesAlignment = getAlignment(move.pieces);
        if (piecesAlignment == null) return false; // pieces were not in a line :(
        var isAStraightMove = piecesAlignment === decomposeDirection(move.direction).alignment;
        if (isAStraightMove) {
            // do the stragith move stuff
        } else {
            
        }

    }
}