import Phaser from 'phaser';

export class Ball {
    private sprite!: Phaser.Physics.Matter.Sprite;
    private constantVelocity: { x: number, y: number } = { x: 10, y: 10 }; // 一定の速度を設定

    constructor(protected scene: Phaser.Scene, x: number, y: number) {
        // テクスチャを生成してスプライトを作成
        this.createBallTexture(x, y, 8); // テクスチャを適用
        this.setupPhysics(); //setupPhysics 関数の呼び出し
        this.sprite.setData('type', 'ball'); // カスタムプロパティとして "ball" を定義
        this.sprite.setCollisionCategory(0x0002); // 衝突カテゴリーを設定      
    }

     // Graphicsオブジェクトを使用してテクスチャを動的に生成
    private createBallTexture(x: number, y: number, radius: number): void {
        const graphics = this.scene.add.graphics();
        graphics.fillStyle(0xffffff, 1.0); // 塗りつぶしの色を設定
        graphics.fillCircle(radius, radius, radius); // 円を描画
        graphics.generateTexture('ballTexture', radius * 2, radius * 2); // テクスチャを生成
        graphics.destroy(); // Graphicsオブジェクトはもう不要なので破棄
        // 生成したテクスチャを使用してスプライトを作成
        this.sprite = this.scene.matter.add.sprite(x, y, 'ballTexture', undefined, {
            isStatic: false
        });
    }

    //ボールの物理特性を定義
    public setupPhysics(): void {
        this.sprite.setCircle(8, { restitution: 1.0, friction: 0.0, density: 0.01 });
        this.sprite.setVelocity(this.constantVelocity.x, this.constantVelocity.y);
    }

    public update(): void {
        
        const velocity = this.sprite.body!.velocity; // 現在の速度を取得    
        const currentSpeed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);  // 現在の速度の大きさを計算
        const targetSpeed = Math.sqrt(this.constantVelocity.x ** 2 + this.constantVelocity.y ** 2); // 目的の速度の大きさを計算
        // 現在の速度が0でない場合、速度を一定に保つ
        if (currentSpeed !== 0) {
            const scale = targetSpeed / currentSpeed;
            this.sprite.setVelocity(velocity.x * scale, velocity.y * scale);
        }
    }

    public getSprite(): Phaser.Physics.Matter.Sprite {
        return this.sprite;
    }
}
