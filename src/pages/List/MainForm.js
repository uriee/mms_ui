import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
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
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
  Tag,
  Checkbox,
  TimePicker,
  notification,
  Cascader,
} from 'antd';

const lang = {
  'en-US': { id: 1, align: 'left' },
  'he-IL': { id: 2, align: 'right' },
  'de-DE': { id: 3, align: 'left' },
};

const { RangePicker } = DatePicker;

const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@Form.create()
class CreateForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formVals: Object.keys(this.props.fields).reduce((obj, key) => {
        var value = this.props.values[this.props.fields[key].dataIndex];
        value =
          this.props.fields[key].inputMethod === 'time'
            ? value
              ? moment(value, 'HH:mm')
              : null
            : value;
        value =
          this.props.fields[key].inputMethod === 'timestamp'
            ? value
              ? moment(value, 'YYYY-MM-DD HH:mm:ss')
              : null
            : value;
        value =
          this.props.fields[key].inputMethod === 'timestamp_t'
            ? value
              ? [moment(value[0], 'YYYY-MM-DD HH:mm:ss'), moment(value[1], 'YYYY-MM-DD HH:mm:ss')]
              : null
            : value;
        const fieldName = this.props.fields[key].dataIndex;
        obj[fieldName] = value;
        return obj;
      }, {}),
      currentStep: 0,
    };

    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
  }

  handleNext = currentStep => {
    const numOfSteps = this.props.formLayout.steps.length - 1;
    const { form, handler, choosers, cascaders, handleModal } = this.props;
    const { formVals: oldValue } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          if (currentStep < numOfSteps) {
            this.forward();
          } else {
            handler(formVals);
            this.setState({
              formVals: { ...this.props.insertKey },
              currentStep: 0,
            });
          }
        }
      );
    });
  };

  backward = () => {
    const { currentStep } = this.state;
    if (currentStep > 0) {
      this.setState({
        currentStep: currentStep - 1,
      });
    }
  };

  forward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1,
    });
  };

  getFormItemFromSchema = fieldData => {
    const fieldName = fieldData.field;
    if (this.props.formType === 'insert' && fieldName === 'description' && lang[getLocale()].id === 1) return <span/>
    const fieldStyle = fieldData.style;
    const { form, fields } = this.props;
    const field = fields[fieldName];
    const placeHolder = fieldData.placeholder || field.title;
    const formVals = this.state.formVals;
    let formField = null;
    let fieldValue =
      formVals[field.dataIndex] === false ? false : formVals[field.dataIndex] || field.defaultValue;
    let layout = {};
    let tagArray = [];
    switch (field.inputMethod) {
      case 'input':
        formField = <Input placeholder={placeHolder} style={fieldStyle} />;
        break;
      case 'bool':
        formField = <Checkbox defaultChecked={fieldValue}>{placeHolder}</Checkbox>;
        break;
      case 'time':
        formField = (
          <TimePicker defaultValue={moment(fieldValue, 'HH:mm') || moment()} format={'HH:mm'} />
        );
        break;
      case 'timestamp':
        formField = (
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="Select Date/Time" />
        );
        break;
      case 'timestamp_r':
        formField = (
          <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="Select Date/Time" />
        );
        break;
      case 'textArea':
        formField = <TextArea placeholder={placeHolder} style={fieldStyle} />;
        break;
      case 'number':
        formField = <InputNumber placeholder={placeHolder} style={field.style} />;
        break;
      case 'tags':
        tagArray =
          (this.props && this.props.choosers[field.chooser]) ||
          (fieldValue && fieldValue.map(x => ({ name: x }))) ||
          [];
        formField = (
          <Select
            mode="tags"
            placeholder="Please Enter Tags"
            tokenSeparators={[',']}
            style={{ width: '100%' }}
          >
            {tagArray.map(option => (
              <Option key={option.name} value={option.name}>
                {option.name + (option.description ? ': '+option.description : '') }
              </Option>
            ))}
          </Select>
        );
        break;
      case 'select':
        formField = (
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {field.selectValues
              ? field.selectValues.map(option => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))
              : this.props.choosers[field.chooser].map(option => (
                  <Option key={option.name} value={option.name}>
                    {option.name}
                  </Option>
                ))}
          </Select>
        );
        layout = this.formLayout;
        break;

      case 'cascader':
        const cascadeMap = this.props.cascaders && this.props.cascaders[field.chooser];
        var cascadeData = groupBy(this.props.choosers[field.chooser], cascadeMap[0]);
        cascadeData = Object.keys(cascadeData).map(x => ({
          value: x,
          label: x,
          children: cascadeData[x].map(x1 => ({
            value: `${x}:${x1[cascadeMap[1]]}`,
            label: x1[cascadeMap[1]],
          })),
        }));
        formField = (
          <Cascader
            key={`cascade_${field.dataIndex}`}
            options={cascadeData}
            placeholder="Please select"
          />
        );
        break;

      default:
        formField = <Input placeholder={field.title} style={field.style} />;
    }
    return (
      <FormItem key={field.dataIndex} {...this.Layout} label={field.title}>
        {form.getFieldDecorator(field.dataIndex, {
          rules: field.inputRules,
          initialValue: fieldValue,
        })(formField)}
      </FormItem>
    );
  };

  renderContent = currentStep => {
    const type = this.props.formType;
    const steps = this.props.formLayout.steps;
    const step = steps[currentStep];
    const format = step.format;
    const length = format.length;
    const fields = step.fields;
    return format.map((subStep, i) => {
      const length = subStep.length;
      const elements = subStep.map((place, j) => (
        <Col md={24 / length} sm={24} key={`${type}step${i}${j}`}>
          {this.getFormItemFromSchema(fields[place])}
        </Col>
      ));
      return <Row key={`${type}step${i}`}>{elements}</Row>;
    });
  };

  renderFooter = currentStep => {
    const { handleModal } = this.props;
    const numOfSteps = this.props.formLayout.steps.length;
    if (currentStep === numOfSteps - 1) {
      var ret = [];
      if (currentStep > 0) {
        ret = [
          <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
            Back
          </Button>,
        ];
      }
      return [
        ...ret,
        <Button key="cancel" onClick={() => handleModal()}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => this.handleNext(currentStep)}>
          Submit
        </Button>,
      ];
    }
    if (currentStep < numOfSteps - 1 && currentStep > 0) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          Back
        </Button>,
        <Button key="cancel" onClick={() => handleModal()}>
          Cancel
        </Button>,
        <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
          Forward
        </Button>,
      ];
    }
    return [
      <Button key="cancel" onClick={() => handleModal()}>
        Cancel
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
        Forward
      </Button>,
    ];
  };

  render() {
    //console.log('==========================:',this.props,this.state)
    if (!this.props.fields) return {};
    const { ModalVisible, handleModal } = this.props;
    const { currentStep, formVals } = this.state;
    const steps = this.props.formLayout.steps;
    const type = this.props.formType;
    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="Edit"
        visible={ModalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleModal()}
      >
        <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
          {steps.map((step, i) => (
            <Step title={step.title} key={`${type}step${i}`} />
          ))}
        </Steps>
        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
}

export default CreateForm;
