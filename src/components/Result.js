import React, { Component } from 'react'
import { Upload, message, Button, Spin} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import '../assets/css/index.css'
import { List, Typography } from 'antd'
import { Table, Radio, Divider } from 'antd'
import { useState } from 'react'
import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller';
// import testData from '../assets/jsondata/testData.json'
import axios from 'axios'
// import fileName from './Home.js'
const Result = () => {
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
  ]
  const columns = [
    {
      title: 'Citation Sentences',
      dataIndex: 'sentence',
      render: (text) => <a>{text}</a>,
    },
  ]
  // // 定义引文上下文框的列
  // const columns2 = [
  //   {
  //     // title: 'Citation Context',
  //     dataIndex: 'context',
  //     render: (text) => <a>{text}</a>,
  //   },
  // ]
  const citeData01 = ['Author: ', 'Publication Time: ']
  const citeData02 = ["Citation Context:"]
  const [citeData, setCiteData] = useState(citeData01)
  const [citeData2, setCiteData2] = useState(citeData02)
  const [selectionType, setSelectionType] = useState('radio')

  const [paperData, setPaperData] = useState([])
  const [contextList, setContextList] = useState([])
  const [citationSentence, setCitationSentence] = useState([])
  const [contextData, setContextData]= useState([])
  const state = {
    top: 'topLeft',
    bottom: 'bottomRight',
  }
  // 定义upload参数
  const file = []
  const props = {
    name: 'file',//name得看接口需求，name与接口需要的name一致
    action: 'http://114.55.101.144:8080/extract',//接口路径
    data: {file} ,//接口需要的参数，无参数可以不写
    multiple: false,//支持多个文件
    showUploadList: true,//展示文件列表
    headers: {
      // "Content-Type": "multipart/form-data"
    },
  }

  const refreshData = () => {
    const fileRes = localStorage.getItem("fileRes");
    const testData = JSON.parse(fileRes);
    console.log('--testData--', testData.code);
    const paperData0 = [testData.data.refTags]
    // 提取json文件中的paper title authors year，并返回字典
    const referenceList = paperData0[0].map((i, key) => {
      return {
        key: key,
        title: i.reference.article_title,
        authors: i.reference.authors,
        year: i.reference.year,

      }
    })
    // 定义引文句sentence（左侧内容）
    const citationSentence0 = paperData0[0].map((i, key) => {
      return {
        key: key,
        sentence: i.sentence.text,
      }
    })
    setCitationSentence(citationSentence0)
    // 提取json文件中的引文上下文
    const contextListR = paperData0[0].map((i, key) => {
      return {
        key: key,
        id: i.id,
        text: i.contextList.map((j, key2) => {
          return j.text
        }),
      }
    })

    setPaperData(referenceList)
    setContextList(contextListR)
  }
  useEffect(()=>{
    // 加载数据
    refreshData();
  },[])
 // 点击table中任意一个radio触发
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      )
      // console.log(selectedRowKeys, JSON.stringify(paperData[0]))
      const list1 = [
        'Author: ' +
          JSON.stringify(paperData[selectedRowKeys].authors[0].surName).replace("\"","").replace("\"","")+
          ' ' +
          JSON.stringify(paperData[selectedRowKeys].authors[0].givenName).replace("\"","").replace("\"",""),
          'Reference: '+JSON.stringify(paperData[selectedRowKeys].title).replace("\"","").replace("\"","")+JSON.stringify(paperData[selectedRowKeys].year).replace("\"","").replace("\"","") ,
        // ""
        'Citation Context: '
      ]
      const list2 = [[
        'Citation Context: ' + JSON.stringify(contextList[selectedRowKeys].text)
      ]]
      const list3 = contextList[selectedRowKeys].text.map((i, key) => {
        return i
      })
      setCiteData(list1)  
      setCiteData2(list3) // 赋值引文上下文
      // const contextData0 = []
      // for (let i = 0; i < citeData2.length; i++) {
      //   contextData0.push({
      //     key: i,
      //     context: citeData2[i],
      //   });}
      // setContextData(contextData0)
      // console.log(list3)
      // console.log(contextData.context)
    }
    
  }
  
const [isUploading, setUploading] = useState(false)
  const onChange = ({ file }) => {
    console.log('--正在上传的file--', file)
    localStorage.setItem("uploadFileName", file.name);
    if (file.status == 'uploading'){
      setUploading(true);
    }
  }
  const onSuccessUpload = (res) => {
    console.log('--返回的结果--', res);
    setUploading(false);
    localStorage.setItem("fileName", localStorage.getItem("uploadFileName"));
    localStorage.setItem("fileRes", JSON.stringify(res));
    refreshData();
  }
  const onFailUpload = () => {
    setUploading(false);
  }
  return (
    <div>
      <div className="resulttitle">
        <div className="smartcite2">SmartCiteCon</div>
        <div className="searchbutton2">
          {/* <Button type="default" shape="round">
            <SearchOutlined />
            <span>请选择pdf或者xml格式的文件进行引上下文抽取</span>
          </Button> */}
          <Button type="default" shape="round" size="large" disabled='true'>
                {isUploading && <Spin></Spin>}
                {isUploading && <span>Processing... Please wait a moment</span>}
                {!isUploading && <SearchOutlined />}
                {!isUploading && <span>{localStorage.getItem("fileName") ==''?'Please select a pdf or xml file for citation context extraction':localStorage.getItem("fileName")}</span>}
            </Button>
          <Upload {...props}
              fileList={file}
              onChange={onChange}
              onSuccess={onSuccessUpload}
              onError={onFailUpload}>
            <Button type="Link" shape="round">
              <UploadOutlined /> Select File
            </Button>
          </Upload>
        </div>
      </div>
      <div className="result">
        <div className="resultcontent">
          <div className="resultcontent1">
            <p>Citations</p>
            <Table
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
              columns={columns}
              dataSource={ citationSentence }
              pagination={{ position: [state.bottom], pageSize: 5 }}
              scroll={{ y: 280 }}
            />
          </div>
          <div className="resultcontent2">
            <p>Citation Information</p>
            
            <List
              className="referencelist"
              size="small"
              bordered
              dataSource={citeData}
              renderItem={(item) => <List.Item>{item}</List.Item>}
              column={2}
            />
           
       
            <List
              className="citationlist"
              size="small"
              bordered
              dataSource={citeData2}
              renderItem={(item) => <List.Item>{item}</List.Item>}
              // pagination={{  pageSize: 2 }}
            />
          
         
          </div>
        </div>
      </div>
    </div>
  )
  // }
}
// }

export default Result
