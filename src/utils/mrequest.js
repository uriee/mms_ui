import axios from 'axios';
import router from 'umi/router';
import hash from 'hash.js';
import { isAntdPro } from './utils';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import { notification, message } from 'antd';

const getLang = () => {
  const langs = { 'en-US': 1, 'he-IL': 2, 'de-DE': 3 };
  return langs[getLocale()];
};

const getUser = () => {
  const user = localStorage.getItem('user') > '' && JSON.parse(localStorage.getItem('user')) || {};
  return { token: user.token, user: user.username ,auth: localStorage.getItem('antd-pro-authority') };
};

/*
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
*/
const codeMessage = {
  0: 'TEST',
  200: '200',
  201: '201',
  202: '202',
  204: '204',
  400: '205',
  401: 'Not authorized',
  402: 'Payment Required',
  403: 'UnAuthorized',
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
    message: `${response.status}`,
    description: errortext,
  });
  //return { currentAuthority: 'guest', status: response.status, type: 'acount' };

  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
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

  //let checkIfUpdated = options.method !== 'POST' && url.split('?')[1].includes('update');
  const user = getUser();
  options.data = {...options.data , ...user} 

  /* strip UI parameters from url in order to use the caching mechanizem, add lang and authentication*/
  url =
    options.method === 'POST'
      ? url
      : url + `&lang=${getLang()}&token=${user.token}&user=${user.user}&auth=${user.auth}`;
  //    : url.split('?').shift() + `?lang=${getLang()}&token=${user.token}&user=${user.username}`;
  const fingerprint = url + (options.data ? JSON.stringify(options.data) : '');
  console.log('fingerprint:', fingerprint, options,user);
  /*const hashcode = hash
    .sha256()
    .update(fingerprint)
    .digest('hex');
    */

  const defaultOptions = {
    credentials: 'include',
  };

  let  newOptions = { ...defaultOptions, ...options};
  Object.keys(newOptions).forEach(x=> newOptions[x] = (typeof newOptions[x] === 'string'  ? newOptions[x].trim() : newOptions[x]))

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

    } else {
      // newOptions.data is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  const expirys = options.expirys || 60;

  console.log('mrequest before ', { url: url, ...newOptions });
  try {
    const resp = await axios({
      url: url,
      ...newOptions,
    }); 

    await checkStatus(resp);

    if (resp.status === 201) message.success('Inserted');
    if (resp.status === 202) message.success('Updated');
    if (resp.status === 205) message.success('Removed');
    if (resp.status === 230) message.success('Successfull');
    console.log('mrequset after ', resp);
    return Promise.resolve(resp.data)
  } catch (e) {
    console.log(
      '___________________________________________4_______________________________________________________',
      e
    );
    const status = e && e.response && e.response.status;
    let etitle =
      (e &&
        e.response &&
        e.response.data &&
        e.response.data.error &&
        typeof e.response.data.error === 'string' &&
        e.response.data.error.split(':').reverse()[0]) ||
      'DB Script Error';
    const error =
      (e &&
        e.response &&
        e.response.data &&
        typeof e.response.data.error === 'string' &&
        e.response.data.error) ||
      '';
    console.log(
      '___________________________________________5_______________________________________________________',
      status,
      etitle,
      e
    );
    if (!e.response) {
      etitle = e;
      notification.error({
        message: `Error ${etitle}`,
        description: error,
      });
      router.push('/exception/404');
      return Promise.reject(error)
    }

    if (status === 401 || e === undefined) {
      // @HACK
      /* eslint-disable no-underscore-dangle */
      window.g_app._store.dispatch({
        type: 'login/logout',
      });
      return Promise.reject(error)
    }

    // environment should not be used
    if (status === 403) {
      notification.error({
        message: `403 ${etitle}`,
        description: error,
      });
      router.push('/exception/403');
      return Promise.reject(error)
    }
    if (status === 408) {
      notification.error({
        message: `Please login`,
        description: error,
      });
      router.push('/user/login');
      return Promise.reject(error)
    }    
    if (status <= 504 && status >= 500) {
      notification.error({
        message: `504 ${etitle}`,
        description: error,
      });
      router.push('/exception/500');
      return Promise.reject(error)
    }

    if (status === 406) {
      let constraint_error = null;
      try {
        constraint_error = etitle.split('on table')[2].split('"')[1];
      } catch {}

      etitle = constraint_error
        ? `${formatMessage({ id: 'errors.constraint_error' })} ${formatMessage({
            id: `menu.router.${constraint_error}`,
          })}`
        : etitle;

      notification.error({
        message: `${etitle}`,
        description: '',
      });

      return Promise.reject(error)
    }

    if (status >= 404 && status < 422) {
      notification.error({
        message: ` 404 ${etitle}`,
        description: error,
      });
      //router.push('/exception/404');
      return Promise.reject(error)
    }

    notification.error({
      message: `${status}`,
      description: 'Undefined Error',
    });
    router.push('/user/login');
    //return Promise.resolve('ERROR');
    return Promise.reject(error)
  }
  return 1;
}
