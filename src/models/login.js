import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { accountLogin, fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',
  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      console.log('1:', payload);
      //const alogin = (payload.userName != 'uri' ? fakeAccountLogin : accountLogin)
      const response = yield call(accountLogin, payload);
      console.log('login response:', response);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      console.log("iiiiiiii")
      // Login successfully
      if (response.statusText === 'OK' || response.status === 'ok') {
        reloadAuthorized();
        localStorage.setItem('user', JSON.stringify(response));
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        console.log('aaaaaaaaaaaaaaaaaaa:', urlParams, params);
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          console.log(' redirectUrlParams:', redirectUrlParams);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      localStorage.setItem('user', JSON.stringify({ status: 'log out' }));
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
