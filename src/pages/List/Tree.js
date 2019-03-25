import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import FetchRoutes from '../../wrappers/FetchRoutes';
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

const FormItem = Form.Item;

/* eslint react/no-multi-comp:0 */

@FetchRoutes
class Permissions extends PureComponent {
  constructor(props) {
    super(props);
    console.log('IN my tree CONSTRUCTOR', this.props);

    this.state = {
      data: this.props.routes,
    };
  }

  onDragEnter = info => {
    console.log(info);
    // expandedKeys
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  };

  onDrop = info => {
    console.log(info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };
    const data = [...this.state.gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.setState({
      gData: data,
    });
  };

  render() {
    const {
      action: { data },
      loading,
    } = this.props;
    console.log('DATA', data);

    const loop = data =>
      data.map(item => {
        if(item.name === 'exception') return <span/>
        if (item.children && item.children.length) {
          return (
            <TreeNode key={item.key} title={item.title}>
              {loop(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.key} title={item.title} />;
      });

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">Delete</Menu.Item>
        <Menu.Item key="approval">Approve</Menu.Item>
      </Menu>
    );

    return (
      <PageHeaderWrapper title="Tag Search">
        <Card bordered={true}>
          <Tree
            className="draggable-tree"
            defaultExpandedKeys={this.state.expandedKeys}
            draggable
            checkable
            onDragEnter={this.onDragEnter}
            onDrop={this.onDrop}
          >
            {loop(this.state.gData)}
          </Tree>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Permissions;
