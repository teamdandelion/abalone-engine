///<reference path="../typings/lodash/lodash.d.ts" />
///<reference path="../src/hex.ts" />

describe("hex coordinate system", () => {
	var originA = [0, 0];
	var originC = [0, 0, 0];
	var edge1A = [0, 2];
	var edge1C = [0, -2, 2];
	var edge2A = [-2, 0];
	var edge2C = [-2, 2, 0];
	describe("coordinate conversion", () => {
		it("converts axial to cubic", () => {
			assert.deepEqual(originC, Abalone.Hex.axial2cubic(originA), "origin");
			assert.deepEqual(edge1C, Abalone.Hex.axial2cubic(edge1A), "edge1");
			assert.deepEqual(edge2C, Abalone.Hex.axial2cubic(edge2A), "edge2");
		});
		it("converts cubic to axial", () => {
			assert.deepEqual(originA, Abalone.Hex.cubic2axial(originC), "origin");
			assert.deepEqual(edge1A, Abalone.Hex.cubic2axial(edge1C), "edge1");
			assert.deepEqual(edge2A, Abalone.Hex.cubic2axial(edge2C), "edge2");
		});
		it("cubify works as expected", () => {
			assert.deepEqual(originC, Abalone.Hex.cubify(originA), "originA");
			assert.deepEqual(originC, Abalone.Hex.cubify(originC), "originC");
			assert.deepEqual(edge1C, Abalone.Hex.cubify(edge1A), "edge1A");
			assert.deepEqual(edge1C, Abalone.Hex.cubify(edge1C), "edge1C");
			assert.deepEqual(edge2C, Abalone.Hex.cubify(edge2A), "edge2A");
			assert.deepEqual(edge2C, Abalone.Hex.cubify(edge2C), "edge2C");
		});
	});	
	describe("getNeighbors", () => {
		it("neighbors of origin", () => {
			var neighbors = [[-1, 0, 0], [1, 0, 0], [0, -1, 0], [0, 1, 0], [0, 0, -1], [0, 0, 1]];
			assert.deepEqual(neighbors, Abalone.Hex.getNeighbors(originC));
			var axialNeighbors = neighbors.map(Abalone.Hex.cubic2axial);
			assert.deepEqual(axialNeighbors, Abalone.Hex.getNeighbors(originA));
		});
	});
});