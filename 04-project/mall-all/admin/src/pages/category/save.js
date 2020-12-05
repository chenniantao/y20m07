import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Breadcrumb, Form, Input, Button, Select,Upload } from 'antd';
const { Content } = Layout;
const { Option } = Select;
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 6,
    },
};

import CustomLayout from 'components/custom-layout'
import UploadImage from 'components/upload-image'

import { CATEGORY_ICON_UPLOAD } from 'api/config'
import { actionCreator } from './store';

class CategorySave extends Component {
    render() {    
        const { handleIcon, iconValidate, handleSave} = this.props   
        return (
            <div className="CategorySave">
                <CustomLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>分类</Breadcrumb.Item>
                        <Breadcrumb.Item>添加分类</Breadcrumb.Item>                                                
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Form 
                            {...layout} 
                            name="control-hooks" 
                            onFinish={handleSave}
                        >
                            <Form.Item
                                name="pid"
                                label="父级分类"
                                rules={[
                                    {
                                        required: true,
                                        message:'请选择父级分类'
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="请选择父级分类"
                                    onChange={() => { }}
                                    allowClear
                                >
                                    <Option value="0">根分类</Option>
                                </Select>
                            </Form.Item>                            
                            <Form.Item
                                name="name"
                                label="分类名称"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入分类名称'
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="mobileName"
                                label="手机分类名称"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入手机分类名称'
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="手机分类图标"
                                required={true}
                                {...iconValidate.toJS()}
                            >
                                <UploadImage 
                                    max={1}
                                    action={CATEGORY_ICON_UPLOAD}
                                    getImageUrlList={handleIcon}
                                />
                            </Form.Item>                                                         
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    提交
                                </Button>
                            </Form.Item>
                        </Form>
                    </Content>
                </CustomLayout>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    iconValidate: state.get('category').get('iconValidate')
})
const mapDispatchToProps = (dispatch) => ({
    handleIcon: (icon) => {
        dispatch(actionCreator.setIcon(icon))
    },
    handleSave:(values)=>{
        dispatch(actionCreator.getSaveAction(values))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(CategorySave)