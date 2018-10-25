import { queryPart,updateEmp, queryEmp, addEmp} from '@/services/api';

export default {
  namespace: 'emp',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {

    *fetch({ payload }, { call, put }) {
      const response = yield call(queryEmp, payload);
      console.log('in affects fetche:',response,payload)
      const ret = (response.list !== undefined ? response :{list: response}) /*, pagination: {total: 48, pageSize: 10, current: 1}})*/
      yield put({
        type: 'save',
        payload: ret,
      });
    },    

    *add({ payload, callback }, { call }) {
      const response = yield call(addEmp, payload);
      if (callback) callback();
    },    

    *update({ payload, callback }, { call }) {
      const response = yield call(updateEmp, payload);
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
