export default function createController(scene, actions) {
    //actions: inputs in form of object literal
    //e.g. { 'action_name': [KEY_CODE1, KEY_CODE2] }

    const _keyboard = {};

    for (let action in actions) {
        _keyboard[action] = {
            keycodes: actions[action].map(keycode => {
                return scene.input.keyboard.addKey(keycode);
            }),
            callback: null,
            timeout: 0
        }

        _keyboard[action].keycodes.forEach(keycode => {
            keycode.on('down', (e) => {
                let fn = _keyboard[action].callback.bind(scene);
                fn(e);
            });
        });
    }

    scene.game.events.on('step', () => {
        _updateTimeouts();
    }, scene);

    const _updateTimeouts = function () {
        for(let action in _keyboard) {
            _keyboard[action].timeout = Math.min(_keyboard[action].timeout--, 0);
        }
    }

    return {
        //TODO : update sprites to use new controller

        isDown(action) {
            if (_keyboard[action].timeout > 0) {
                return false;
            }
            return _keyboard[action].keycodes.some(key => {
                return key.isDown;
            });
        },

        on(action, fn) {
            _keyboard[action].callback = fn;
        },

        setTimeout(action, delay, override = false) {
            //delay is timeout lenght in ms
            //override true means delay will be reset even if action is already timed out
            
            _keyboard[action].timeout = override ? delay : _timeouts[action];
        }   
    }
}