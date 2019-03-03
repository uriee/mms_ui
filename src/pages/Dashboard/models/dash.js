import { fetch_dash, fakeChartData } from '@/services/api';

export default {
  namespace: 'dash',

  state: {
    work_report_placements: [],
    work_report_products: [],
    serial_stats: [],
    visitData2: [],
    salesData: [],
    searchData: [],
    offlineData: [],
    offlineChartData: [],
    salesTypeData: [],
    salesTypeDataOnline: [],
    salesTypeDataOffline: [],
    radarData: [],
    loading: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      console.log('in dash fetch', payload);
      const response = yield call(fetch_dash, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      console.log('in dash fetch after yield ', response);
    },

    *fetchProdData({ payload }, { call, put }) {
      const response = yield call(fetch_dash, payload);
      let pl = {};
      response.funcs && response.funcs.forEach(x => (pl[x] = response[x]));
      console.log('pl:', response, pl);
      yield put({
        type: 'save',
        payload: pl,
      });
      console.log('in dash fetchprodata after yield ', response);
    },

    *fetchSalesData(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        work_report_placements: [],
        work_report_products: [],
        serial_stats: [],
        visitData2: [],
        salesData: [],
        searchData: [],
        offlineData: [],
        offlineChartData: [],
        salesTypeData: [],
        salesTypeDataOnline: [],
        salesTypeDataOffline: [],
        radarData: [],
      };
    },
  },
};
