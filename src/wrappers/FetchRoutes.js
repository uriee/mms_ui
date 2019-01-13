import React from 'react';
import {connect} from "dva";
import {Spin} from "antd";
import { cloneDeep } from 'lodash';

const FetchRoutes = (WrappedComponent) => {
  @connect(state => ({
    global: state.global,
  }))
  class FetchRoutes extends React.PureComponent {
  constructor(props) {
    super(props);
  }  

    componentDidMount() {
      this.props.dispatch({
        type: 'global/fetchRoutes'
      })
    }
    render() {
      const routes = this.props.global.routes;
      var route = cloneDeep(this.props.route)
      route.routes =  routes
      return (
        routes.length === 0 ? <Spin spinning={true}/>:
          <WrappedComponent {...this.props} route={route}  />
      )
    }
  }

  return FetchRoutes;
};
export default FetchRoutes;
