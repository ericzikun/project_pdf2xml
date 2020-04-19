import React, { Component } from 'react'
import { Upload, message, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import '../assets/css/index.css'
import { List, Typography } from 'antd';

class Result extends Component {
  constructor(props) {
    super(props)
    this.state = { 
    }
  }
  

  render() {
    const paperData = [
      '[1] Discriminative word alignment with conditional random fields',
      '[2] Discriminative word alignment with conditional random fields'
    ]
    const citeData = [
      "作者：","发表时间：","引文上下文："
    ]

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
        引文
        <List
      size="large"
      // header={<div>Header</div>}
      // footer={<div>Footer</div>}
      bordered
      dataSource={paperData}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
        </div>
        <div className="resultcontent2">
        引文信息
        <List
      size="large"
      bordered
      dataSource={citeData}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
        </div>
      </div>
      </div>
      </div>
    )
  }
}

export default Result
