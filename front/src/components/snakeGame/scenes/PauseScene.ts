import Phaser from 'phaser';

export class PauseScene extends Phaser.Scene {
    private previousSceneKey!: string;

    constructor() {
        super({ key: 'PauseScene' });
    }

    create(data: any): void {
        // ポーズ画面のUIを作成
        this.add.text(400, 300, 'Paused', { fontSize: '32px', color: '#FFF' })
            .setOrigin(0.5);

        // 前のシーンのキーを保存
        this.previousSceneKey = data.previousSceneKey;

        // ゲームを再開するためのイベントリスナーを追加
        this.input.keyboard!.on('keydown-ESC', () => {
            this.scene.stop();
            // 動的に前のシーンを再開
            if (this.previousSceneKey) {
                this.scene.resume(this.previousSceneKey);
            }
        });
    }
}
