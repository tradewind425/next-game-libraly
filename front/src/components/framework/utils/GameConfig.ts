// GameConfig.ts
import Phaser from 'phaser';
import { PreloadScene } from '../scenes/PreloadScene';
import { TitleScene } from '../scenes/TitleScene';
import { GameScene_0 } from '../scenes/GameScene_0';
import { GameScene_1 } from '../scenes/GameScene_1';
import { PauseScene } from '../scenes/PauseScene';

// 画面サイズの設定
export const gameDimensions = {
  width: 800,
  height: 600,
};

// 物理エンジンを選択する変数 0:Arcade Pysix 1:Matter
type PhysicsEngineType = 0 | 1;
export const physicsEngineType: PhysicsEngineType = 1;

// 物理エンジンの設定を動的に決定する関数
const getPhysicsConfig = (engineType: PhysicsEngineType): Phaser.Types.Core.PhysicsConfig => {
  return engineType === 0 ? {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: process.env.NODE_ENV !== 'production',
    },
  } : {
    default: 'matter',
    matter: {
      gravity: { x: 0, y: 0 },
      debug: process.env.NODE_ENV !== 'production',
    },
  };
};

// ゲーム設定を生成する関数をデフォルトエクスポートに変更
export default function getGameConfig(): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    ...gameDimensions,
    parent: 'game-container',
    scene: [PreloadScene, TitleScene, GameScene_0, GameScene_1, PauseScene],
    physics: getPhysicsConfig(physicsEngineType),
  };
};
