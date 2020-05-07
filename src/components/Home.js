import React, { Component } from 'react'
import '../assets/css/index.css'
import { Upload, message, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { notification } from 'antd'
const Home = () => {
  const file=[]

  const onChange = ({ file }) => {
    console.log('file', file);
    console.log(typeof(file))
  }
  
    // const { fileList } = this.state
    // const { file } = this.state
    const props = {
        name: 'UploadFile',//name得看接口需求，name与接口需要的name一致
        // action: 'http://.......',//接口路径
        data: {  },//接口需要的参数，无参数可以不写
        multiple: false,//支持多个文件
        showUploadList: true,//展示文件列表
    }
    const submit=()=>{
      notification.success({
        message: '您已提交，请耐心等候，系统正在处理',
        duration: 4.5,
        // description
      })
    }
    return (
      <div className="home">
        <div className="smartcite">SmartCite</div>
        <div className="button">
          <div>
            <Upload {...props}
              fileList={file}
              onChange={onChange}
            >
              <Button type="Link" shape="round" size="large">
                <UploadOutlined /> Select file
              </Button>
            </Upload>
          </div>
          <div>
            <Button type="default" shape="round" size="large" >
              <SearchOutlined />
              <span>请选择pdf或者xml格式的文件进行引上下文抽取</span>
            </Button>
          </div>
          <div className="submit">
            <Link to="/Result">
              <Button type="Link" shape="round" size="large" onClick={submit}>
                Submit{' '}
              </Button>{' '}
            </Link>
          </div>
        </div>
        <div className="blank"></div>
      </div>
    )
  
}

export default Home
