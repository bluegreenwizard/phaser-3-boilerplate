import GameScene from './GameScene';
import createController from '../util/controller';
import config from '../config';

export default class TitleScreen extends GameScene {
    constructor() {
        super({key: 'TitleScreen'});
    }

    init() {
    
    }

    preload() {
        
    }

    create() {
        this.ctrl = createController(this, config.buttons);

        this.cameras.main.setBackgroundColor('#EDEDED');
        let title = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - (this.cameras.main.height / 4), 
            'Game Title',
            {
                color: 'black',
                fontFamily: 'sans-serif',
                fontSize: '30px'
            }
        );
        title.setOrigin(0.5);

        this.ctrl.on('confirm', () => {
            this.scene.start('GamePlay');
        });
    }

    update(time, delta) {
        
    }
}