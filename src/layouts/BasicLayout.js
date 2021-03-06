import React, { Suspense } from 'react';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import Media from 'react-media';
import logo from '../assets/logo.png';
import Footer from './Footer';
import Header from './Header';
import Context from './MenuContext';
import PageLoading from '@/components/PageLoading';
import SiderMenu from '@/components/SiderMenu';
import getPageTitle from '@/utils/getPageTitle';
import styles from './BasicLayout.less';
import router from 'umi/router';
import openSocket from 'socket.io-client'
import { Logic } from '@/defaultSettings';
//import SocketContext from '@/components/socketContext'

const userName = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).username 
const socket = openSocket('http://localhost:5000',{ query: `usr=${userName}` });
//const socket = openSocket(Logic,{ query: `usr=${userName}` });

// lazy load SettingDrawer
const SettingDrawer = React.lazy(() => import('@/components/SettingDrawer'));

const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class BasicLayout extends React.Component {
  /*
  constructor(props) {
        const {
      dispatch,
      route: { routes, authority },
    } = props;

    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, authority },
    });
    super()
  }
  */
  componentDidMount() {
    const {
      dispatch,
      route: { routes, authority },
    } = this.props;

    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, authority },
    });
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'setting/getSetting',
    });
  }

  getContext() {
    const { location, breadcrumbNameMap, history } = this.props;
    const next = location.pathname && location.pathname.split('/')[1];
    const current = localStorage.getItem('bread') ? JSON.parse(localStorage.getItem('bread')) : [];
    const last = current[current.length - 1];
    const name = location.query.tags || location.query.name;
    const query = name ? `(${name})` : '';
    const title =
      breadcrumbNameMap[location.pathname] &&
      (breadcrumbNameMap[location.pathname].name || breadcrumbNameMap[location.pathname].tags) +
        query;
    const obj = location.pathname &&
      breadcrumbNameMap[location.pathname] && {
        key: location.pathname,
        href: location.pathname + location.search,
        title: title,
      };
    if (JSON.stringify(last) === JSON.stringify(obj))
      return {
        location,
        breadcrumbNameMap,
        current,
      };
    const bread =
      history.action === 'POP'
        ? current.slice(0, current.length - 1)
        : next === 'router'
        ? [...current, obj]
        : [obj];
    localStorage.setItem('bread', JSON.stringify(bread));
    return {
      location,
      breadcrumbNameMap,
      bread,
    };
  }

  getLayoutStyle = () => {
    const { fixSiderbar, isMobile, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  renderSettingDrawer = () => {
    // Do not render SettingDrawer in production
    // unless it is deployed in preview.pro.ant.design as demo
    if (process.env.NODE_ENV === 'production' && APP_TYPE !== 'site') {
      return null;
    }
    return <SettingDrawer />;
  };

  render() {
    if (!localStorage.getItem('user') || !JSON.parse(localStorage.getItem('user')).username) router.push('/user/login')
    const {
      navTheme,
      layout: PropsLayout,
      children,
      location: { pathname },
      isMobile,
      menuData,
      breadcrumbNameMap,
      fixedHeader,
    } = this.props;

    const isTop = PropsLayout === 'topmenu';
    const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};
    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={logo}
            theme={navTheme}
            onCollapse={this.handleMenuCollapse}
            menuData={menuData}
            isMobile={isMobile}
            {...this.props}
          />
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh',
          }}
        > 
          <Header
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            logo={logo}
            isMobile={isMobile}
            socket={socket}
            {...this.props}
          />
          <Content className={styles.content} style={contentStyle}>
            {children}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
    return (
      <React.Fragment>
        <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
        <Suspense fallback={<PageLoading />}>{this.renderSettingDrawer()}</Suspense>
      </React.Fragment>
    );
  }
}

export default connect(({ global, setting, menu: menuModel }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
  ...setting,
}))(props => (
    <Media query="(max-width: 599px)">
      {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
    </Media>
));
