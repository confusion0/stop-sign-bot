const mongoose = require('mongoose')

module.exports = async () => {
  await mongoose.connect('mongoURI', {
  	keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  
  return mongoose.connection
}
