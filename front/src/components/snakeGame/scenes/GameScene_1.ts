import Phaser from 'phaser';
import { Ball_1 } from '../models/GameModel';

export class GameScene_1 extends Phaser.Scene {
    private ball_1!: Ball_1;

    constructor() {
        super({ key: 'GameScene_1' });
    }

    preload(): void {
        // ここで必要なアセットをロード
    }

    create(): void {
        this.matter.world.setBounds();
    
        // ESCキーを押すとポーズ画面を表示
        this.input.keyboard!.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('PauseScene', { previousSceneKey: this.scene.key });
        });

        this.setupGame();
    }

    private setupGame(): void {
        // ボールのインスタンス化
        this.ball_1 = new Ball_1(this, 400, 300);
    }

    update(): void {
        // ボールの更新処理
        this.ball_1.update();
    }
}
