export module Abalone {
export module Hex {
	// This module will be much easier to understand if you read this wonderful page: http://www.redblobgames.com/grids/hexagons/
	// every function in this module is pure
    export interface AxialCoordinate {
        q: number;
        r: number;
    }

    export interface CubicCoordinate {
        x: number;
        y: number;
        z: number;
    }

    export function axial2cubic(c: AxialCoordinate): CubicCoordinate {
    	return {x: c.q, y: -c.q-c.r, z: c.r};
    }
	
	export function cubic2axial(c: CubicCoordinate): AxialCoordinate {
		return {q: c.x, r: c.z};
	}

	function cubify(c: AxialCoordinate): CubicCoordinate;
	function cubify(c: CubicCoordinate): CubicCoordinate;
	function cubify(c: any): CubicCoordinate {
		return (c.q != null) ? axial2cubic(c) : c;
	}

	export function getNeighbors(c: AxialCoordinate): AxialCoordinate[];
	export function getNeighbors(c: CubicCoordinate): CubicCoordinate[];
	export function getNeighbors(c: any): any[] {
		var axialMode = (c.q != null);
		var origin = cubify(c);
		var copyAdd = (x, y, z) => {return {x: origin.x + x, y: origin.y + y, z: origin.z + z};};
		var neighbors = [copyAdd(-1, 0, 0), copyAdd(1, 0, 0), copyAdd(0, -1, 0), copyAdd(0, 1, 0), copyAdd(0, 0, -1), copyAdd(0, 0, 1)];
		return axialMode ? neighbors.map(cubic2axial) : neighbors;
	}


	export function manhattanDistance(c1: AxialCoordinate, c2: AxialCoordinate): number;
	export function manhattanDistance(c1: CubicCoordinate, c2: CubicCoordinate): number;
	export function manhattanDistance(c1: any			 , c2: any			  ): number {
		c1 = cubify(c1);
		c2 = cubify(c2);
		return (Math.abs(c1.x - c2.x) + Math.abs(c1.y - c2.y) + Math.abs(c1.z - c2.z))/2;
	}

	/** Function to determine if hex coordinates are colinear for purpose of seeing if they are a valid Abalone line for movement.
		Return true for empty list or singleton coordinate by fiat.
		Return true if they are colinear and are consecutively space (ie there are no gaps)
		Return false otherwise.
	*/
	export function isLine(cs: AxialCoordinate[]): boolean;
	export function isLine(cs: CubicCoordinate[]): boolean;
	export function isLine(cs: any[]): boolean {
		if (cs.length < 2) return true;
		var coordinates: CubicCoordinate[] = (cs[0].q != null) ? cs.map(axial2cubic) : cs;
		
		var axesDiffered = pairs(coordinates).reduce((accumulator, pair) => {
			return {
				x: accumulator.x && pair[0].x === pair[1].x,
				y: accumulator.y && pair[0].y === pair[1].y,
				z: accumulator.z && pair[0].z === pair[1].z,
			}}, {x: true, y: true, z: true});
		var numAxesDiffered = +axesDiffered.x + +axesDiffered.y + +axesDiffered.z;
		if (numAxesDiffered > 1) return false;

		var distances = coordinates.map((c: CubicCoordinate) => manhattanDistance(c, origin));
		if (_.max(distances) - _.min(distances) !== cs.length - 1) return false;
		return true;
	}

	export function distanceToOrigin(c: AxialCoordinate): number;
	export function distanceToOrigin(c: CubicCoordinate): number;
	export function distanceToOrigin(c: any): number {
		return manhattanDistance(cubify(c), {x: 0, y: 0, z: 0});
	}
}
}