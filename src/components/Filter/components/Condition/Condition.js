import React from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from '../DropDownMenu';
import deepCopy from '../../utils/deepCopy';
import Consumer from '../../context';

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
      console.log(activeValueIndex,activeField,conditionValue) 
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
      conditionValue.operator = activeField.operators[0].name;
      conditionValue.value = '';
    }
    if (propertyName === 'operator') {
      conditionValue.value = '';
    }
    if (propertyName === 'value') {
      conditionValue.value = newValue;
    }
    conditionValue.value = newValue;
    return conditionValue;
  };
  const handleValueChanged = e => onConditionValueChanged(updateCondition('value', e.target.value));
  const handleFieldChanged = newValue => onConditionValueChanged(updateCondition('field', newValue));
  const handleOperatorChanged = newValue => onConditionValueChanged(updateCondition('operator', newValue));
  const handleValuePick = newValue => onConditionValueChanged(updateCondition('value', newValue));  
  const activeField = getActiveField(value);
 
  return (
    <div className="fc-condition">
      <Consumer>
        { consumer => <consumer.RemoveButton onClick={removeClick} /> }
      </Consumer>
      <DropDownMenu
        textField="name"
        keyField="name"
        activeIndex={activeField.index}
        menuItems={fields}
        onMenuItemClick={handleFieldChanged}
      />
      <DropDownMenu
        textField="caption"
        color="primary"
        keyField="name"
        activeIndex={activeField.activeOperatorIndex}
        menuItems={activeField.operators}
        onMenuItemClick={handleOperatorChanged}
      />
      {activeField.values &&       <DropDownMenu
                            textField="caption"
                            color="primary"
                            keyField="value"
                            activeIndex={activeField.activeValueIndex || 0}
                            menuItems={activeField.values}
                            onMenuItemClick={handleValuePick}
                          />}
      {!activeField.values  &&      
                            <Consumer>
                            { consumer => (
                              <consumer.Input
                                value={activeField.value}
                                onChange={handleValueChanged}
                              />
                            )}
                          </Consumer>      
      }                          
    </div>
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
