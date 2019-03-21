import { updateResources, fetchResources } from '@/services/api';

export default {
  namespace: 'resources',

  state: {},

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fetchResources);
      const ret = response.list !== undefined ? response : { resources: response };
      yield put({
        type: 'save',
        payload: ret,
      });
    },

    *update({ payload, callback }, { call }) {
      const data = { children: payload.resources };
      let rg = [];

      const flattenDeep = rec =>
        Array.isArray(rec.children)
          ? rg.push(rec) && rec.children.reduce((a, b) => a.concat(flattenDeep(b)), [])
          : [rec];
      const rest = flattenDeep(data);

      const arrEqual = (a, b) =>
        a.map(x => b.includes(x)).every(x => x) && b.map(x => a.includes(x)).every(x => x);

      const tree = rg
        .filter(x => x.id)
        .map(rg => {
          const children = rg.children.map(x => x.id);
          console.log(arrEqual(rg.resource_ids, children));
          return arrEqual(rg.resource_ids, children)
            ? false
            : { id: rg.id, resource_ids: children };
        });
      const ret = { entity: '', data: tree.filter(x => x) };
      console.log('***--------------------------------*****2', rg, tree, tree.filter(x => x));

      const response = yield call(updateResources(ret));
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
