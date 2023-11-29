enum Cell {
  Alive,
  Dead
}

class Universe {
  width: number;
  height: number;
  cells: Cell[];
  
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.cells = [];

    for (let i = 0; i < width * height; i++) {
      if (i % 2 == 0 || i % 7 == 0) {
        this.cells.push(Cell.Alive);
      } else {
        this.cells.push(Cell.Dead);
      }
    }
  }

  display(): string {
    let result: string[] = [];
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (this.cells[row * this.width + col] == Cell.Alive) {
          result.push('◼');
        } else {
          result.push('◻');
        }
      }
      result.push("\n");
    }
    return result.join('');
  }

  count_alive_neighbours(row: number, col: number): number {
    let alive = 0;
    const dxs = [-1, 0, 1];
    const dys = [-1, 0, 1];
    for (const dx of dxs) {
      for (const dy of dys) {
        if (dx == 0 && dy == 0) { continue; }
        const neighbour_row = (row + dy) % this.height;
        const neighbour_col = (col + dx) % this.width;
        const neighbour_state = this.cells[neighbour_row * this.width + neighbour_col];
        if (neighbour_state == Cell.Alive) {
          alive++;
        }
      }
    }
    return alive;
  }

  tick() {
    let new_state = [];
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        const cell = this.cells[row * this.width + col];
        const live_neighbors = this.count_alive_neighbours(row, col);
        if (cell == Cell.Alive) {
          if (live_neighbors == 2 || live_neighbors == 3) {
            new_state.push(Cell.Alive);
          } else {
            new_state.push(Cell.Dead);
          }
        } else {
          if (live_neighbors == 3) {
            new_state.push(Cell.Alive);
          } else {
            new_state.push(Cell.Dead);
          }
        }
      }
    }
    this.cells = new_state;
  }
}


const pre = document.getElementById("game-of-life-canvas") as HTMLParagraphElement;
const frame_count_element = document.getElementById("frame-count") as HTMLParagraphElement;
let universe = new Universe(512, 512);
let frame_count = 0;

const renderLoop = () => {
  pre.textContent = universe.display();
  universe.tick()
  frame_count++;
  frame_count_element.textContent = frame_count.toString();
  requestAnimationFrame(renderLoop);
}

requestAnimationFrame(renderLoop);