import React, { Component } from 'react'
import '../assets/css/index.css'
import { Upload, message, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="home">
        <div className="smartcite">SmartCite</div>
        <div className="button">
          <div>
            <Upload>
              <Button type="Link" shape="round" size="large">
                <UploadOutlined /> Select file
              </Button>
            </Upload>
          </div>
          <div>
            <Button type="default" shape="round" size="large">
              <SearchOutlined />
              <span>请选择pdf或者xml格式的文件进行引上下文抽取</span>
            </Button>
          </div>
          <div className="submit">
            <Link to="/Result">
              <Button type="Link" shape="round" size="large">
                Submit{' '}
              </Button>{' '}
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
