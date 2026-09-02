// ../utils/GameConfig.ts
import Phaser from 'phaser';
import { PreloadScene } from '../scenes/PreloadScene';
import { TitleScene } from '../scenes/TitleScene';
import { GameScene } from '../scenes/GameScene';
import { PauseScene } from '../scenes/PauseScene';

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  scene: [PreloadScene, TitleScene, GameScene, PauseScene],
  physics: {
    default: 'matter',
    matter: {
      gravity: { x: 0, y: 0 },
      debug: process.env.NODE_ENV !== 'production',
    },
  },
};

export default gameConfig;
