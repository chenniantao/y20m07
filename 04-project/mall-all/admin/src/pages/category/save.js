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

import api from 'api'

class CategorySave extends Component {
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.categoryId
        }
        this.formRef = React.createRef()
    }
    async componentDidMount(){
        this.props.handleLevelCategories()    
        if (this.state.id){
            const result = await api.getCategoriesDetail({ id: this.state.id})
            if(result.code == 0){
                const data = result.data
                this.formRef.current.setFieldsValue({
                    pid:data.pid,
                    name: data.name,
                    mobileName:data.mobileName
                })
            }
        }
    }
    render() {    
        const { 
            handleIcon, 
            handleValidate,
            iconValidate, 
            handleSave, 
            categories
        } = this.props
        const options = categories.map(category => <Option key={category._id} value={category._id}>{category.name}</Option>)  
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
                            onFinishFailed={handleValidate}
                            ref={this.formRef}
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
                                    {options}
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
    iconValidate: state.get('category').get('iconValidate'),
    categories: state.get('category').get('categories'),
    category: state.get('category').get('category')
})
const mapDispatchToProps = (dispatch) => ({
    handleIcon: (icon) => {
        dispatch(actionCreator.setIcon(icon))
    },
    handleSave:(values)=>{
        dispatch(actionCreator.getSaveAction(values))
    },
    handleValidate: ({ values})=>{
        console.log(values)
        dispatch(actionCreator.getValidateAction())
    },
    handleLevelCategories:()=>{
        dispatch(actionCreator.getLevelCategoriesAction())
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(CategorySave)