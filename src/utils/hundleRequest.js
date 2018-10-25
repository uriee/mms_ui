import { parse } from 'url';

function myGet(url, dataSource, res) {
  const params = parse(url, true).query;
  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
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

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}

function myPost(method, url, data, row, res) {
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

export default { myPost, myGet };
