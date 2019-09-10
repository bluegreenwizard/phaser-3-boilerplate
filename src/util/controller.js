export default function createController(scene, actions) {
    //actions: inputs in form of object literal
    //e.g. { 'action_name': [KEY_CODE1, KEY_CODE2] }

    const _keyboard = {};
    const _timeouts = {};

    for (let action in actions) {
        _keyboard[action] = actions[action].map(keycode => {
            return scene.input.keyboard.addKey(keycode);
        });
    }

    scene.game.events.on('step', () => {
        _updateTimeouts();
    }, scene);

    const _updateTimeouts = function () {
        for(action in _timeouts) {
            _timeouts[action] == Math.min(_timeouts[action]--, 0);
        }
    }

    return {
        //TODO: Adapt for using event listeners
        // e.g. on('action', () => { do this });

        isDown(action) {
            if (_timeouts[action] > 0) {
                return false;
            }
            return _keyboard[action].some(key => {
                return key.isDown;
            });
        },

        setTimeout(action, delay, override = false) {
            //delay is timeout lenght in ms
            //override true means delay will be reset even if action is already timed out
            _timeouts[action] = override ? delay : _timeouts[action];
        }
    }
}