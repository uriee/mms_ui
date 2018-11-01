import { stringify } from 'qs';
import request from '@/utils/request';
import mrequest from '@/utils/mrequest';
import axios from 'axios';

export function fetch(params) {
  let x;
  const entity = params.entity
  try {
    x = myGet(`http://192.9.200.101/mymes/${entity}?${stringify(params)}`,entity);
  } catch (e) {
    console.log(e);
  }
  console.log('Returned From myGet:', x);
  return x;
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

export async function insert(params) {
  console.log('in addemp:', params);
  const entity = params.entity
  return await mrequest(`http://192.9.200.101/mymes/insert/${entity}`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function update(params) {
  console.log('in updateemp:', params);
  const entity = params.entity  
  return await mrequest(`http://192.9.200.101/mymes/update/${entity}`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
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

const myGet = async (url,entity) => {
  console.log('in myGet1', url,entity);
  let dataSource = await mrequest(url, {
    method: 'GET',
  });
  let choosers = dataSource.choosers;
  dataSource = dataSource.main;
  const params = parse(url, true).query;
  console.log('in myGet2', dataSource, params);
  if (params.sorter) {
    let s = params.sorter.split('_');
    let direction = s[s.length-1]
    let field = s.slice(0,s.length-1).join('_')
    console.log("field dataSource:",direction)
    dataSource = dataSource.sort((prev, next) => {
      if (direction == 'descend') {
        console.log(next[field], prev[field])
        return next[field].toUpperCase() < prev[field].toUpperCase() ? -1 : 1
      }
      return next[field].toUpperCase() > prev[field].toUpperCase() ? -1 : 1
    });
     console.log("field dataSource2:",dataSource,direction,field)
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
