import initListener from './listener.js';
import AlertStore from './store.js';

var AlertSdk = {
    init: function (options) {
        // dev 下不上报
        if (process.env.NODE_ENV === "development") {
            return;
        }
        AlertStore.options = options;
        initListener();
    },
};

export { AlertSdk as default };
