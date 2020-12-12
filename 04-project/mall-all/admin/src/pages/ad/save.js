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

import { AD_IMAGE_UPLOAD } from 'api/config'
import { actionCreator } from './store';

import api from 'api'

class AdSave extends Component {
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.adId,
            image: '',
            imageValidate: {
                help: '',
                validateStatus: ''
            }
        }
        this.handleImage = this.handleImage.bind(this)
        this.handleFinish = this.handleFinish.bind(this)
        this.handleValidate = this.handleValidate.bind(this)
        this.formRef = React.createRef()
    }
    async componentDidMount(){
        if (this.state.id){
            const result = await api.getAdsDetail({ id: this.state.id})
            if(result.code == 0){
                const data = result.data
                this.formRef.current.setFieldsValue({
                    name: data.name,
                    link: data.link,
                    position: data.position
                })
                this.setState({
                    image: data.image
                })
            }
        }else{
            this.setState({
                image: ''
            })
        }
    }
    handleImage(image){
        this.setState({
            image: image,
            imageValidate: {
                help: '',
                validateStatus: ''
            }
        })
    }
    handleFinish(values){
        const { image,id} = this.state
        this.handleValidate()
        if (image){
            values.image = image
            values.id = id
            this.props.handleSave(values)
        }
    }
    handleValidate(){
        const { image } = this.state
        if (!image){
            this.setState({
                imageValidate: {
                    help: '请上传广告图片',
                    validateStatus: 'error'
                }
            })
        }
    }
    render() {    
        const { imageValidate, image}  = this.state
        let fileList = []
        if(image){
            fileList.push({
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: image,
            })
        }else{
            fileList = []
        }
        return (
            <div className="AdSave">
                <CustomLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>广告</Breadcrumb.Item>
                        <Breadcrumb.Item>{this.state.id ? '编辑广告' : '添加广告'}</Breadcrumb.Item>                                                
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
                                name="name"
                                label="广告名称"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入广告名称'
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="link"
                                label="广告地址"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入广告地址'
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="position"
                                label="广告位置"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择广告位置'
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="请选择广告位置"
                                >
                                    <Option value="1">电脑端首页轮播图</Option>
                                    <Option value="2">移动端首页轮播图</Option>
                                </Select>
                            </Form.Item>                              
                            <Form.Item
                                label="广告图片"
                                required={true}
                                {...imageValidate}
                            >
                                <UploadImage 
                                    max={1}
                                    action={AD_IMAGE_UPLOAD}
                                    getImageUrlList={this.handleImage}
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
    handleSave:(values)=>{
        dispatch(actionCreator.getSaveAction(values))
    },
    handleLevelCategories:()=>{
        dispatch(actionCreator.getLevelCategoriesAction())
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(AdSave)