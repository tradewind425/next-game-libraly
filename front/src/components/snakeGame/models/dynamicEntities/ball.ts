import Phaser from 'phaser';

abstract class AbstractBall {
    protected sprite!: Phaser.GameObjects.Sprite | Phaser.Physics.Arcade.Sprite | Phaser.Physics.Matter.Sprite;

    constructor(protected scene: Phaser.Scene, x: number, y: number, protected constantVelocity: { x: number, y: number }) {
        this.createBallTexture(x, y, 8);
    }

    protected abstract createBallTexture(x: number, y: number, radius: number): void;

    public abstract setupPhysics(): void;

    public update(): void {
        if (this.sprite instanceof Phaser.Physics.Matter.Sprite) {
            const body = this.sprite.body as MatterJS.BodyType;
            const currentVelocity = body.velocity;
            const currentSpeed = Math.sqrt(currentVelocity.x ** 2 + currentVelocity.y ** 2);
            const targetSpeed = Math.sqrt(this.constantVelocity.x ** 2 + this.constantVelocity.y ** 2);
            
            if (currentSpeed > 0) {
                const scale = targetSpeed / currentSpeed;
                this.sprite.setVelocity(currentVelocity.x * scale, currentVelocity.y * scale);
            }
        } else if (this.sprite instanceof Phaser.Physics.Arcade.Sprite) {
            const currentVelocity = this.sprite.body!.velocity;
            const currentSpeed = Math.sqrt(currentVelocity.x ** 2 + currentVelocity.y ** 2);
            const targetSpeed = Math.sqrt(this.constantVelocity.x ** 2 + this.constantVelocity.y ** 2);
            
            if (currentSpeed > 0) {
                const scale = targetSpeed / currentSpeed;
                this.sprite.setVelocity(currentVelocity.x * scale, currentVelocity.y * scale);
            }
        }
    }

    public getSprite(): Phaser.GameObjects.Sprite | Phaser.Physics.Arcade.Sprite | Phaser.Physics.Matter.Sprite {
        return this.sprite;
    }
}

export class MatterBall extends AbstractBall {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        // MatterBall に固有の速度を設定
        super(scene, x, y, { x: 10, y: 10 });
        this.setupPhysics();
    }

    protected createBallTexture(x: number, y: number, radius: number): void {
        const graphics = this.scene.add.graphics();
        graphics.fillStyle(0xffffff, 1.0);
        graphics.fillCircle(radius, radius, radius);
        graphics.generateTexture('ballTexture', radius * 2, radius * 2);
        graphics.destroy();
        this.sprite = this.scene.matter.add.sprite(x, y, 'ballTexture', undefined, { isStatic: false });
    }

    public setupPhysics(): void {
        (this.sprite as Phaser.Physics.Matter.Sprite).setCircle(8, { restitution: 1.0, friction: 0.0, density: 0.01 });
        (this.sprite as Phaser.Physics.Matter.Sprite).setVelocity(this.constantVelocity.x, this.constantVelocity.y);
    }
}

export class ArcadeBall extends AbstractBall {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        // ArcadeBall に固有の速度を設定
        super(scene, x, y, { x: 300, y: 300 });
        this.setupPhysics();
    }

    protected createBallTexture(x: number, y: number, radius: number): void {
        const graphics = this.scene.add.graphics();
        graphics.fillStyle(0xffffff, 1.0);
        graphics.fillCircle(radius, radius, radius);
        graphics.generateTexture('ballTexture', radius * 2, radius * 2);
        graphics.destroy();
        this.sprite = this.scene.physics.add.sprite(x, y, 'ballTexture').setCircle(radius);
    }

    public setupPhysics(): void {
        (this.sprite as Phaser.Physics.Arcade.Sprite).setBounce(1.0);
        (this.sprite as Phaser.Physics.Arcade.Sprite).setCollideWorldBounds(true);
        (this.sprite as Phaser.Physics.Arcade.Sprite).setVelocity(this.constantVelocity.x, this.constantVelocity.y);
    }
}
