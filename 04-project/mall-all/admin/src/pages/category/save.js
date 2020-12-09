import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Breadcrumb, Form, Input, Button, Select } from 'antd';
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
            id:this.props.match.params.categoryId,
            icon: '',
            iconValidate: {
                help: '',
                validateStatus: ''
            }
        }
        this.handleIcon = this.handleIcon.bind(this)
        this.handleFinish = this.handleFinish.bind(this)
        this.handleValidate = this.handleValidate.bind(this)
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
                this.setState({
                    icon:data.icon
                })
            }
        }else{
            this.setState({
                icon: ''
            })
        }
    }
    handleIcon(icon){
        this.setState({
            icon: icon,
            iconValidate: {
                help: '',
                validateStatus: ''
            }
        })
    }
    handleFinish(values){
        const { icon,id} = this.state
        this.handleValidate()
        if(icon){
            values.icon = icon
            this.props.handleSave(values,id)
        }
    }
    handleValidate(){
        const { icon } = this.state
        if(!icon){
            this.setState({
                iconValidate: {
                    help: '请上传手机图标',
                    validateStatus: 'error'
                }
            })
        }
    }
    render() {    
        const { 
            categories,
        } = this.props
        const { iconValidate, icon}  = this.state
        const options = categories.map(category => <Option key={category._id} value={category._id}>{category.name}</Option>)  
        let fileList = []
        if(icon){
            fileList.push({
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: icon,
            })
        }else{
            fileList = []
        }
        return (
            <div className="CategorySave">
                <CustomLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>分类</Breadcrumb.Item>
                        <Breadcrumb.Item>{this.state.id ? '编辑分类' : '添加分类'}</Breadcrumb.Item>                                                
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
                            onFinish={this.handleFinish}
                            onFinishFailed={this.handleValidate}
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
                                {...iconValidate}
                            >
                                <UploadImage 
                                    max={1}
                                    action={CATEGORY_ICON_UPLOAD}
                                    getImageUrlList={this.handleIcon}
                                    fileList={fileList}
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
    categories: state.get('category').get('categories'),
})
const mapDispatchToProps = (dispatch) => ({
    handleSave:(values,id)=>{
        dispatch(actionCreator.getSaveAction(values,id))
    },
    handleLevelCategories:()=>{
        dispatch(actionCreator.getLevelCategoriesAction())
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(CategorySave)