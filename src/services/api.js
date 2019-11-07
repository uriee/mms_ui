import { stringify } from 'qs';
import request from '@/utils/request';
import mrequest from '@/utils/mrequest';
import axios from 'axios';
import { Logic } from '@/defaultSettings';

const timeChartify = (data, interval) =>
  data.map(x => ({ ...x ,

    x:
      interval === 'day' || interval === 'week'
        ? x.x.slice(5, 10)
        : interval === 'month' || interval === 'year'
        ? x.x.slice(0, 7)
        : interval === 'hour'
        ? x.x.slice(8, 13)
        : x.x.slice(11, 16),
    y: parseInt(x.y) || 0,
  }));

export function fetch(params) {
  let x;
  const entity = params.entity;
  const command = entity === 'tags' ? 'tags' : 'fetch';
  try {
    x = myGet(`${Logic}mymes/${command}?${stringify(params)}`, entity);
  } catch (e) {
    console.error(e);
  }
  return x;
}

export async function fetchWorkPaths() {
  let x;
  try {
    x = await myGet(`${Logic}mymes/workPaths?`);
  } catch (e) {
    console.error(e);
  }
  return x.list;
}


export async function fetchWR(path) {
  let x;
  try {
    x = await myGet(`${Logic}mymes/fetchWR?resourcename=${path[0]}&serialname=${path[1]}&actname=${path[2]}`);
  } catch (e) {
    console.error(e);
  }
  return x.list;
}

export async function fetchResources() {
  let x;
  try {
    x = await myGet(`${Logic}mymes/resources?`);
  } catch (e) {
    console.error(e);
  }
  return x;
}

export async function fetchTriggersSchemas() {
  let x;
  try {
    x = await myGet(`${Logic}mymes/fetchTriggersSchemas?`);
  } catch (e) {
    console.error(e);
  }
  return x.list;
}

export async function fetchTriggersFields(params) {
  let x;
  try {
    x = await myGet(`${Logic}mymes/fetchTriggersFields?schema=${params.schema}`);
  } catch (e) {
    console.error(e);
  }
  console.log("@@@@@@@@@@@@@@@:",x)
  return x.list;
}

export async function insertTrigger(params) {
  const ret = await mrequest(`${Logic}mymes/insertTrigger`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
  return ret;
}

export async function deleteTrigger(params) {
  const ret = await mrequest(`${Logic}mymes/deleteTrigger`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
  return ret;
}

export async function fetch_dash(params) {
  let x;
  const data = params.data;
  try {
    x = await mrequest(`${Logic}mymes/dash/?${stringify(params)}`,{method : 'GET'});
  } catch (e) {
    console.error(e);
  }
  x.data['work_report_placements'] = timeChartify( x.data['work_report_placements'], params.interval );
  x.data['work_report_products'] = timeChartify(x.data['work_report_products'], params.interval);
  x.data['work_report_placements_by_parent_resource'] = timeChartify(x.data['work_report_placements_by_parent_resource'], params.interval);
  return x.data;
}

export async function queryNotices(params = {}) {
  return await mrequest(`${Logic}mymes/notifications?`);
}

export async function insert(params) {
  const entity = params.entity;
  const ret = await mrequest(`${Logic}mymes/insert`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
  return ret;
}

export async function remove(params) {
  const entity = params.entity;
  const ret = await mrequest(`${Logic}mymes/remove`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
  return ret;
}

export async function sendFunction(params) {
  const entity = params.entity;
  const ret = await mrequest(`${Logic}mymes/func`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
  console.error('ret sendFunction api:', ret);
  return ret;
}

export async function fetchRoutes() {
  var ret;
  try {
    ret = await axios.get(`${Logic}mymes/routes`);
  } catch (error) {
    console.error('Error in fetch routes', error);
  }
  return await JSON.parse(ret.data.main[0].routes);
}

export async function update(params) {
  return await mrequest(`${Logic}mymes/update`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}



export async function updatePermissions(params) {
  var ret;
  try {
    const routes = JSON.stringify(params.routes);
    ret = await mrequest(`${Logic}mymes/updateroutes`, {
      method: 'POST',
      data: {
        routes,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function post(params) {
  var ret;
  try {
    ret = await mrequest(`${Logic}mymes/${params.link}`, {
      method: 'POST',
      data: params,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function updateResources(params) {
  var ret;
  try {
    ret = await mrequest(`${Logic}mymes/updateResources`, {
      method: 'POST',
      data: params,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function accountLogin(params) {
  let x = { currenrAuthority: 'guest' };
  try {
    x = await mrequest(`${Logic}mymes/signin`, {
      method: 'POST',
      data: params,
    });
  } catch (e) {
    console.error(e);
  }

  return x;
}

import { parse } from 'url';

const myGet = async (url, entity) => {
  let dataSource = await mrequest(url, {
    method: 'GET',
  });
  console.log('DATSOURCE', dataSource);
  let choosers = dataSource.choosers;
  dataSource = dataSource.main;
  const params = parse(url, true).query;
  if (dataSource === undefined) return 0;

  if (params.sorter) {
    let s = params.sorter.split('_');
    let direction = s[s.length - 1];
    let field = s.slice(0, s.length - 1).join('_');
    dataSource = dataSource.sort((prev, next) => {
      if (direction == 'descend') {
        return next[field] &&
          next[field].toString().toUpperCase() < prev[field] &&
          prev[field].toString().toUpperCase()
          ? -1
          : 1;
      }
      return next[field] &&
        next[field].toString().toUpperCase() > prev[field] &&
        prev[field].toString().toUpperCase()
        ? -1
        : 1;
    });
  }
  // moved to server side filtering
  let filterDataSource = dataSource;

  Object.keys(params)
    .filter(param => {
      return dataSource[0] && dataSource[0].hasOwnProperty(param);
    })
    .forEach(param => {
      filterDataSource = filterDataSource.filter(data =>
        !data[param]
          ? false
          : data[param]
              .toString()
              .toUpperCase()
              .indexOf(params[param].toString().toUpperCase()) > -1
      );
    });

  dataSource = filterDataSource.length ? filterDataSource : dataSource;

  /*
  let pageSize = 10;
  if (params.pageSize) {    pageSize = params.pageSize * 1;
  }
*/
  const result = {
    list: dataSource,
    choosers: choosers,
    entity: entity,
    /* pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
    */
  };

  return result;
};

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
