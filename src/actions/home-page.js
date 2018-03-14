import cFetch from './../utils/cFetch';
import { API_CONFIG } from './../config/api';

const urls = [
  `http://172.16.1.221:9090/homes/banner?access_token=5738fa58-9635-45d9-badf-b03ae7f5b14c`,
  `http://172.16.1.221:9090/homes/spec?access_token=5738fa58-9635-45d9-badf-b03ae7f5b14c`,
  `http://172.16.1.221:9090/homes/sprog?access_token=5738fa58-9635-45d9-badf-b03ae7f5b14c`,
  `http://172.16.1.221:9090/homes/standard?access_token=5738fa58-9635-45d9-badf-b03ae7f5b14c`,
  `http://172.16.1.221:9090/homes/ad?access_token=5738fa58-9635-45d9-badf-b03ae7f5b14c`,
  `http://172.16.1.221:9090/homes/media?access_token=5738fa58-9635-45d9-badf-b03ae7f5b14c`,
  `http://172.16.1.221:9090/homes/partner?access_token=5738fa58-9635-45d9-badf-b03ae7f5b14c`,
] 

export const getData = () => {
  return {
      type: 'homePage/GET_DATA', 
      async payload () {
          return Promise.all(urls.map(url => 
              fetch(url, {method: 'GET'}))
          ).then(responses => Promise.all(responses.map(response => response.json()))
          ).then(result => {
              console.log(result);
              return result;
          });
      },
  }
}

// export const getData = () => {
//   return {
//     type: 'homePage/GET_DATA',
//     async payload () {
//       return {};
//     }
//   };
// };