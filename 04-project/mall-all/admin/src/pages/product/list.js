import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Breadcrumb, Table, InputNumber,Button } from 'antd';
import {Link} from 'react-router-dom'
const { Content } = Layout;

import CustomLayout from 'components/custom-layout'
import { actionCreator } from './store';

class ProductList extends Component {
    componentDidMount() {
        //this.props.handlePage(1)
    }
    render() {
        const { 
            list, 
            current, 
            total, 
            pageSize, 
            handlePage, 
            isFetching, 
            handleUpdateOrder,
        } = this.props
        const dataSource = list
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '排序',
                dataIndex: 'order',
                key: 'order',
                render: (order, record) => <InputNumber
                    defaultValue={order}
                    onBlur={ev => {
                        if (ev.target.value != order) {
                            handleUpdateOrder(record._id, ev.target.value)
                        }
                    }}
                ></InputNumber>                   
            },
            {
                title: '操作',
                render:(text,record)=><span>
                    <Link to={'/product/save/'+record._id}>修改</Link>
                </span>
            },
        ];
        return (
            <div className="ProductList">
                <CustomLayout>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>商品</Breadcrumb.Item>
                            <Breadcrumb.Item>商品列表</Breadcrumb.Item>
                        </Breadcrumb>
                        <Link to="/product/save">
                            <Button type='primary'>新增</Button>
                        </Link>
                    </div>    
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Table
                            rowKey="_id"
                            dataSource={dataSource}
                            columns={columns}
                            pagination={
                                {
                                    current: current,
                                    pageSize: pageSize,
                                    total: total,
                                    showSizeChanger: false
                                }
                            }
                            onChange={
                                (pagination) => {
                                    handlePage(pagination.current)
                                }
                            }
                            loading={
                                {
                                    spinning: isFetching,
                                    tip: '数据正在请求中...'
                                }
                            }
                        />
                    </Content>
                </CustomLayout>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    list: state.get('product').get('list'),
    current: state.get('product').get('current'),
    total: state.get('product').get('total'),
    pageSize: state.get('product').get('pageSize'),
    isFetching: state.get('product').get('isFetching'),
})
const mapDispatchToProps = (dispatch) => ({
    handlePage: (page) => {
        dispatch(actionCreator.getPageAction(page))
    },
    handleUpdateOrder: (id, newOrder) => {
        dispatch(actionCreator.getUpdateOrderAction(id, newOrder))
    },          
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductList)