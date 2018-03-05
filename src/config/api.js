let host;

/*if(process.env.NODE_ENV == "test"){
  host = "http://localhost:4000";
}else{
  host = location.origin;
}*/

host = 'http://172.16.7.3:8020';


const baseUri = host + '/';
export const API_CONFIG = {
  host: host,
  baseUri: baseUri,
  auth: 'uaa/oauth/token',
  user: 'permission/users/getByToken'
};