import React from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from '../DropDownMenu';
import deepCopy from '../../utils/deepCopy';
import Consumer from '../../context';
import {
  Input,
  Row,
  Col,
} from 'antd';

const Condition = ({
  fields, removeClick, onConditionValueChanged, value,
}) => {
  const getActiveField = (conditionValue) => {
    const index = fields.findIndex(field => field.name === conditionValue.field);

    const activeField = fields[index];
    const activeOperatorIndex = activeField.operators
      .findIndex(operator => operator.name === conditionValue.operator);   
    const activeValueIndex = activeField.values && activeField.values
      .findIndex(value => value.value === conditionValue.value)      
    return {
      index,
      activeOperatorIndex,
      activeValueIndex : (activeValueIndex === - 1 ? 0 : activeValueIndex) ,
      operators: activeField.operators,
      value: conditionValue.value,
      values : activeField.values,
    };
  };
  const updateCondition = (propertyName, newValue) => {
    const conditionValue = deepCopy(value);
    conditionValue[propertyName] = newValue;
    if (propertyName === 'field') {
      const activeField = getActiveField(conditionValue);
      conditionValue.value = '';
    }
    if (propertyName === 'operator') {
      conditionValue.value = '';
      const index = activeField.operators.findIndex(x => x.name === newValue)
      conditionValue.noValue = ( index > -1 ?   activeField.operators[index].noValue : null)
    }
    if (propertyName === 'value') {
      conditionValue.value = newValue;
    }
    return conditionValue;
  };
  const handleValueChanged = e => onConditionValueChanged(updateCondition('value', e.target.value));
  const handleFieldChanged = newValue => onConditionValueChanged(updateCondition('field', newValue));
  const handleOperatorChanged = newValue => onConditionValueChanged(updateCondition('operator', newValue));
  const handleValuePick = newValue => onConditionValueChanged(updateCondition('value', newValue));  
  const activeField = getActiveField(value);
  return (
    <Row  span={24} style={{ marginTop : 8}}>
      <Col span={1} style={{margin : 8}}>
        <Consumer>
          { consumer => <consumer.RemoveButton onClick={removeClick} /> }
        </Consumer>
      </Col>
      
      <Col span={6} style={{margin : 8}}> {DropDownMenu(fields,handleFieldChanged,'Choose Field',value.field,)} </Col>
      <Col span={6} style={{margin : 8}}> {DropDownMenu(activeField.operators,handleOperatorChanged,'Choose Operator',value.operator)} </Col>
       <Col span={6} style={{margin : 8}}> <Input disabled={value.noValue} onChange={handleValueChanged} value={activeField.value}/> </Col>

    </Row>
  );
};

Condition.propTypes = {
  removeClick: PropTypes.func.isRequired,
  onConditionValueChanged: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.shape({
    field: PropTypes.string,
    operator: PropTypes.string,
    value: PropTypes.any,
  }).isRequired,
};

export default Condition;
