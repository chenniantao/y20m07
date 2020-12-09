import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Breadcrumb, Form, Input, Button, Select, InputNumber, Transfer } from 'antd';
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

class AttrSave extends Component {
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.productId,
            targetKeys:[],
            selectedKeys:[]
        }
        this.formRef = React.createRef()
        this.handleChange = this.handleChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
    }
    handleChange(nextTargetKeys, direction, moveKeys){
        this.setState({ targetKeys: nextTargetKeys });
    };

    handleSelectChange (sourceSelectedKeys, targetSelectedKeys){
        this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
    };
    componentDidMount(){
        //获取分类
        this.props.handleLevelCategories() 
        //获取属性
        this.props.handleAllAttrs()
    }    
    render() {    
        const { 
            categories,
            allAttrs,
            handleSave, 
        } = this.props
        const {
            targetKeys,
            selectedKeys
        } = this.state
        const options = categories.map(cate => <Option key={cate._id} value={cate._id}>{cate.name}</Option>)
        const dataSource = allAttrs.map(attr => ({ key: attr._id, title: attr.name }))
        return (
            <div className="AttrSave">
                <CustomLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>商品</Breadcrumb.Item>
                        <Breadcrumb.Item>{this.state.id ? '编辑商品' : '添加商品'}</Breadcrumb.Item>                                                
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
                            ref={this.formRef}
                            initialValues={{
                                price:0,
                                stock:0,
                                payNums:0
                            }}
                            onFinish={(values) => {
                                if(targetKeys.length > 0){
                                    values.attrs = targetKeys.join(',')
                                }
                                console.log(values)
                                handleSave(values, this.state.id)
                            }}
                        >
                            <Form.Item
                                name="category"
                                label="商品分类"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择商品分类'
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="请选择商品分类"
                                >
                                    {options}
                                </Select>
                            </Form.Item>                                                      
                            <Form.Item
                                name="name"
                                label="商品名称"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入商品名称'
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="商品描述"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入商品描述'
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="price"
                                label="商品价格"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入商品价格'
                                    },
                                ]}
                            >
                                <InputNumber min={0}  />
                            </Form.Item>
                            <Form.Item
                                name="stock"
                                label="商品库存"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入商品库存'
                                    },
                                ]}
                            >
                                <InputNumber min={0}  />
                            </Form.Item> 
                            <Form.Item
                                name="payNums"
                                label="支付人数"
                            >
                                <InputNumber min={0}  />
                            </Form.Item>
                            <Form.Item
                                name="attrs"
                                label="商品属性"
                            >
                                <Transfer
                                    dataSource={dataSource}
                                    titles={['未选属性', '已选属性']}
                                    targetKeys={targetKeys}
                                    selectedKeys={selectedKeys}
                                    onChange={this.handleChange}
                                    onSelectChange={this.handleSelectChange}
                                    render={item => item.title}
                                    style={{ marginBottom: 16 }}
                                />                        
                            </Form.Item>
                            <Form.Item
                                label="封面图片"
                                required={true}
                            >
                                <UploadImage
                                    max={1}
                                    action={CATEGORY_ICON_UPLOAD}
                                    getImageUrlList={()=>{}}
                                    fileList={[]}
                                />
                            </Form.Item>
                            <Form.Item
                                label="商品图片"
                                required={true}
                            >
                                <UploadImage
                                    max={3}
                                    action={CATEGORY_ICON_UPLOAD}
                                    getImageUrlList={()=>{}}
                                    fileList={[]}
                                />
                            </Form.Item>
                            <Form.Item
                                label="商品详情"
                            >
                                <Input />
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
    categories: state.get('product').get('categories'),
    allAttrs: state.get('product').get('allAttrs'),
})
const mapDispatchToProps = (dispatch) => ({
    handleSave:(values,id)=>{
        console.log(values)
        //dispatch(actionCreator.getSaveAction(values,id))
    },
    handleLevelCategories: () => {
        dispatch(actionCreator.getLevelCategoriesAction())
    },
    handleAllAttrs:()=>{
        dispatch(actionCreator.getAllAttrsAction())
    }    
})
export default connect(mapStateToProps, mapDispatchToProps)(AttrSave)