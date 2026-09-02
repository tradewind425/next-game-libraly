import Phaser from 'phaser';

export class PaddleController {
    private cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;
    private moveLeftKey!: Phaser.Input.Keyboard.Key; // Aキー
    private moveRightKey!: Phaser.Input.Keyboard.Key; // Dキー
    private jumpKey!: Phaser.Input.Keyboard.Key;
    private rotateKey!: Phaser.Input.Keyboard.Key;
    private isJumping: boolean = false;
    private isRotating: boolean = false;
    private initialY!: number;
    private jumpParams = {
        height: 60,
        frames: 5,
        currentFrame: 0,
    };
    private rotationParams = {
        amount: -180,
        frames: 10,
        currentFrame: 0,
    };

    constructor(private scene: Phaser.Scene) {
        this.setupKeys();
    }

    private setupKeys(): void {
        this.cursorKeys = this.scene.input.keyboard!.createCursorKeys();
        this.moveLeftKey = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A); // Aキー
        this.moveRightKey = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D); // Dキー
        this.jumpKey = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.rotateKey = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    }

    public update(paddle: Phaser.Physics.Matter.Sprite): void {
        if (!this.initialY) this.initialY = paddle.y;

        this.handleMovement(paddle);
        this.handleJump(paddle);
        this.handleRotation(paddle);
    }

    private handleMovement(paddle: Phaser.Physics.Matter.Sprite): void {
        const speed = 10;
        // カーソルキーまたはA、Dキーが押された場合に処理
        if (this.cursorKeys.left.isDown || this.moveLeftKey.isDown) {
            paddle.x -= speed;
        } else if (this.cursorKeys.right.isDown || this.moveRightKey.isDown) {
            paddle.x += speed;
        }
    }

    private handleJump(paddle: Phaser.Physics.Matter.Sprite): void {
        // ジャンプの処理
        if (Phaser.Input.Keyboard.JustDown(this.jumpKey) && !this.isJumping) {
            this.isJumping = true;
            this.jumpParams.currentFrame = 0;
        }
        // ジャンプ中の処理
        if (this.isJumping) {
            const jumpIncrement = this.jumpParams.height / this.jumpParams.frames;
            paddle.y -= jumpIncrement;
            this.jumpParams.currentFrame++;
            if (this.jumpParams.currentFrame >= this.jumpParams.frames) {
                paddle.y = this.initialY;
                this.isJumping = false;
            }
        }
    }

    private handleRotation(paddle: Phaser.Physics.Matter.Sprite): void {
        // 回転の処理
        if (Phaser.Input.Keyboard.JustDown(this.rotateKey) && !this.isRotating) {
            this.isRotating = true;
            this.rotationParams.currentFrame = 0;
        }
        // 回転中の処理
        if (this.isRotating) {
            const rotationIncrement = this.rotationParams.amount / this.rotationParams.frames;
            paddle.angle += rotationIncrement;
            this.rotationParams.currentFrame++;
            if (this.rotationParams.currentFrame >= this.rotationParams.frames) {
                this.isRotating = false;
            }
        }
    }
}
