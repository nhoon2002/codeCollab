'user strict'

module.exports = {
   mailer: {
      service: 'Gmail',
      auth: {
         user: '<USEREMAIL>',
         pass: '<USERPASSWORD>'
      }
   },
   dbConnstring: 'mongodb://127.0.0.1:27017/codecollab',
   sessionKey : 'SupCodeCollab'
}
