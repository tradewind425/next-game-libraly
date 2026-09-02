import Phaser from 'phaser';

export class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    create(): void {
        // ポーズ画面のUIを作成
        // 注意: 'fill'の代わりに'color'を使用
        this.add.text(400, 300, 'Paused', { fontSize: '32px', color: '#FFF' })
            .setOrigin(0.5);

        // ゲームを再開するためのイベントリスナーを追加
        this.input.keyboard!.on('keydown-ESC', () => {
            this.scene.stop();
            this.scene.resume('GameScene');
        });
    }
}