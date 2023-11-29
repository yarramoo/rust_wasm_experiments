import { Universe } from './pkg';


const pre = document.getElementById("game-of-life-canvas");
const frame_count_element = document.getElementById("frame-count");
const universe = Universe.new(512, 512);
let frame_count = 0;

const renderLoop = () => {
    pre.textContent = universe.render();
    universe.tick();
    frame_count_element.innerText = frame_count.toString();
    frame_count++;
  
    requestAnimationFrame(renderLoop);
  };

requestAnimationFrame(renderLoop);
