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
    <div >
      <div className ="all">
      <Router>
      <div className="title">
        {' '}
        {/* <div> */}
          <div className="topcontent">
        {/* 欢迎使用SmartCite引文上下文抽取系统 */}
        Welcome to use SmartCite citation context extraction system
        </div>
        <div className="topright">
        <Link to="/" >
        | Home |
        </Link>
        </div>
        {/* </div> */}
      </div>
      
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
            <p className="bottomsmartcite">SmartCiteCon</p>
            <br />
            <div className="bottomcontent1">
            {/* 语义相关的引文上下文抽取工具 */}
            <p>Semantic related citation context extraction tool</p>
            {/* 用户可以在
              smartcite中完成对引文的显式上下文,隐式上下文等所有语义相关的引文上下文的抽取 */}
            <p>
              Users can complete the extraction of all semantically related citation contexts such as explicit and implicit contexts of citations in smartcite
            </p>
            {/* 集成Grobid工具,用户可以对pdf格式或者xml文件进行相关处理 */}
            <p>Integrated Grobid tool, users can perform related processing on pdf format or xml file
            </p>
            </div>

          </div>
          
          <div className="bottomdiv2">
            <p className="bottomcontent2" style={{fontSize:20}}>Contact us</p>
            <div className="bottomicon">
            <div className="bottomicon1">
            <MailOutlined style={{fontSize:70}}/>
            </div>
            {/* <div className="bottomicon2">
             <QqOutlined style={{fontSize:50}}/>
             </div> */}
            </div>
            <p className="bottomcontent2">email：chenruiguo@whu.edu.cn</p>
          </div>
        </div>
      </header>
    </div>
    </div>
  )
}

export default App
