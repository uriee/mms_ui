import React from 'react';
import FilterControl from './filterControl';

const stringifyFilterValue = filterValue => JSON.stringify(filterValue, null, '  ');

export default class FilterControlWithJson extends React.Component {
  
  state = {
    filterValueText: stringifyFilterValue(this.props.filterValue),
  }


  render() {
    const { filterValueText } = this.state;
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '30px' }}>
          <FilterControl
            fields={this.props.fields}
            groups={this.props.groups}
            filterValue={this.props.filterValue}
            onFilterValueChanged={this.props.onChange}
          />
        </div>

      </div>
    );
  }
}
/*        <div>
          <h3>Filter value:</h3>
          <pre>
            {filterValueText}
          </pre>
        </div>
        */