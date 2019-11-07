import { Select } from 'antd';
const { Option } = Select;

const DropDownMenu = (options,handler,placeHolder,value) => (
        <Select
        showSearch
        style={{ width: 200 , marginRight : 40}}
        placeholder={placeHolder}
        optionFilterProp="children"
        onChange={handler}
        defaultValue={value}
        Value={{ key: value }}
        filterOption={(input, option) => 
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        >
          {options.map(d => (
            <Option key={d.name}>{d.caption || d.name}</Option>
          ))}      
          
        </Select>
    );

export default DropDownMenu;
