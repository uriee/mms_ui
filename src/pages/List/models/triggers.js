import { fetchTriggersSchemas, fetchTriggersFields, insertTrigger , deleteTrigger} from '@/services/api';

export default {
  namespace: 'triggers',

  state: {
  },

  effects: {
    *fetchSchemas({ payload }, { call, put }) {
      const response = yield call(fetchTriggersSchemas, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchFields({ payload }, { call, put }) {
        const response = yield call(fetchTriggersFields, payload);  
        console.log("!!!!!!!:",response)  
      const ret = response.list !== undefined ? response : { fields: response };
      yield put({
        type: 'save',
        payload: response,
      });
    },    

    *add({ payload, callback }, { call }) {
      const response = yield call(insertTrigger, payload);
      if (callback) callback();
    },

    *delete({ payload, callback }, { call }) {
      const response = yield call(deleteTrigger, payload);
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
