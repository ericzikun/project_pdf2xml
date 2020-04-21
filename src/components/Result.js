import React, { Component } from 'react'
import { Upload, message, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import '../assets/css/index.css'
import { List, Typography } from 'antd'
import { Table, Radio, Divider } from 'antd'
import { useState } from 'react'
import { useEffect } from 'react'
import  testData  from '../assets/jsondata/testData.json' 
// class Result extends Component {
// constructor(props) {
//   super(props)
//   this.state = {
//     paperData: [
//       '[1] Discriminative word alignment with conditional random fields',
//       '[2] Discriminative word alignment with conditional random fields',
//       '[1] Discriminative word alignment with conditional random fields',
//       '[2] Discriminative word alignment with conditional random fields',
//       '[1] Discriminative word alignment with conditional random fields',
//       '[2] Discriminative word alignment with conditional random fields',
//       '[1] Discriminative word alignment with conditional random fields',
//       '[2] Discriminative word alignment with conditional random fields',
//       '[1] Discriminative word alignment with conditional random fields',
//       '[2] Discriminative word alignment with conditional random fields',
//       '[1] Discriminative word alignment with conditional random fields',
//       '[2] Discriminative word alignment with conditional random fields',
//       '[1] Discriminative word alignment with conditional random fields',
//       '[2] Discriminative word alignment with conditional random fields',
//       '[1] Discriminative word alignment with conditional random fields',
//       '[2] Discriminative word alignment with conditional random fields',
//     ],
//     citeData : [
//       "作者：","发表时间：","引文上下文："
//     ]
//   }
// }

const Result = () => {
  // const paperData0 = [
  //         '[1] Discriminative word alignment with conditional random fields',
  //         '[2] Discriminative word alignment with conditional random fields',
  //         '[1] Discriminative word alignment with conditional random fields',
  //         '[2] Discriminative word alignment with conditional random fields',
  //         '[1] Discriminative word alignment with conditional random fields',
  //         '[2] Discriminative word alignment with conditional random fields',
  //         '[1] Discriminative word alignment with conditional random fields',
  //         '[2] Discriminative word alignment with conditional random fields',
  //         '[1] Discriminative word alignment with conditional random fields',
  //         '[2] Discriminative word alignment with conditional random fields',
  //         '[1] Discriminative word alignment with conditional random fields',
  //         '[2] Discriminative word alignment with conditional random fields',
  //         '[1] Discriminative word alignment with conditional random fields',
  //         '[2] Discriminative word alignment with conditional random fields',
  //         '[1] Discriminative word alignment with conditional random fields',
  //         '[2] Discriminative word alignment with conditional random fields',
  //       ];
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
  ];
  const columns = [
    {
      title: 'Citation',
      dataIndex: 'title',
      render: (text) => <a>{text}</a>,
    }
  ]
  const paperData0 = [testData.data.refTags]
  // refTags.reference.article_title

  const citeData0 = ['作者：', '发表时间：', '引文上下文：']
  // const [paperData, setPaperData] = useState(data)
  const [citeData, setCiteData] = useState(citeData0)
  const [selectionType, setSelectionType] = useState('radio')
  // 提取json文件中的paper title authors year，并返回字典
  const referenceList =  paperData0[0].map((reference, key)=>{
    return {
      key: key,
      title: reference.reference.article_title,
      authors: reference.reference.authors,
      year: reference.reference.year,
    }
  })
  // 提取json文件中的引文上下文
  // const contextList =  paperData0[0].map((i, key)=>{
  //   return {
  //     key: key,
  //     id: i.contextList.id,
  //     text: i.contextList.text,
  //   }
  // })
  const [paperData, setPaperData] = useState(referenceList)

  // setPaperData(referenceList);
  useEffect (()=>{
    // console.log(JSON.stringify(paperData0[0]));
    // console.log(paperData0[0][1].reference.article_title);
    
    // setPaperData(referenceList);
    console.log(referenceList,typeof(referenceList),data,typeof(data),paperData,);
    
  }) 
  // setPaperData(referenceList);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      

      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      )
      console.log(
        selectedRowKeys,JSON.stringify(paperData[0])
      )
      const list = 
      ['作者: ' + JSON.stringify(paperData[selectedRowKeys].authors[0].surName) + " " +JSON.stringify(paperData[selectedRowKeys].authors[0].givenName), 
      '发表时间:' + JSON.stringify(paperData[selectedRowKeys].year), 
      '引文上下文:' ]
      setCiteData(list)
      console.log(list)
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === 'Disabled User',
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  }
  // render() {
   
    
   
  
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
            
            {/* <List
      size="large"
      // header={<div>Header</div>}
      // footer={<div>Footer</div>}
      bordered
      dataSource={paperData}
      renderItem={item => <List.Item>{item}</List.Item>}
    /> */}
            {/* <Radio.Group
              onChange={({ target: { value } }) => {
                setSelectionType('radio')
              }}
              value={selectionType}> */}
              {/* <Radio value="checkbox">Checkbox</Radio> */}
              {/* <Radio value="radio">radio</Radio> */}
            {/* </Radio.Group> */}
            <Divider />
            <Table
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
              columns={columns}
              dataSource={paperData}
            />
          </div>
          <div className="resultcontent2">
            引文信息
            <List
              size="large"
              bordered
              dataSource={citeData}
              renderItem={(item) => <List.Item>{item}</List.Item>}
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
