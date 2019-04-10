import React from 'react';
import 'antd/dist/antd.css';
import {
  Card, Upload, Button, Icon, message, Select, List, Typography
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import schemas from '../../schemas/schemas.js';
import axios from 'axios';

const schamasTypes = Object.keys(schemas).map(x=> ({name: x ,title : schemas[x].title}))

class ImportDataByFile extends React.Component {
  state = {
    fileList: [],
    uploading: false,
    schemaName : '',
    schemaFields : []
  }

  schemaPick = (schemaName) => {
    const schema = schemas[schemaName]
    const fields = Object.keys(schema.fields)
      .map(x => ({name : x , type : schema.fields[x].inputMethod}))
      .filter(x=> x.type)
      .map(x=> `name : ${x.name} , type: ${x.type}`)
    console.log("*****************",schemaName,fields)    
    this.setState({
      schemaFields : fields
    })
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true,
    });

    // You can use any AJAX library you like
    axios.post('http://jsonplaceholder.typicode.com/posts/')
    reqwest({
      url: '//jsonplaceholder.typicode.com/posts/',
      method: 'post',
      processData: false,
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false,
        });
        message.success('upload successfully.');
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        message.error('upload failed.');
      },
    });
  }

  render() {
    const { uploading, fileList } = this.state;

    const props = {
      multiple : false, 
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };
    const choose = schamasTypes.map(x => (<Option key={x.name} value={x.name}>{x.title}</Option>))
    console.log("------------------",schamasTypes,choose,this.state,this.props)
    return (
      <PageHeaderWrapper title="Import Data From A File">
        <Card bordered={true}>
        <Select
          showSearch
          data 
          style={{ width: 200 }}
          placeholder="Select a schema"
          optionFilterProp="children"
          onChange={this.schemaPick}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {choose}
        </Select>,

        <List
          header={<h1>Schema Stracture</h1>}
          bordered
          size="small"
          dataSource={this.state.schemaFields}
          renderItem={item => (<List.Item> {item}</List.Item>)}
          style={{ margin: 16 }}
        />

          <div>
            <Upload {...props} style={{ marginTop: 16 }}>
              <Button>
                <Icon type="upload" /> Select File
              </Button>
            </Upload>
            <Button
              type="primary"
              onClick={this.handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
              style={{ marginTop: 16 }}
            >
              {uploading ? 'Uploading' : 'Start Upload' }
            </Button>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ImportDataByFile;
