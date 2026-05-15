import * as vsn from "../../package.json";

export const environment =
  {
       // appVersion: require('../../package.json').version,
      appVersion: vsn.version,
    production: true,
    API_URL: 'https://admission.rjcollege.edu.in:7005',
      API_URL_RECIEPT: 'https://admission.rjcollege.edu.in:7001',
    demoMode: false,
  };
