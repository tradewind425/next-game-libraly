import Phaser from 'phaser';

// directionを更新する関数の型定義
type Direction = 'left' | 'right' | 'up' | 'down';
type SetDirectionFunction = (newDirection: Direction) => void;

export const setupControls = (scene: Phaser.Scene, setDirection: SetDirectionFunction): void => {
    scene.input.keyboard!.on('keydown-W', () => setDirection('up'));
    scene.input.keyboard!.on('keydown-A', () => setDirection('left'));
    scene.input.keyboard!.on('keydown-S', () => setDirection('down'));
    scene.input.keyboard!.on('keydown-D', () => setDirection('right'));
};
