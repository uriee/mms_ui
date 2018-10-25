import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  const user = JSON.parse(localStorage.getItem('user')) || {
    currentAuthority: 'guest',
    userName: 'guest',
  };
  user.name = user.username;
  return { ...user };
}
