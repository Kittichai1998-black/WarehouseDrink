import axios from 'axios'
import join from 'url-join'

axios.interceptors.request.use(async (config)=> {

//   const jwtToken = await AsyncStorage.getItem("token")
//   if (jwtToken != null) {
//       config.headers = { 'x-access-token': jwtToken }
//   }
  config.url = join('https://us-central1-node-backend-wh.cloudfunctions.net/app', config.url);
  return config;
  
});
export const httpClient = axios