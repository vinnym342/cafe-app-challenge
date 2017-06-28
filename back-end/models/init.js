const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOURL);
mongoose.Promise = Promise