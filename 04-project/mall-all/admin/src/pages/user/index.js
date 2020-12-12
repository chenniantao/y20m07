import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Breadcrumb, Table, Switch } from 'antd';
const { Content } = Layout;

import CustomLayout from 'components/custom-layout'
import { actionCreator } from './store';
import { formatDate } from 'util'

class User extends Component {
    componentDidMount(){
        this.props.handlePage(1)
    }
    render() {
        const { list, current, total, pageSize, handlePage, isFetching, handleUpdateIsActive } = this.props
        const dataSource = list
        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
            },
            {
                title: '是否管理员',
                dataIndex: 'isAdmin',
                render: isAdmin => isAdmin ? '是' : '否'
            },
            {
                title: '是否有效用户',
                dataIndex: 'isActive',
                render: (isActive,record) => <Switch 
                    checkedChildren="是" 
                    unCheckedChildren="否"
                    checked={isActive=='1' ? true : false}
                    onChange={
                        checked=>{
                            const newActive = checked ? '1' : '0'
                            handleUpdateIsActive(record._id, newActive)
                        }
                    }
                ></Switch>
            },
            {
                title: 'email',
                dataIndex: 'email',
            },
            {
                title: '手机',
                dataIndex: 'phone',
            },
            {
                title: '微信openid',
                dataIndex: 'wxopenid',
            },
            {
                title: '注册时间',
                dataIndex: 'createdAt',
                render: createdAt => formatDate(createdAt)
            },                          
        ];
        return (
            <div className="User">
                <CustomLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>用户</Breadcrumb.Item>
                        <Breadcrumb.Item>用户列表</Breadcrumb.Item>
                    </Breadcrumb>
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
                                    showSizeChanger:false
                                }
                            }
                            onChange={
                                (pagination)=>{
                                    handlePage(pagination.current)
                                }
                            }
                            loading={
                                {
                                    spinning: isFetching,
                                    tip:'数据正在请求中...'
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
    list: state.get('user').get('list'),
    current: state.get('user').get('current'),
    total: state.get('user').get('total'),
    pageSize: state.get('user').get('pageSize'),
    isFetching: state.get('user').get('isFetching'),
})
const mapDispatchToProps = (dispatch) => ({
    handlePage: (page) => {
        dispatch(actionCreator.getPageAction(page))
    },
    handleUpdateIsActive:(id,newActive)=>{
        dispatch(actionCreator.getUpdateIsActive(id, newActive))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(User)