import React, { Component } from 'react'
import '../assets/css/index.css'
import { Upload, message, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { notification } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from "react-router-dom";
const Home = ( ) => {
  const file = []
  const [fileName, setFileName]= useState('')
  const [response, setResponse] = useState('')
  const onChange = ({ file }) => {
    console.log('--正在上传的file--', file)
    localStorage.setItem("uploadFileName", file.name);
    setFileName(file.name)
    if (file.status == 'uploading'){
      localStorage.removeItem("fileName");
      localStorage.removeItem("fileRes");
    }
  
    
  }
  const onSuccessUpload = (res) => {
    console.log('--返回的结果--', res)
    localStorage.setItem("fileName", localStorage.getItem("uploadFileName"));
    localStorage.setItem("fileRes", JSON.stringify(res));
  }
    // const { fileList } = this.state
    // const { file } = this.state
    const props = {
        name: 'file',//name得看接口需求，name与接口需要的name一致
        // action: '/test/upload/file',//接口路径
        action: '/extract',//接口路径
        data: {file} ,//接口需要的参数，无参数可以不写
        multiple: false,//支持多个文件
        showUploadList: true,//展示文件列表
        headers: {
          // "Content-Type": "multipart/form-data"
        },
    }
    let history = useHistory();
    const submit=(  )=>{
      if (!localStorage.getItem("fileName")){
        notification.error({
          message: 'please wait patiently, the system is processing, Please upload a pdf or xml file first.',
          duration: 4,
          // description
        })
      } else{
        // <Link to="/Result"> </Link>
        history.push('/result')
        notification.success({
          message: 'You have submitted, , please wait about 1min',
          duration: 10,
          // description
        })
        // let { history } = props
        // history.push({pathname: '/result'})
        // const goTo=({history})=>{
          // history.push('/result')
        // }
      }
     
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
              onSuccess={onSuccessUpload}
            >
              <Button type="Link" shape="round" size="large">
                <UploadOutlined /> Select file
              </Button>
            </Upload>
          </div>
          <div>
            <Button type="default" shape="round" size="large" disabled='true'>
              <SearchOutlined />
              
                <span>{fileName ==''?'Please select a pdf or xml file for citation context extraction':fileName}</span>
            </Button>
          </div>
          <div className="submit">
            {/* <Link to="/Result"> */}
              <Button type="Link" shape="round" size="large" onClick={submit}>
                Submit{' '}
              </Button>{' '}
            {/* </Link> */}
          </div>
        </div>
        <div className="blank"></div>
      </div>
    )
  
}

export default Home
