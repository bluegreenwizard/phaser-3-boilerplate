import Phaser from 'phaser';
import createController from '../util/controller';
import gameConfig from '../config';

export default class Walker extends Phaser.GameObjects.Sprite {
    constructor(config) {
        const { scene, x, y } = config;

        super(scene, x, y, 'walker');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.collideWorldBounds = true;
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        
        this.ctrl = createController(this.scene, gameConfig.playerControls);

        this.scene.anims.create({
            key: 'stand',
            frames: this.scene.anims.generateFrameNumbers('walker', { start: 0, end: 1 }),
            frameRate: 0.5,
            repeat: -1
        });
        
        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNumbers('walker', { start: 2, end: 7 }),
            frameRate: 7,
            repeat: -1
        });
        
        this.anims.play('stand');
    }

    static preload(scene) {
        scene.load.spritesheet(
            'walker',
            'assets/walk.png',
            { frameWidth: 16, frameHeight: 32 }
        )
    }
        
    update(time, delta) {
        if (this.ctrl.isDown('left')) {
            this.body.setVelocityX(-50);
            this.anims.play('walk', true);
            this.flipX = true;
        } else if (this.ctrl.isDown('right')) {
            this.body.setVelocityX(50);
            this.anims.play('walk', true);
            this.flipX = false;
        } else {
            this.body.setVelocityX(0)
            this.anims.play('stand');
        }
    }
}