import axios from 'axios';
import { notification } from 'antd';
import router from 'umi/router';
import hash from 'hash.js';
import { isAntdPro } from './utils';
import { getLocale } from 'umi/locale';


const getLang = () => {
  const langs = { 'en-US': 1, 'he-IL': 2, 'de-DE': 3 };
  return langs[getLocale()];
};

const getUser = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {}
  return {token: user.token ,username : user.username}
}

axios.interceptors.response.use(
  function(response) {
    console.log(' in the interceptor', response);
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

const codeMessage = {
  0: 'TEST',
  200: '200',
  201: '201',
  202: '202',
  204: '204',
  400: '205',
  401: 'Not authorized',
  402: 'Payment Required',
  403: '403',
  404: 'Not Found',
  406: 'Data been rejected by DB',
  410: '410',
  422: '422',
  500: '500',
  502: '502',
  503: '503',
  504: '504',
  555: 'Data not found',
};

const checkStatus = response => {
  console.log('checkStatus :', response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `Error ${response.status}`,
    description: errortext,
  });
  //return { currentAuthority: 'guest', status: response.status, type: 'acount' };

  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

const cachedSave = async (response, hashcode) => {
  const contentType = response.headers['content-type'];
  if (contentType && contentType.match(/application\/json/i)) {
    const content = await JSON.stringify(response.data);
    sessionStorage.setItem(hashcode, content);
    sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
  }
  return response;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function mrequest(
  url,
  options = {
    expirys: isAntdPro(),
  }
) {
  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */
  console.log('url:', url);

  let checkIfUpdated = options.method !== 'POST' && url.split('?')[1].includes('update');
  const user = getUser()
  /* strip UI parameters from url in order to use the caching mechanizem, add lang and authentication*/
  url =
    options.method == 'POST'
      ? url
      : url + `&lang=${getLang()}&token=${user.token}&user=${user.username}`; 
  //    : url.split('?').shift() + `?lang=${getLang()}&token=${user.token}&user=${user.username}`; 
  const fingerprint = url + (options.data ? JSON.stringify(options.data) : '');
  console.log('fingerprint:', fingerprint, options);
  const hashcode = hash
    .sha256()
    .update(fingerprint)
    .digest('hex');
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options ,};

  if (
    newOptions.method === 'post' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.data instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.data = JSON.stringify(newOptions.data);
      newOptions.data.token = user.token /*add authentication */
      newOptions.data.token = user.username /*add authentication */

    } else {
      // newOptions.data is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  const expirys = options.expirys || 60;
  // options.expirys !== false, return the cache,
  if (options.expirys !== false) {
    const cached = sessionStorage.getItem(hashcode);
    const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
    if (cached !== null && whenCached !== null) {
      const age = (Date.now() - whenCached) / 1000;
      if (age < expirys && !checkIfUpdated) {
        const response = new Response(new Blob([cached]));
        return response.json();
      }
      sessionStorage.removeItem(hashcode);
      sessionStorage.removeItem(`${hashcode}:timestamp`);
    }
  }
  console.log('before fetch', { url: url, ...newOptions });
  try {
    const resp = await axios({ url: url, ...newOptions })/*.catch(e => {
      console.log('Error in mrequest axios call', e.response);
      checkStatus(e.response)
      throw new Error("Server Error")
    });*/
    console.log('mrequest after axios call: ', resp);
    await checkStatus(resp);
    await cachedSave(resp, hashcode);
    console.log('mrequset after chseckstatus and cach:', resp);
    return resp.data;
  } catch (e) {
    console.log('erorr:', e, e.response);
    console.log('___________________________________________________________________________________________________', e.response)       
    const status = e && e.response && e.response.status;
    const error = e && e.response && e.response.data && e.response.data.error && e.response.data.error.detail || "Unknown Error";
     
    if (status === 401) {
      // @HACK
      /* eslint-disable no-underscore-dangle */
      window.g_app._store.dispatch({
        type: 'login/logout',
      });
      return 0;
    }

    // environment should not be used
    if (status === 403) {
      router.push('/exception/403');
      return 0;
    }
    if (status <= 504 && status >= 500) {
      router.push('/exception/500');
      return 0;
    }

    if (status === 406 ) {
      notification.error({
        message: `Error ${status}`,
        description: error,
      });  
      router.push('/exception/404');      
      return 0;
    }

    if (status >= 404 && status < 422) {
      router.push('/exception/404');
      return 0;
    }
  
    notification.error({
      message: `Error ${status}`,
      description: "Undefined Error",
      });  
    router.push('/exception/404'); 
    console.log('___________________________________________',window.location.href)
    return Promise.resolve("ERROR");
  }
  return 1;
}
