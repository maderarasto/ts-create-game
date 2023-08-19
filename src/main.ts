import './style.css'
import config from './config';
import Game from './game/Game';

const container = document.querySelector('#app') as HTMLDivElement;
const canvas = document.createElement('canvas');

canvas.width = config.default.width;
canvas.height = config.default.height;
container.append(canvas);

const game = new Game(canvas, config);
game.run();