import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import FetchRoutes from '../../wrappers/FetchRoutes';
import 'antd/dist/antd.css';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
const lang = {
  'he-IL': { id: 2, align: 'right' },
  'en-US': { id: 1, align: 'left' },
  'de-DE': { id: 3, align: 'left' },
};

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  Modal,
  message,
  Divider,
  Steps,
  Radio,
  Tree,
  notification,
} from 'antd';

const { TreeNode } = Tree;
const { Option } = Select;
const FormItem = Form.Item;

function flatten(arr) {
  const flat = [].concat(...arr);
  return flat.some(Array.isArray) ? flatten(flat) : flat;
}

/* eslint react/no-multi-comp:0 */
@FetchRoutes
@connect(({ permissions, loading }) => ({
  permissions,
  loading: loading.models.action,
}))
@Form.create()
class Permissions extends PureComponent {
  constructor(props) {
    super(props);
    console.log('IN my tree CONSTRUCTOR', this.props);

    this.state = {
      routes: this.props.route.routes,
      profile: '',
      type: false,
      defaultChecked: [],
    };

    this.defaultChecked = [];
    this.checked = [];
    this.updatedTree = [];

    const { dispatch } = this.props;
    dispatch({
      type: 'permissions/fetch',
      payload: {},
    });
  }

  calcChecked = (routes, profile) => {
    var defaultChecked = routes
      .map((item, i) => {
        if (item.routes && item.routes.length) {
          const parent = item.routes.reduce(
            (o, x) => o && x.authority && x.authority.includes(profile),
            true
          );
          const child = this.calcChecked(item.routes, profile);
          return parent ? [item.name + '_pkey' + i, ...child] : child;
        }
        return item.authority && item.authority.includes(profile) ? item.name + '_pkey' + i : null;
      })
      .filter(x => x);
    //console.log("__2__",defaultChecked)
    return defaultChecked;
  };
  getChecked = (routes, profile) => {
    const defaultChecked = flatten(this.calcChecked(routes, profile));
    console.log('in GETCHECKED:', defaultChecked);
    return this.setState({ defaultChecked: defaultChecked, profile: profile });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.updatedTree = this.setAuth(this.state.routes.slice(1), this.state.profile);
        console.log('Received values of form: ', values, this.state, this.updatedTree);
        const { dispatch } = this.props;
        dispatch({
          type: 'permissions/update',
          payload: { ...this.state },
        });
        router.push(1);
        /*
         dispatch({
          type: 'permissions/fetch',
          payload: {},
        })*/
        message.success('Permissions Updated.');
      }
    });
  };
  test = () => {
    this.setState({ profile: null });
  };

  handleProfileChange = value => {
    console.log(' handleProfileChange:', value);
    const checked = this.getChecked(this.state.routes.slice(1, -1), value);
    console.log('!~!~', checked);
    /*this.render()   */
  };

  handleTypeChange = value => {
    console.log(' handleTypeChange:', value, this.checked);
    this.setState({ type: value });
  };

  sAuth = (authorityArr, profile, checked) =>
    authorityArr && authorityArr.length
      ? authorityArr.includes(profile)
        ? checked
          ? authorityArr
          : authorityArr.filter(x => x !== profile)
        : checked
        ? [...authorityArr, profile]
        : authorityArr
      : checked
      ? [profile]
      : [];

  onCheck = (checkedKeys, x) => {
    this.checked = checkedKeys;
    console.log('onCheck', x);
  };

  setAuth = (routes, profile) =>
    routes.map((item, i) => {
      console.log('~~~~', item);
      if (item.routes && item.routes.length) {
        item.routes = this.setAuth(item.routes, profile);
        const parent = item.routes.reduce((o, x) => o || x.authority.includes(profile), false);
        item.authority = this.sAuth(item.authority, profile, parent);
        return item;
      }
      item.authority = this.sAuth(
        item.authority,
        profile,
        this.checked.includes(item.name + '_pkey' + i)
      );
      return item;
    });

  render() {
    console.log('____render______', this.state);
    const renderTree = routes =>
      routes.map((item, i) => {
        /*console.log("___3___",item,i)*/
        if (item.routes && item.routes.length) {
          return (
            <TreeNode
              key={item.name + '_pkey' + i}
              title={formatMessage({ id: `menu${item.path.replace(/\/|_/g, '.')}` })}
            >
              {renderTree(item.routes)}
            </TreeNode>
          );
        }
        return (
          <TreeNode
            key={item.name + '_pkey' + i}
            title={formatMessage({ id: `menu${item.path.replace(/\/|_/g, '.')}` })}
          />
        );
      });
    const children = renderTree(this.state.routes.slice(1, -1));
    console.log('7777:', this.state.defaultChecked);
    const { getFieldDecorator } = this.props.form;
    return (
      <PageHeaderWrapper title="Edit Permissions">
        <Card bordered={true}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="Profile" labelCol={{ span: 1 }} wrapperCol={{ span: 4 }}>
              {getFieldDecorator('profile')(
                <Select
                  placeholder="Select A Permission Profile"
                  onChange={this.handleProfileChange}
                  Value={this.state.profile}
                  onDropdownVisibleChange={this.test}
                >
                  {this.props.permissions.list &&
                    this.props.permissions.list.map(profile => (
                      <Option key={profile.name} value={profile.name}>
                        {profile.name}
                      </Option>
                    ))}
                </Select>
              )}
            </Form.Item>

            <Form.Item label="Type" labelCol={{ span: 1 }} wrapperCol={{ span: 4 }}>
              {getFieldDecorator('type')(
                <Select placeholder="Edit Access Or Permissions" onChange={this.handleTypeChange}>
                  <Option value="Access">Access</Option>
                  <Option value="Permissions">Permissions</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 4, offset: 1 }}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>

            {this.state.profile ? (
              <Tree
                defaultExpandedKeys={this.state.expandedKeys}
                checkable
                onCheck={this.onCheck}
                defaultCheckedKeys={this.state.defaultChecked}
                //checkedKeys={this.state.defaultChecked}
              >
                {children.map(data => data)}
              </Tree>
            ) : null}
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Permissions;
