import Phaser from 'phaser';
import { StandardBall, StandardPaddle } from '../models/GameModel';
import { CollisionManager } from '../controllers/CollisionManager';
import { setBlocks } from '../controllers/setBlocks';
// ストアとアクションクリエイターのインポート
import { gameStore } from '../store/GameStore'; // 正しいパスに修正してください
import { setTotalBlocks } from '../store/BlockCountSlice'; // 正しいパスに修正してください

export class GameScene extends Phaser.Scene {
    private standardBall!: StandardBall;
    private standardPaddle!: StandardPaddle;
    private collisionManager!: CollisionManager;
    private totalBlocks!: number;

    constructor() {
        super({ key: 'GameScene' });
    }

    preload(): void {
        // ここで必要なアセットをロード
    }

    create(): void {
        this.matter.world.setBounds();
        this.collisionManager = new CollisionManager(this);
    
        // ESCキーを押すとポーズ画面を表示
        this.input.keyboard!.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('PauseScene');
        });

        this.events.off('blockDestroyed');
        this.events.on('blockDestroyed', () => {
            this.totalBlocks -= 1;
            if (this.totalBlocks === 0) {
                window.alert('ゲームクリア！');
                this.scene.restart(); // シーンをリスタート
            }
        });
    
        this.setupGame();
        gameStore.dispatch(setTotalBlocks(this.totalBlocks));
    }

    private setupGame(): void {
        // ボールのインスタンス化
        this.standardBall = new StandardBall(this, 400, 300);
        // パドルのインスタンス化
        this.standardPaddle = new StandardPaddle(this, this.cameras.main.centerX, this.cameras.main.height - 50);
        // ブロックのインスタンス化と設定
        this.totalBlocks = setBlocks(this);       
    }

    update(): void {
        // ボールとパドルの更新処理
        this.standardBall.update();
        this.standardPaddle.update();
    }
}
