import React, { Component } from 'react'
import { Layout, Breadcrumb, Table } from 'antd';
const { Content } = Layout;

import CustomLayout from 'components/custom-layout'

class User extends Component {
    render() {
        const dataSource = [
            {
                key: '1',
                username: '胡彦斌',
                isAdmin: '否',
                isActive: '是',
                email:'111@qq.com',
                phone:'13212344321',
                wxopenid:'dsfdskfkdsfsd',
                createdAt:'2020-12-09 12:11:11'
            }        
        ];

        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '是否管理员',
                dataIndex: 'isAdmin',
                key: 'isAdmin',
            },
            {
                title: '是否有效用户',
                dataIndex: 'isActive',
                key: 'isActive',
            },
            {
                title: 'email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: '手机',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '微信openid',
                dataIndex: 'wxopenid',
                key: 'wxopenid',
            },
            {
                title: '注册时间',
                dataIndex: 'createdAt',
                key: 'createdAt',
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
                        <Table dataSource={dataSource} columns={columns} />
                    </Content>
                </CustomLayout>
            </div>
        )
    }
}

export default User