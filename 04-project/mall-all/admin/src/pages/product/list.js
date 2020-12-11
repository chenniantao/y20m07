import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Breadcrumb, Table, InputNumber, Button,Switch,Divider,Input } from 'antd';
import {Link} from 'react-router-dom'
const { Content } = Layout;
const { Search } = Input

import CustomLayout from 'components/custom-layout'
import { actionCreator } from './store';

class ProductList extends Component {
    componentDidMount() {
        this.props.handlePage(1)
    }
    render() {
        const { 
            list, 
            current, 
            total, 
            pageSize, 
            handlePage, 
            isFetching,
            keyword,
            handleUpdateIsShow,
            handleUpdateStatus,
            handleUpdateIsHot, 
            handleUpdateOrder,
        } = this.props
        const dataSource = list
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                ellipsis:true,
                render:(name)=>{
                    if(keyword){
                        //搜索关键字高亮处理
                        const reg = new RegExp('('+keyword+')','ig')
                        const html = name.replace(reg,'<b style="color:red;">$1</b>')
                        return <span dangerouslySetInnerHTML={{ __html: html }}></span>
                    }else{
                        return name
                    }
                }
            },
            {
                title: '是否显示在首页',
                dataIndex: 'isShow',
                width: '15%',
                render: (isShow, record) => <Switch
                    checkedChildren="显示"
                    unCheckedChildren="隐藏"
                    checked={isShow == '1' ? true : false}
                    onChange={
                        checked => {
                            const newIsShow = checked ? '1' : '0'
                            handleUpdateIsShow(record._id, newIsShow)
                        }
                    }
                ></Switch>
            },
            {
                title: '上架/下架',
                dataIndex: 'status',
                width: '10%',
                render: (status, record) => <Switch
                    checkedChildren="上架"
                    unCheckedChildren="下架"
                    checked={status == '1' ? true : false}
                    onChange={
                        checked => {
                            const newStatus = checked ? '1' : '0'
                            handleUpdateStatus(record._id, newStatus)
                        }
                    }
                ></Switch>
            },
            {
                title: '是否热门',
                dataIndex: 'isHot',
                width: '10%',
                render: (isHot, record) => <Switch
                    checkedChildren="是"
                    unCheckedChildren="否"
                    checked={isHot == '1' ? true : false}
                    onChange={
                        checked => {
                            const newIsHot = checked ? '1' : '0'
                            handleUpdateIsHot(record._id, newIsHot)
                        }
                    }
                ></Switch>
            },                                     
            {
                title: '排序',
                dataIndex: 'order',
                width: '10%',
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
                width: '10%',
                render:(text,record)=><span>
                    <Link to={'/product/save/'+record._id}>修改</Link>
                    <Divider type="vertical" />
                    <Link to={'/product/detail/' + record._id}>查看</Link>
                </span>
            },
        ];
        return (
            <div className="ProductList">
                <CustomLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>商品</Breadcrumb.Item>
                        <Breadcrumb.Item>商品列表</Breadcrumb.Item>
                    </Breadcrumb>   
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom:'20px'
                        }}>
                            <Search
                                placeholder="请输入商品名称关键字"
                                allowClear
                                onSearch={(value) => { handlePage(1, value)}}
                                style={{ width: 400}}
                                enterButton
                            />
                            <Link to="/product/save">
                                <Button type='primary'>新增</Button>
                            </Link>
                        </div>                         
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
                                    handlePage(pagination.current,keyword)
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
    keyword: state.get('product').get('keyword'),    
})
const mapDispatchToProps = (dispatch) => ({
    handlePage: (page,keyword) => {
        dispatch(actionCreator.getPageAction(page, keyword))
    },
    handleUpdateIsShow: (id, newIsShow) => {
        dispatch(actionCreator.getUpdateIsShowAction(id, newIsShow))
    },
    handleUpdateStatus: (id, newStatus) => {
        dispatch(actionCreator.getUpdateStatusAction(id, newStatus))
    },
    handleUpdateIsHot: (id, newIsHot) => {
        dispatch(actionCreator.getUpdateIsHotAction(id, newIsHot))
    },              
    handleUpdateOrder: (id, newOrder) => {
        dispatch(actionCreator.getUpdateOrderAction(id, newOrder))
    },                  
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductList)