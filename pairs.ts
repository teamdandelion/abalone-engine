module Abalone {
export module Util {
	export function pairs<T>(xs: T[]): [T,T][] {
		function toPair(x: T, i: number): [T,T] {
			return [x, xs[i+1]];
		}
		return xs.slice(0, xs.length-1).map(toPair);
	}
}
}	