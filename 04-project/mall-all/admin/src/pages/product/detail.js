import React, { Component } from 'react'
import { Layout, Breadcrumb, Form, Input, Image, InputNumber, Tag } from 'antd';
import CustomLayout from 'components/custom-layout'
import api from 'api'

const { Content } = Layout;
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

class ProductDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.productId,
            product:{}
        }
        this.formRef = React.createRef()
    }
    async componentDidMount() {
        if (this.state.id) {
            const result = await api.getProductsDetail({ id: this.state.id })
            if (result.code == 0) {
                const data = result.data
                this.formRef.current.setFieldsValue({
                    category: data.category.name,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    stock: data.stock,
                    payNums: data.payNums
                })
                this.setState({
                    product:data
                })
            }
        } 
    }
    render() {
        const { attrs, mainImage, images, detail} = this.state.product
        let attrTags = null
        let imagesWrap = null
        if (attrs){
            attrTags = attrs.map((attr) => <Tag key={attr._id}>{attr.key}</Tag>)
        }
        if (images){
            imagesWrap = images.split(',').map((url, index)=><Image width={100} key={index} src={url} />)
        }
        return (
            <div className="ProductDetail">
                <CustomLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>商品</Breadcrumb.Item>
                        <Breadcrumb.Item>查看商品</Breadcrumb.Item>
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
                        >
                            <Form.Item
                                name="category"
                                label="商品分类"
                            >
                                <Input disabled={true} />
                            </Form.Item>
                            <Form.Item
                                name="name"
                                label="商品名称"
                            >
                                <Input disabled={true} />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="商品描述"
                            >
                                <Input disabled={true} />
                            </Form.Item>
                            <Form.Item
                                name="price"
                                label="商品价格"
                            >
                                <InputNumber disabled={true} />
                            </Form.Item>
                            <Form.Item
                                name="stock"
                                label="商品库存"
                            >
                                <InputNumber disabled={true} />
                            </Form.Item>
                            <Form.Item
                                name="payNums"
                                label="支付人数"
                            >
                                <InputNumber disabled={true} />
                            </Form.Item>
                            <Form.Item
                                label="商品属性"
                            >
                                {attrTags}
                            </Form.Item>
                            <Form.Item
                                label="封面图片"
                            >
                                <Image width={100} src={mainImage} />
                            </Form.Item>
                            <Form.Item
                                label="商品图片"
                            >
                                {imagesWrap}
                            </Form.Item>
                            <Form.Item
                                label="商品详情"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                <div style={{marginTop:5}} dangerouslySetInnerHTML={{__html:detail}}></div>
                            </Form.Item>
                        </Form>
                    </Content>
                </CustomLayout>
            </div>
        )
    }
}

export default ProductDetail