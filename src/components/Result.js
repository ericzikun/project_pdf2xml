import React, { Component } from 'react'
import { Upload, message, Button} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import '../assets/css/index.css'
import { List, Typography } from 'antd'
import { Table, Radio, Divider } from 'antd'
import { useState } from 'react'
import { useEffect } from 'react'
import testData from '../assets/jsondata/testData.json'

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
      title: 'Citation',
      dataIndex: 'title',
      render: (text) => <a>{text}</a>,
    },
  ]
  const paperData0 = [testData.data.refTags]
  // refTags.reference.article_title

  const citeData01 = ['作者：', '发表时间：']
  const citeData02 = ['引文上下文：']
  // const [paperData, setPaperData] = useState(data)
  const [citeData, setCiteData] = useState(citeData01)
  const [citeData2, setCiteData2] = useState(citeData02)

  const [selectionType, setSelectionType] = useState('radio')
  // 提取json文件中的paper title authors year，并返回字典
  const referenceList = paperData0[0].map((i, key) => {
    return {
      key: key,
      title: i.reference.article_title,
      authors: i.reference.authors,
      year: i.reference.year,
    }
  })
  // 提取json文件中的引文上下文
  const contextList = paperData0[0].map((i, key) => {
    return {
      key: key,
      id: i.id,
      text: i.contextList.map((j, key2) => {
        return j.text
      }),
    }
  })
  const [paperData, setPaperData] = useState(referenceList)

  // setPaperData(referenceList);
  useEffect(() => {
    // console.log(JSON.stringify(paperData0[0]));
    // console.log(paperData0[0][1].reference.article_title);

    // setPaperData(referenceList);
    // console.log(referenceList,typeof(referenceList),data,typeof(data),paperData,);
    // console.log(contextList)
  })
  // setPaperData(referenceList);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      )
      // console.log(selectedRowKeys, JSON.stringify(paperData[0]))
      const list1 = [
        '作者: ' +
          JSON.stringify(paperData[selectedRowKeys].authors[0].surName) +
          ' ' +
          JSON.stringify(paperData[selectedRowKeys].authors[0].givenName),
        '发表时间:' + JSON.stringify(paperData[selectedRowKeys].year),
      ]
      const list2 = [[
        '引文上下文:' + JSON.stringify(contextList[selectedRowKeys].text)
      ]]
      const list3 = contextList[selectedRowKeys].text.map((i, key) => {
        return i
      })
          
        
      setCiteData(list1)
      setCiteData2(list3)
      console.log(list3)
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === 'Disabled User',
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  }
  // render() {
  const state = {
    top: 'topLeft',
    bottom: 'bottomRight',
  }

  return (
    <div>
      <div className="resulttitle">
        <div className="smartcite2">SmartCite</div>
        <div className="searchbutton2">
          <Button type="default" shape="round">
            <SearchOutlined />
            <span>请选择pdf或者xml格式的文件进行引上下文抽取</span>
          </Button>
          <Upload>
            <Button type="Link" shape="round">
              <UploadOutlined /> Select file
            </Button>
          </Upload>
        </div>
      </div>
      <div className="result">
        <div className="resultcontent">
          <div className="resultcontent1">
            <p>引文</p>
            <Table
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
              columns={columns}
              dataSource={paperData}
              pagination={{ position: [state.bottom], pageSize: 5 }}
            />
          </div>
          <div className="resultcontent2">
            <p>引文信息</p>
            
            <List
              className="list"
              size="large"
              bordered
              dataSource={citeData}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
            <List
              className="list"
              size="large"
              bordered
              dataSource={citeData2}
              renderItem={(item) => <List.Item>{item}</List.Item>}
              pagination={{  pageSize: 2 }}
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
