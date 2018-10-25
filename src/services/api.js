import { stringify } from 'qs';
import request from '@/utils/request';
import mrequest from '@/utils/mrequest';
import axios from 'axios';
/*
export function fetch(params,route) {
  let x
  try {
    x = myGet(`http://192.9.200.101/mymes/${route}?${stringify(params)}`)            
      } catch (e) {
            console.log(e);
      }
  console.log('Returned From myGet:', x);
  return x;
}

export async function insert(params,route) {
  console.log("in insert:",params)
  return await mrequest(`http://192.9.200.101/mymes/${route}/insert`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function update(params,route) {
  console.log("in update:",route,params)
  return await mrequest(`http://192.9.200.101/mymes/${route}/pdate`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

*/
export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export function queryEmp(params) {
  let x;
  try {
    x = myGet(`http://192.9.200.101/mymes/employees?${stringify(params)}`);
  } catch (e) {
    console.log(e);
  }
  console.log('Returned From myGet:', x);
  return x;
}

export async function addEmp(params) {
  console.log('in addemp:', params);
  return await mrequest(`http://192.9.200.101/mymes/insert/emp`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateEmp(params) {
  console.log('in updateemp:', params);
  return await mrequest(`http://192.9.200.101/mymes/update/emp`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
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
  return await request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function accountLogin(params) {
  let x = { currenrAuthority: 'guest' };
  try {
    x = await mrequest('http://192.9.200.101/mymes/signin', {
      method: 'POST',
      data: params,
    });
  } catch (e) {
    console.log(e);
  }
  console.log('xxxxxxxxxxxx:', x);
  return x;
}

/*
export async function accountLogin(params) {
  const send = {url:'http://192.9.200.101/mymes/signin', method:'post', data: { ...params } }
  console.log("wwwwwwwwwwwwwwwwwwwwww",w)
  return axios(w);
}
*/

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

import { parse } from 'url';

const myGet = async url => {
  console.log('in myGet1', url);
  let dataSource = await mrequest(url, {
    method: 'GET',
  });
  let choosers = dataSource.choosers;
  dataSource = dataSource.main;
  const params = parse(url, true).query;
  console.log('in myGet2', dataSource, params);
  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] > prev[s[0]];
      }
      return prev[s[0]] < next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  if (params.sname) {
    dataSource = dataSource.filter(data => data.sname.indexOf(params.sname) > -1);
  }

  if (params.fname) {
    dataSource = dataSource.filter(data => data.fname.indexOf(params.fname) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    choosers: choosers,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return result;
};

/*---*/

export function myPost(method, url, data, row, res) {
  switch (method) {
    case 'delete':
      break;
    case 'update':
      //call api to make a db update
      const newrow = mrequest(method, url, row).data;
      // update in memory
      const i = data.findIndex((val => e => e.a == val)(row.id));
      data[i] = newraw;
      break;
    default:
      break;
  }

  const result = {
    list: data,
    pagination: {
      total: data.length,
    },
  };

  return res.json(result);
}
