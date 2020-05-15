import React, { Component } from 'react'
import '../assets/css/index.css'
import { Upload, message, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { notification } from 'antd'
import axios from 'axios'
const Home = () => {
  const file=[]
  
  const onChange = ({ file }) => {
    console.log('file', file);
    if (file.status == 'done'){
      console.log('上传成功')
      console.log(file.response.result)
    }
    if (file.status == 'uploading'){
      console.log('正在上传')
      console.log(file.response)
    }
  }
  
    // const { fileList } = this.state
    // const { file } = this.state
    const props = {
        name: 'file',//name得看接口需求，name与接口需要的name一致
        action: 'http://114.55.101.144:8080/test/upload/file',//接口路径
        data: {file} ,//接口需要的参数，无参数可以不写
        multiple: false,//支持多个文件
        showUploadList: true,//展示文件列表
        headers: {
          "Content-Type": "multipart/form-data"
        },
    }
    const submit=()=>{
      notification.success({
        message: '您已提交，请耐心等候，系统正在处理',
        duration: 4.5,
        // description
      })
    }
    // const getData=()=>{
    //   // 获取服务器返回的json数据
    //   var api ='http://114.55.101.144:8080/test/upload/file'
    //   axios.get(api)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // }
    return (
      <div className="home">
        <div className="smartcite">SmartCiteCon</div>
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
