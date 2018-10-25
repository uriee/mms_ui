import { queryEmp, queryRule, removeRule, addRule, updateRule, addEmp } from '@/services/api';

export default {
  namespace: 'rule',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *updatee({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *fetche({ payload }, { call, put }) {
      const response = yield call(queryEmp, payload);
      console.log('in affects fetche:', response, payload);
      const ret =
        response.list != undefined
          ? response
          : { list: response }; /*, pagination: {total: 48, pageSize: 10, current: 1}})*/
      yield put({
        type: 'save',
        payload: ret,
      });
    },
    *fetch({ payload }, { call, put }) {
      console.log('in fetch payload:', payload);
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *adde({ payload, callback }, { call, put }) {
      console.log('in adde1:', payload);
      const response = yield call(addEmp, payload);
      console.log('in adde2:', payload, response);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
