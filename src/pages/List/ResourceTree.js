import React, { PureComponent, Fragment } from 'react';
import 'react-sortable-tree/style.css';
import SortableTree from 'react-sortable-tree';
import { connect } from 'dva';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import FetchRoutes from '../../wrappers/FetchRoutes';
import {
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
@connect(state => ({
  resources: state.resources,
}))
class ResourceTree extends PureComponent {
  constructor(props) {
    super(props);
    this.props.dispatch({
      type: 'resources/fetch',
    });

    this.state = {
      data: this.props.resources.list,
      searchString: '',
      searchFocusIndex: 0,
      searchFoundCount: null,
    };

    this.first = 0;
  }

  componentDidMount() {}

  render() {
    if (!this.props.resources.list) return <span />;
    if (this.first === 2) {
      this.setState({ data: this.props.resources.list });
    }
    this.first += 1;

    const icons = {
      employee: 'user',
      equipment: 'tool',
      resource_group: 'deployment-unit',
    };

    const { loading } = this.state;

    // Search capabilities
    const { searchString, searchFocusIndex, searchFoundCount } = this.state;
    const customSearchMethod = ({ node, searchQuery }) =>
      searchQuery && node.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;

    const selectPrevMatch = () =>
      this.setState({
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
            : searchFoundCount - 1,
      });

    const selectNextMatch = () =>
      this.setState({
        searchFocusIndex: searchFocusIndex !== null ? (searchFocusIndex + 1) % searchFoundCount : 0,
      });

    const handleTreeReset = () => this.setState({ data: this.props.resources.list });
    const handleTreeSave = () => {
      this.props.dispatch({ type: 'resources/update', payload: { resources: this.state.data } });
      this.setState({ state: this.state });
    };

    return (
      <div>
        <h2>Resource Tree</h2>
        <form
          style={{ display: 'inline-block' }}
          onSubmit={event => {
            event.preventDefault();
          }}
        >
          <Input
            id="find-box"
            type="text"
            placeholder="Search..."
            style={{ fontSize: '1rem' }}
            value={searchString}
            onChange={event => this.setState({ searchString: event.target.value })}
          />

          <Button type="primary" htmlType="submit" onClick={handleTreeSave}>
            Save
          </Button>
          <Button style={{ margin: 8 }} onClick={handleTreeReset}>
            Reset
          </Button>
          {!searchFoundCount ? (
            <span />
          ) : (
            <span>
              <Button
                type="button"
                disabled={!searchFoundCount}
                onClick={selectPrevMatch}
                style={{ marginLeft: 24 }}
              >
                &lt;
              </Button>

              <Button type="submit" disabled={!searchFoundCount} onClick={selectNextMatch}>
                &gt;
              </Button>

              <span>
                &nbsp;
                {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
                &nbsp;/&nbsp;
                {searchFoundCount || 0}
              </span>
            </span>
          )}
        </form>

        <div style={{ height: 500 }}>
          <SortableTree
            treeData={this.state.data || this.props.resources.list}
            onChange={data => this.setState({ data })}
            generateNodeProps={({ node, path }) => {
              const style = {
                fontSize: '1.1 rem',
              };

              return {
                title: (
                  <span style={style}>
                    <Icon type={icons[node.row_type]} /> {node.name}{' '}
                  </span>
                ),
              };
            }}
            searchMethod={customSearchMethod}
            rowDirection="ltr"
            searchQuery={searchString}
            searchFocusOffset={searchFocusIndex}
            canNodeHaveChildren={node => !node.dragable}
            canDrag={({ node }) => node.dragable}
            searchFinishCallback={matches =>
              this.setState({
                searchFoundCount: matches.length,
                searchFocusIndex: matches.length > 0 ? searchFocusIndex % matches.length : 0,
              })
            }
            onlyExpandSearchedNodes
          />
        </div>
      </div>
    );
  }
}

export default ResourceTree;