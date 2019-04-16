import { fetch_dash, fakeChartData } from '@/services/api';

export default {
  namespace: 'dash',

  state: {
    work_report_placements: [],
    work_report_products: [],
    work_report_placements_by_parent_resource :[],
    serial_stats: [],
    visitData2: [],
    salesData: [],
    searchData: [],
    offlineData: [],
    offlineChartData: [],
    loading: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(fetch_dash, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchProdData({ payload }, { call, put }) {
      const response = yield call(fetch_dash, payload);
      let pl = {};
      response.funcs && response.funcs.forEach(x => (pl[x] = response[x]));

      yield put({
        type: 'save',
        payload: pl,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      if(payload.work_report_placements_by_parent_resource) {
        const data = payload.work_report_placements_by_parent_resource
        const distinct_ts = [...new Set(data.map(x=>x.x))]
        const distinct_res = [...new Set(data.map(x=> x.name))].filter(x => x)
        const fetchQuant = (ts,res) => {
          const row = data.filter(row => row.name === res && row.x === ts)[0]
          return row && row.y
        }
        payload.work_report_placements_by_parent_resource = distinct_res
                  .map(res =>  ({ resource : res, data : distinct_ts
                  .map(ts => ({x:ts, y: fetchQuant(ts,res)}))
                  } ) )
      }

      console.log('Dash PayLoad in the save Reducer:',payload);
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        work_report_placements: [],
        work_report_products: [],
        work_report_placements_by_parent_resource:[],
        serial_stats: [],
        visitData2: [],
        salesData: [],
        searchData: [],
        offlineData: [],
        offlineChartData: [],
      };
    },
  },
};
