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
     
      yield put({
        type: 'save',
        payload: ret,
      });   
    },

    *fetchWR({ payload }, { call, put }) {
      const response = yield call(fetchWR, payload.path);
      var ret = { wr : response.WR,
                  loc :response.loc,
                  type : response.type,
                  fix : response.fix,                  
                  path : payload.path,
                  kit : response.kit,
                  son_identifiers :  response.son_identifiers }

      yield put({
        type: 'save',
        payload: ret,
      });   
    },    

    *workRepotrAmount({ payload, callback }, { call }) {
      const response = yield call(updatePermissions, payload);
           
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

    *lot_swap({ payload, callback }, { call }) {
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
