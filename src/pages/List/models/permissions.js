import { updatePermissions, fetch } from '@/services/api';

export default {
  namespace: 'permissions',

  state: {
    routes: [],
    profiles: [],
    type: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      payload = { entity: 'profile' };
      const response = yield call(fetch, payload);
      console.log('~~~~~~~~~~~~~~~~~~', response, payload);
      const ret = response.list !== undefined ? response : { profiles: response };
      yield put({
        type: 'save',
        payload: ret,
      });
    },

    *update({ payload, callback }, { call }) {
      const response = yield call(updatePermissions, payload);
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
