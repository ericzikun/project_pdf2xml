import React from 'react'
// import logo from './logo.svg';
import './assets/css/index.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import Result from './components/Result'
import {MailOutlined } from '@ant-design/icons'
import {QqOutlined} from '@ant-design/icons'
function App() {
  return (
    <div>
      <Router>
      <header className="title">
        {' '}
        欢迎使用SmartCite引文上下文抽取系统
        <Link to="/" className="topright">
        | 首页 |
        </Link>
        
      </header>
      
        <div>
          {/* <Link to ="/">跳转首页</Link>
         <Link to ="/Result">跳转结果</Link> */}
          <Route exact path="/">
            {' '}
            <Home />
          </Route>
          <Route path="/result">
            {' '}
            <Result />
          </Route>
        </div>
      </Router>
      <header className="bottom">
        <div className="bottomdiv">
          <div className="bottomdiv1">
            <p className="bottomsmartcite">SmartCite</p>
            <br />
            <div className="bottomcontent1">
            <p>语义相关的引文上下文抽取工具</p>
            <p>
              用户可以在
              smartcite中完成对引文的显式上下文,隐式上下文等所有语义相关的引文上下文的抽取
            </p>
            <p>集成Grobid工具,用户可以对pdf格式或者xml文件进行相关处理
            </p>
            </div>

          </div>

          <div className="bottomdiv2">
            <p className="bottomcontent2" style={{fontSize:20}}>联系我们</p>
            <div className="bottomicon">
            <div className="bottomicon1">
            <MailOutlined style={{fontSize:50}}/>
            </div>
            <div className="bottomicon2">
             <QqOutlined style={{fontSize:50}}/>
             </div>
            </div>
            <p className="bottomcontent2">官方邮箱   官方QQ群</p>
          </div>
        </div>
      </header>
    </div>
  )
}

export default App
