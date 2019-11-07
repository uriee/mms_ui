import React from 'react';
import PropTypes from 'prop-types';
import deepCopy from '../../utils/deepCopy';
import DropDownMenu from '../DropDownMenu';
import Consumer from '../../context';
import { Row,Col,Button } from 'antd';

const FilterGroupSettingsRow = ({
  filterValue, fields, onFilterValueChanged, groups, removeClick,
}) => {
  const onGroupMenuItemClick = (newGroupName) => {
    const newFilterValue = deepCopy(filterValue);
    newFilterValue.groupName = newGroupName;
    onFilterValueChanged(newFilterValue);
  };

  const getNewKey = items => (items.length ? Math.max(...items.map(o => o.key)) + 1 : 0);

  const addCondition = () => {
    const newFilterValue = deepCopy(filterValue);
    const key = getNewKey(newFilterValue.items);
    const field = fields[0];
    newFilterValue.items.push({
      key,
      field: field.name,
      operator: field.operators[0].name,
      value: field.defaultValue || '',
    });
    onFilterValueChanged(newFilterValue);
  };

  const addGroup = () => {
    const newFilterValue = deepCopy(filterValue);
    const key = getNewKey(newFilterValue.items);
    const group = groups[0];
    newFilterValue.items.push({
      key,
      groupName: group.name,
      items: [],
    });
    onFilterValueChanged(newFilterValue);
  };


  return (
    <Row  className="fc-group-settings-row">
       <Col span={1} style={{margin : 8}}>
      {
        removeClick && (
        <Consumer>
          {consumer => <consumer.RemoveButton onClick={removeClick} />}
        </Consumer>
        )
      }
      </Col>
      <Col span={10} style={{margin : 8}}>{DropDownMenu(groups,onGroupMenuItemClick,'AND / OR',"And")}</Col>
      <Col span={4} style={{margin : 8}}><Button onClick={addGroup}>Add Group</Button></Col>
      <Col span={6} style={{margin : 8}}><Button onClick={addCondition}>Add Condition</Button></Col>
    </Row>
  );
};


FilterGroupSettingsRow.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.any).isRequired,
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      caption: PropTypes.string,
    }),
  ),
  filterValue: PropTypes.shape({
    groupName: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.any,
    ),
  }),
  onFilterValueChanged: PropTypes.func,
  removeClick: PropTypes.func,
};

FilterGroupSettingsRow.defaultProps = {
  groups: [{
    name: 'and',
    caption: 'And',
  }, {
    name: 'or',
    caption: 'Or',
  }],
  filterValue: {
    groupName: 'and',
    items: [],
  },
  onFilterValueChanged: undefined,
  removeClick: undefined,
};

export default FilterGroupSettingsRow;
