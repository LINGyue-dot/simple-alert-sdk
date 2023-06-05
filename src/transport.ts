import axios from "axios";
import AlertStore from "./store";
import { ErrorDataType } from "./types";
import { genErrorDataHash } from "./utils";

export function send(errorData: ErrorDataType) {
  const hash = genErrorDataHash(errorData);

  console.log(axios);
  axios.request({
    method: "post",
    url: `${AlertStore.options.baseUrl}/report`,
    data: {
      alertData: {
        project: AlertStore.options.project,
        env: AlertStore.options.env,
        version: AlertStore.options.version,
        type: errorData.type,
        data: JSON.stringify(errorData),
        fixed: false,
        hash,
      },
    },
  });

  axios
    .post(`${AlertStore.options.baseUrl}/report`, {
      alertData: {
        project: AlertStore.options.project,
        env: AlertStore.options.env,
        version: AlertStore.options.version,
        type: errorData.type,
        data: JSON.stringify(errorData),
        fixed: false,
        hash,
      },
    })
    .catch((e) => console.log(e));
}
