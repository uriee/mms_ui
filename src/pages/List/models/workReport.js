import { fetchWR , fetchWorkPaths,update, insert } from '@/services/api';

export default {
  namespace: 'workReport',

  state: {
    
  },

  effects: {
    *fetchPaths({ payload }, { call, put }) {
      payload = {};
      const response = yield call(fetchWorkPaths, payload);
      const ret = {paths : response}
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~fetch Path")
      yield put({
        type: 'save',
        payload: ret,
      });   
    },

    *fetchWR({ payload }, { call, put }) {
      const response = yield call(fetchWR, payload.path);
      var ret = {wr : response, path : payload.path}
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~fetchNR")      
      yield put({
        type: 'save',
        payload: ret,
      });   
    },    

    *workRepotrAmount({ payload, callback }, { call }) {
      const response = yield call(updatePermissions, payload);
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~workRepotrAmount",payload)         
      if (callback) callback();
    },

    *workReportSerial({ payload, callback }, { call }) {
        const response = yield call(updatePermissions, payload);
        if (callback) callback();
      },  

    *workReportSerialSub({ payload, callback }, { call }) {
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
