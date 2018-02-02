'use strict';

module.exports = {
   mailer: {
      service: 'Gmail',
      auth: {
         user: process.env.MYEMAIL,
         pass: process.env.MYPW
      }
   },
   dbConnstring: 'mongodb://127.0.0.1:27017/codecollab',
   sessionKey : 'SupCodeCollab'
}
