import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor(config) {
        super(config);
        
    }

    getControls() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.confirm = this.input.keyboard.addKey('SPACE');
        this.cancel = this.input.keyboard.addKey('X');
    }
}