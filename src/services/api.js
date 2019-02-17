import { stringify } from 'qs';
import request from '@/utils/request';
import mrequest from '@/utils/mrequest';
import axios from 'axios';
import {Logic} from '@/defaultSettings'
//const Logic = 'http://3.16.188.229/'
//const Logic = 'http://192.9.200.101/'
const timeChartify = (data,interval) => data.map(x=> ({
    /*x: Date(dateString.replace(' ', 'T'))*/
  x: (interval === 'day' || interval === 'week' ? x.x.slice(5,10) :
     (interval === 'month' || interval === 'year' ? x.x.slice(0,7) :
     (interval === 'hour' ?  x.x.slice(8,13) : x.x.slice(11,16))))
  , y: parseInt(x.y) || 0}))

export function fetch(params) {
  console.log("in fetch api",params)
  let x;
  const entity = params.entity
  try {
    x = myGet(`${Logic}mymes/${entity}?${stringify(params)}`,entity);
  } catch (e) {
    console.log(e);
  }
  console.log('Returned From myGet:', x);
  return x;
}

export async function fetch_dash(params) {
  let x;
  const data = params.data
  try {
    x = await axios.get(`${Logic}mymes/dash/?${stringify(params)}`);
  } catch (e) {
    console.log(e);
  }
  console.log('fetch dash',x)
  x.data['work_report_placements'] = timeChartify( x.data['work_report_placements'],params.interval)
  x.data['work_report_products'] = timeChartify( x.data['work_report_products'],params.interval)  
  return x.data;
}

export async function insert(params) {
  console.log('in insert:', params);
  const entity = params.entity
  const ret = await mrequest(`${Logic}mymes/insert`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
  console.log('retRETert:',ret)
  return ret;
}

export async function remove(params) {
  const entity = params.entity
  const ret = await mrequest(`${Logic}mymes/remove`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
  console.log('ret remove api:',ret)
  return ret;
}

export async function sendFunction(params) {
  const entity = params.entity
  console.log('_---_-____-:',params)
  const ret = await mrequest(`${Logic}/mymes/func`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
  console.log('ret sendFunction api:',ret)
  return ret;
}

export async function fetchRoutes() {
  var ret
  try {
    ret = await axios.get(`${Logic}mymes/routes`,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
  } catch (error) {
    console.error(error);
  }
  return await JSON.parse(ret.data.main[0].routes)
}

export async function update(params) {
  console.log('********in update*********:', params);
  const entity = params.entity  
  return await mrequest(`${Logic}mymes/update`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updatePermissions(params) {
  console.log('********in update Permissions*********:', params);
  var ret  
  try {
    const routes = JSON.stringify(params.routes)
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

export async function accountLogin(params) {
  let x = { currenrAuthority: 'guest' };
  console.log('accountLogin',params)
  try {
    x = await mrequest(`${Logic}mymes/signin`, {
      method: 'POST',
      data: params,
    });
  } catch (e) {
    console.log(e);
  }

  return x;
}

import { parse } from 'url';

const myGet = async (url,entity) => {
  console.log('in myGet1', url,entity);

  let dataSource = await mrequest(url, {
    method: 'GET',
  });
  console.log("DATSOURCE",dataSource)
  let choosers = dataSource.choosers;
  dataSource = dataSource.main;
  const params = parse(url, true).query;
  if (dataSource === undefined ) return 0  
  console.log('in myGet2', dataSource, params);
  if (params.sorter) {
    let s = params.sorter.split('_');
    let direction = s[s.length-1]
    let field = s.slice(0,s.length-1).join('_')
    dataSource = dataSource.sort((prev, next) => {
      if (direction == 'descend') {
        return next[field] && next[field].toString().toUpperCase() < prev[field] && prev[field].toString().toUpperCase() ? -1 : 1
      }
       return next[field] && next[field].toString().toUpperCase() > prev[field] && prev[field].toString().toUpperCase() ? -1 : 1
    });
  }

  let filterDataSource = dataSource;
  Object.keys(params).filter(param => {
    return dataSource[0] && dataSource[0].hasOwnProperty(param)}).forEach(param => { 
    filterDataSource =  filterDataSource.filter(data => !data[param] ?  false : data[param].toString().toUpperCase().indexOf(params[param].toString().toUpperCase()) > -1)
  })
  dataSource = (filterDataSource.length  ? filterDataSource : dataSource)


  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    choosers: choosers,
    entity: entity,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return result;
};

/*---*/

/*
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

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
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

export async function queryBasicProfile() {
  return request('/api/profile/basic');
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

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
*/