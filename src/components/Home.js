import React, { Component } from 'react'
import '../assets/css/index.css'
import { Upload, message, Button, Spin } from 'antd'
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
  // const [userUploaded,setUserUploaded]= useState(false)
  const [response, setResponse] = useState('')
  const [isUploading, setUploading] = useState(false)
  const onChange = ({ file }) => {
    console.log('--正在上传的file--', file)
    localStorage.setItem("uploadFileName", file.name);
    setFileName(file.name)
    // setUserUploaded(true)
    if (file.status == 'uploading'){
      setUploading(true);
      localStorage.removeItem("fileName");
      localStorage.removeItem("fileRes");
    }
  
    
  }
  let history = useHistory();
  const onSuccessUpload = (res) => {
    console.log('--返回的结果--', res);
    setUploading(false);
    localStorage.setItem("fileName", localStorage.getItem("uploadFileName"));
    setFileName(localStorage.getItem("uploadFileName"));
    localStorage.setItem("fileRes", JSON.stringify(res));
    if (!isUploading){
      history.push('/result');
      notification.success({
        message: 'Completed',
        duration: 5,
        // description
      })     
    }
  }
  // 上传失败
  const onFailUpload = () => {
    setUploading(false);
    notification.error({
      message: 'Upload failed, you can refer to the test case in the top right corner and re-upload.',
      duration: 20,
      // description
    })   
  }
    // const { fileList } = this.state
    // const { file } = this.state
    const props = {
        name: 'file',//name得看接口需求，name与接口需要的name一致
        // action: '/test/upload/file',//接口路径
        action: 'http://114.55.101.144:8080/extract',//接口路径
        // action: '/extract',
        data: {file} ,//接口需要的参数，无参数可以不写
        multiple: false,//支持多个文件
        showUploadList: true,//展示文件列表
        headers: {
          // "Content-Type": "multipart/form-data"
        },
    }

    //  
    // let history = useHistory();
    const submit=(  )=>{
      if ( isUploading&&!localStorage.getItem("fileName")){
        notification.error({
          message: 'please wait patiently, the system is processing...',
          duration: 8,         
        })
      } else if( !isUploading && !localStorage.getItem("uploadFileName")){
        notification.error({
          message: 'Please upload a pdf or xml file first',
          duration: 8,     
        })
      }
      else{
     
        // history.push('/result')
        notification.success({
          message: 'You have submitted',
          duration: 5,
          // description
        })     
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
              onError={onFailUpload}
            >
              <Button type="Link" shape="round" size="large">
                <UploadOutlined /> Select File
              </Button>
            </Upload>
          </div>
          <div>
            <Button type="default" shape="round" size="large" disabled='true'>
                {isUploading && <Spin></Spin>}
                {isUploading && <span>Processing... Please wait a moment</span>}
                {!isUploading && <SearchOutlined />}
                {!isUploading && <span>{fileName ==''?'Please select a pdf or xml file for citation context extraction':fileName}</span>}
            </Button>
          </div>
          {/* 取消submit按钮 */}
          {/* <div className="submit">             
              <Button type="Link" shape="round" size="large" onClick={submit}>
                Submit{' '}
              </Button>{' '}          
          </div> */}
        </div>
        <div className="blank"></div>
      </div>
    )
  
}

export default Home
