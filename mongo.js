const mongoose = require('mongoose')

module.exports = async () => {
  await mongoose.connect('mongodb+srv://xsadme:lmfao888@cluster0.upphd.mongodb.net/MySecondDatabase?retryWrites=true&w=majority', {
  	keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  
  return mongoose.connection
}
