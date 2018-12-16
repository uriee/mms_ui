import {update,fetch, insert} from '@/services/api';

export default {
  namespace: 'action',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {

    *fetch({ payload }, { call, put }) {
      console.log("in action fetch",payload)
      const response = yield call(fetch, payload);
      console.log('in affects fetche:',response,payload)
      const ret = (response.list !== undefined ? response :{list: response}) /*, pagination: {total: 48, pageSize: 10, current: 1}})*/
        yield put({
          type: 'save',
          payload: ret,
        });        
    },    

    *add({ payload, callback }, { call }) {
      const response = yield call(insert, payload);
      if (callback) callback();
    },    

    *update({ payload, callback }, { call }) {
      const response = yield call(update, payload);
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
