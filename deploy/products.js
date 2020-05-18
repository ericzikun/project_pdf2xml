const fs = require('fs')
const path = require('path')
const SERVER_LIST = [
  {
    id: 0,
    name: 'XXX-生产环境',
    host: '114.55.101.144',
    port: 22,
    username: 'administrator',
    password: 'ir_lab2020',
    // path: 'C:\\samart_cite_fronted\\project_pdf2xml\\project_pdf2xml\\test_build'
    // path: '/C:/test_build'
    path: '/C:/samart_cite_web'
  },
  
]
// env环境变量的路径
const envPath = path.resolve(__dirname, '.env')
// env对象
const envObj = parse(fs.readFileSync(envPath, 'utf8'))
const SERVER_ID = parseInt(envObj['APP_SERVER_ID'])
module.exports = SERVER_LIST[SERVER_ID]


function parse (src) {
  // 解析KEY=VAL的文件
  const res = {}
  src.split('\n').forEach(line => {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    const keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/)
    // matched?
    if (keyValueArr != null) {
      const key = keyValueArr[1]
      let value = keyValueArr[2] || ''

      // expand newlines in quoted values
      const len = value ? value.length : 0
      if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
        value = value.replace(/\\n/gm, '\n')
      }

      // remove any surrounding quotes and extra spaces
      value = value.replace(/(^['"]|['"]$)/g, '').trim()

      res[key] = value
    }
  })
  return res
}
