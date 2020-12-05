import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class CategoryList extends Component {
    render() {
        return (
            <div className='CategoryList'>
                <Link to="/category/save/null">新增</Link>
                this is category list page
            </div>
        )
    }
}
export default CategoryList