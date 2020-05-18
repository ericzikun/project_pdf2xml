const scpClient = require('scp2')
const ora = require('ora')
const chalk = require('chalk')
const server = require('./products')
const spinner = ora('正在发布到生产服务器...')
    spinner.start()
    scpClient.scp('build/', {
      host: server.host,
      port: server.port,
      username: server.username,
      password: server.password,
      path: server.path
    }, function(err) {
      spinner.stop()
      if (err) {
        if (err.code === 'ECONNRESET') {
          console.log(chalk.green('  Success! 成功发布到生产服务器! \n'))
        } else {
          console.log(err)
          console.log(chalk.red('  发布失败.\n'))
          throw err
        }
      } else {
        console.log(chalk.green('  Success! 成功发布到生产服务器! \n'))
      }
    })