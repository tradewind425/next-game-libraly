import Phaser from 'phaser';
// Ball_0 のインポートに変更
import { Ball_0 } from '../models/GameModel';

export class GameScene_0 extends Phaser.Scene {
    // standardBall を Ball_0 型に変更
    private ball_0!: Ball_0;

    constructor() {
        super({ key: 'GameScene_0' });
    }

    preload(): void {
        // ここで必要なアセットをロード
    }

    create(): void {
        // Arcade Physics を使用するため、matter.world.setBounds() の呼び出しを削除またはコメントアウト
        // 代わりに、必要に応じて Arcade Physics の設定をここに追加

        // ESCキーを押すとポーズ画面を表示
        this.input.keyboard!.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('PauseScene', { previousSceneKey: this.scene.key });
        });

        this.setupGame();
    }

    private setupGame(): void {
        // ボールのインスタンス化を Ball_0 に変更
        this.ball_0 = new Ball_0(this, 400, 300);
    }

    update(): void {
        // ボールの更新処理を ball_0 に対して実行
        this.ball_0.update();
    }
}
