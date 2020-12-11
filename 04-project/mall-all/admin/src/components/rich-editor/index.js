import React, { Component } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'
import './index.less'
class RichEditor extends Component{
    render(){
        const { data, uploadUrl, getData} = this.props
        return(
            <div>
                <CKEditor
                    editor={ClassicEditor}
                    data={data}
                    config={{
                        language: 'zh-cn',
                        ckfinder: {
                            uploadUrl: uploadUrl,
                        },
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        getData(data)
                    }}
                />
            </div>
        )
    }
}

export default RichEditor