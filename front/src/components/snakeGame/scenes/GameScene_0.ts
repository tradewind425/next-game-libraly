import Phaser from 'phaser';
import { drawGrid } from '../views/components/drawGrid';
import { setupControls } from '../controllers/snakeController';

export class GameScene_0 extends Phaser.Scene {
    private snakeHead!: Phaser.GameObjects.Text;
    private snakeBody: Phaser.GameObjects.Text[] = [];
    private moveInterval = 500;
    private lastMoveTime = 0;
    private direction: 'left' | 'right' | 'up' | 'down' = 'left';
    private foods: Phaser.GameObjects.Text[] = [];
    private foodCount = 20;

    constructor() {
        super({ key: 'GameScene_0' });
    }

    preload(): void {
        // アセットのロード処理
    }

    create(): void {
        this.initializeGame();
        setupControls(this, this.setDirection);
        this.createFoods();
        drawGrid(this, 20);
    }

    private initializeGame(): void {
        this.setupGameArea();
        this.createSnakeHead();
    }

    private setupGameArea(): void {
        this.input.keyboard!.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('PauseScene', { previousSceneKey: this.scene.key });
        });
    }

    private createSnakeHead(): void {
        const gridSize = 20;
        const { width, height } = this.sys.game.canvas;
        const centerX = Math.round((width / 2) / gridSize) * gridSize;
        const centerY = Math.round((height / 2) / gridSize) * gridSize;
        this.snakeHead = this.add.text(centerX, centerY, '◆', {
            font: `${gridSize}px Arial`,
            color: '#00ff00'
        }).setOrigin(0.5);
    }

    setDirection = (newDirection: 'left' | 'right' | 'up' | 'down'): void => {
        if (this.direction === 'left' && newDirection === 'right' ||
            this.direction === 'right' && newDirection === 'left' ||
            this.direction === 'up' && newDirection === 'down' ||
            this.direction === 'down' && newDirection === 'up') {
            // 逆方向には変更しない
            return;
        }
        this.direction = newDirection;
    };

    private createFoods(): void {
        const gridSize = 20;
        const gridWidth = Math.floor(this.sys.game.canvas.width / gridSize);
        const gridHeight = Math.floor(this.sys.game.canvas.height / gridSize);
        const centerCoordinates = [];

        for (let x = 0; x < gridWidth; x++) {
            for (let y = 0; y < gridHeight; y++) {
                const centerX = (x * gridSize) + (gridSize / 2);
                const centerY = (y * gridSize) + (gridSize / 2);
                centerCoordinates.push({ centerX, centerY });
            }
        }

        for (let i = 0; i < this.foodCount; i++) {
            const randomIndex = Phaser.Math.Between(0, centerCoordinates.length - 1);
            const { centerX, centerY } = centerCoordinates[randomIndex];

            const food = this.add.text(centerX, centerY, '・', {
                font: '32px Arial',
                color: '#ff0000'
            }).setOrigin(0.5);
            this.foods.push(food);
        }
    }

    update(time: number): void {
        const gridSize = 20;
    
        if (time - this.lastMoveTime > this.moveInterval) {
            // ヘビの体の最後尾の位置を記録
            let lastX = this.snakeHead.x;
            let lastY = this.snakeHead.y;

            // ヘビの頭の移動
            switch (this.direction) {
                case 'left':
                    this.snakeHead.x -= gridSize;
                    break;
                case 'right':
                    this.snakeHead.x += gridSize;
                    break;
                case 'up':
                    this.snakeHead.y -= gridSize;
                    break;
                case 'down':
                    this.snakeHead.y += gridSize;
                    break;
            }

            // ヘビの体の各部分を前の部分があった位置に移動
            this.snakeBody.forEach(part => {
                const tempX = part.x;
                const tempY = part.y;
                part.x = lastX;
                part.y = lastY;
                lastX = tempX;
                lastY = tempY;
            });

            // ヘビと餌の衝突検出
            this.foods.forEach((food, index) => {
                if (Phaser.Geom.Intersects.RectangleToRectangle(this.snakeHead.getBounds(), food.getBounds())) {
                    food.destroy(); // 餌を消去
                    this.foods.splice(index, 1); // 配列から削除

                    // 新しい体の部分を追加
                    const newPart = this.add.text(lastX, lastY, '◇', {
                        font: `${gridSize}px Arial`,
                        color: '#00ff00'
                    }).setOrigin(0.5);
                    this.snakeBody.push(newPart);
                }
            });

            this.lastMoveTime = time;
        }
    }
}
