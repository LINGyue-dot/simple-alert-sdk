import axios from 'axios';
import AlertStore from './store.js';
import { genErrorDataHash } from './utils.js';

function send(errorData) {
    var hash = genErrorDataHash(errorData);
    axios
        .post("".concat(AlertStore.options.baseUrl, "/report"), {
        alertData: {
            project: AlertStore.options.project,
            env: AlertStore.options.env,
            version: AlertStore.options.version,
            type: errorData.type,
            data: JSON.stringify(errorData),
            fixed: false,
            hash: hash,
        },
    })
        .catch(function (e) { return console.log(e); });
}

export { send };
