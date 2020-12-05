import React, { Component } from 'react'

import { Layout, Breadcrumb, Form, Input, Button, Select,Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
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

class CategorySave extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false
        }
    }
    render() {
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );            
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
                        <Form {...layout} name="control-hooks" onFinish={(values)=>{console.log(values)}}>
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
                                name="icon"
                                label="手机分类图标"
                                rules={[
                                    {
                                        required: true,
                                        message: '请上传手机分类图标'
                                    },
                                ]}
                            >
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={()=>{}}
                                    onChange={()=>{}}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
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

export default CategorySave