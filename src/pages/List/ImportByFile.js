import React from 'react';
import 'antd/dist/antd.css';
import { Card, Upload, Button, Icon, message, Select, List, Input } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import schemas from '@/schemas/schemas.js';
import { Logic } from '@/defaultSettings';
import mrequest from '@/utils/mrequest';
import * as csv from 'csvtojson';

const schamasTypes = Object.keys(schemas)
  .filter(x => schemas[x].loadable)
  .map(x => ({ name: x, title: schemas[x].title }));

const typeDic = {
  tags: 'Text Array : inclosed by {} delimited by Comma+Space ',
  bool: 'Boolean : empty OR some charecter',
  input: 'Text',
  textArea: 'Text',
  select: 'Text',
  cascader: 'Text',
};

class ImportDataByFile extends React.Component {
  state = {
    fileList: [],
    uploading: false,
    schemaName: '',
    schemaFields: [],
  };

  schemaPick = schemaName => {
    const schema = schemas[schemaName];
    const fields = Object.keys(schema.fields)
      .map(x => ({ name: x, type: schema.fields[x].inputMethod }))
      .filter(x => x.type)
      .map(x => ({ name: x.name, type: x.type }));
    this.setState({
      schemaFields: fields,
      schemaName: schemaName,
    });
  };

  handleUpload = async () => {
    const { fileList, schemaFields, schemaName } = this.state;
    const reader = new FileReader();
    const file = fileList[0];
    const headers = schemaFields.map(x => x.name);
    let THIS = this;

    const converter = csv({
      noheader: true,
      trim: true,
      //  ignoreEmpty : true,
      //  checkColumn : true,
      headers: headers,
    });

    reader.readAsText(file);

    reader.onload = async function() {
      try {
        const json = await converter.fromString(reader.result);

        THIS.setState({
          uploading: true,
        });

        const ret = await mrequest(`${Logic}mymes/importdata`, {
          method: 'POST',
          data: { data: json, entity: schemaName },
        });

        THIS.setState({
          fileList: [],
          uploading: false,
        });
        message.success('upload successfully.');
      } catch (e) {
        THIS.setState({
          uploading: false,
        });
        message.error('upload failed.');
      }
    };
  };

  render() {
    const { uploading, fileList } = this.state;
    if (!(window.File && window.FileReader)) {
      message.error('The File APIs are not fully supported in this browser.');
      return <span />;
    }

    const props = {
      multiple: false,
      accept: '.csv',
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    const choose = schamasTypes.map(x => (
      <Option key={x.name} value={x.name}>
        {x.title}
      </Option>
    ));
    console.log('------------------', schamasTypes, choose, this.state, this.props);
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
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {choose}
          </Select>
          ,
          <List
            header={<h1>Schema Stracture</h1>}
            bordered
            size="small"
            dataSource={this.state.schemaFields.map(x => `${x.name}   =>   ${typeDic[x.type]}`)}
            renderItem={item => <List.Item> {item}</List.Item>}
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
              {uploading ? 'Uploading' : 'Start Upload'}
            </Button>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ImportDataByFile;
