import './style.css'
import config from './config';
import Application from './framework/Application';

const container = document.querySelector('#app') as HTMLDivElement;
container.innerHTML = `
  <canvas width="${config.default.width}" height="${config.default.height}"></canvas>
`;

const game = new Application(config);
game.run();