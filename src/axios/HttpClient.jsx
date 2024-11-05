import axios from 'axios'
import join from 'url-join'

axios.interceptors.request.use(async (config)=> {

//   const jwtToken = await AsyncStorage.getItem("token")
//   if (jwtToken != null) {
//       config.headers = { 'x-access-token': jwtToken }
//   }
  // config.url = join('http://localhost:8091' , config.url); //localhost
  
  config.url = join('https://us-central1-node-backend-wh-84bfa.cloudfunctions.net/app', config.url); //hosting firebase function by node js
  return config;
  
});
export const httpClient = axios