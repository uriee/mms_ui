import CheckPermissions from './CheckPermissions';

const Authorized = ({ children, authority, noMatch = null }) => {
  const childrenRender = typeof children === 'undefined' ? null : children;
  console.log("authorityauthorityauthorityauthorityauthority:",authority)// = authority || ['admin']
  authority = authority || ['admin']  
  return CheckPermissions(authority, childrenRender, noMatch);
};

export default Authorized;
