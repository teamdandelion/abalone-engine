///<reference path="../typings/lodash/lodash.d.ts" />
///<reference path="pairs.ts" />
module Abalone {
export module Hex {
	// This module will be much easier to understand if you read this wonderful page: http://www.redblobgames.com/grids/hexagons/
	// every function in this module is pure

    export interface Axial extends Array<number> {
        0: number;
        1: number;
    }

    export interface Cubic extends Array<number> {
        0: number;
        1: number;
        2: number;
    }


    export function axial2cubic(c: Axial): Cubic {
    	return [c[0], -c[0]-c[1], c[1]];
    }
	
	export function cubic2axial(c: Cubic): Axial {
		return [c[0], c[2]];
	}

	function cubify(c: Axial): Cubic;
	function cubify(c: Cubic): Cubic;
	function cubify(c: any): Cubic {
		return (c.length === 2) ? axial2cubic(c) : c;
	}

	function add(a: Cubic, b: Cubic) {
		return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
	}

	var directions: Cubic[] = [[-1, 0, 0], [1, 0, 0], [0, -1, 0], [0, 1, 0], [0, 0, -1], [0, 0, 1]];
	export function getNeighbors(c: Axial): Axial[];
	export function getNeighbors(c: Cubic): Cubic[];
	export function getNeighbors(c: any): any[] {
		var axialMode = (c.length === 2);
		var origin = cubify(c);
		var neighbors = directions.map((d) => add(d, origin));
		return axialMode ? neighbors.map(cubic2axial) : neighbors;
	}


	export function manhattanDistance(c1: Axial, c2: Axial): number;
	export function manhattanDistance(c1: Cubic, c2: Cubic): number;
	export function manhattanDistance(c1: any			 , c2: any			  ): number {
		c1 = cubify(c1);
		c2 = cubify(c2);
		return (Math.abs(c1[0] - c2[0]) + Math.abs(c1[1] - c2[1]) + Math.abs(c1[2] - c2[2]))/2;
	}

	/** Function to determine if hex coordinates are colinear for purpose of seeing if they are a valid Abalone line for movement.
		Return true for empty list or singleton coordinate by fiat.
		Return true if they are colinear and are consecutively space (ie there are no gaps)
		Return false otherwise.
	*/
	export function isLine(cs: Axial[]): boolean;
	export function isLine(cs: Cubic[]): boolean;
	export function isLine(cs: any[]): boolean {
		if (cs.length < 2) return true;
		var coordinates: Cubic[] = (cs[0].q != null) ? cs.map(axial2cubic) : cs;
		
		var axesDiffered = Util.pairs(coordinates).reduce((accumulator, pair) => {
			return {
				x: accumulator.x && pair[0][0] === pair[1][0],
				y: accumulator.y && pair[0][1] === pair[1][1],
				z: accumulator.z && pair[0][2] === pair[1][2],
			}}, {x: true, y: true, z: true});
		var numAxesDiffered = +axesDiffered.x + +axesDiffered.y + +axesDiffered.z;
		if (numAxesDiffered > 1) return false;

		var distances = coordinates.map((c: Cubic) => manhattanDistance(c, coordinates[0]));
		if (_.max(distances) - _.min(distances) !== cs.length - 1) return false;
		return true;
	}

	export function distanceToOrigin(c: Axial): number;
	export function distanceToOrigin(c: Cubic): number;
	export function distanceToOrigin(c: any): number {
		return manhattanDistance(cubify(c), [0,0,0]);
	}
}
}