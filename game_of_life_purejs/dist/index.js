"use strict";
var Cell;
(function (Cell) {
    Cell[Cell["Alive"] = 0] = "Alive";
    Cell[Cell["Dead"] = 1] = "Dead";
})(Cell || (Cell = {}));
var Universe = /** @class */ (function () {
    function Universe(width, height) {
        this.width = width;
        this.height = height;
        this.cells = [];
        for (var i = 0; i < width * height; i++) {
            if (i % 2 == 0 || i % 7 == 0) {
                this.cells.push(Cell.Alive);
            }
            else {
                this.cells.push(Cell.Dead);
            }
        }
    }
    Universe.prototype.display = function () {
        var result = [];
        for (var row = 0; row < this.height; row++) {
            for (var col = 0; col < this.width; col++) {
                if (this.cells[row * this.width + col] == Cell.Alive) {
                    result.push('◼');
                }
                else {
                    result.push('◻');
                }
            }
            result.push("\n");
        }
        return result.join('');
    };
    Universe.prototype.count_alive_neighbours = function (row, col) {
        var alive = 0;
        var dxs = [-1, 0, 1];
        var dys = [-1, 0, 1];
        for (var _i = 0, dxs_1 = dxs; _i < dxs_1.length; _i++) {
            var dx = dxs_1[_i];
            for (var _a = 0, dys_1 = dys; _a < dys_1.length; _a++) {
                var dy = dys_1[_a];
                if (dx == 0 && dy == 0) {
                    continue;
                }
                var neighbour_row = (row + dy) % this.height;
                var neighbour_col = (col + dx) % this.width;
                var neighbour_state = this.cells[neighbour_row * this.width + neighbour_col];
                if (neighbour_state == Cell.Alive) {
                    alive++;
                }
            }
        }
        return alive;
    };
    Universe.prototype.tick = function () {
        var new_state = [];
        for (var row = 0; row < this.height; row++) {
            for (var col = 0; col < this.width; col++) {
                var cell = this.cells[row * this.width + col];
                var live_neighbors = this.count_alive_neighbours(row, col);
                if (cell == Cell.Alive) {
                    if (live_neighbors == 2 || live_neighbors == 3) {
                        new_state.push(Cell.Alive);
                    }
                    else {
                        new_state.push(Cell.Dead);
                    }
                }
                else {
                    if (live_neighbors == 3) {
                        new_state.push(Cell.Alive);
                    }
                    else {
                        new_state.push(Cell.Dead);
                    }
                }
            }
        }
        this.cells = new_state;
    };
    return Universe;
}());
var pre = document.getElementById("game-of-life-canvas");
var frame_count_element = document.getElementById("frame-count");
var universe = new Universe(512, 512);
var frame_count = 0;
var renderLoop = function () {
    pre.textContent = universe.display();
    universe.tick();
    frame_count++;
    frame_count_element.textContent = frame_count.toString();
    requestAnimationFrame(renderLoop);
};
requestAnimationFrame(renderLoop);
