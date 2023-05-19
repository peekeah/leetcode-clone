const express = require('express')
const dotenv = require('dotenv')

const usersRouter = require('./routes/users')
const questionsRouter = require('./routes/questions')
const submissionsRouter = require('./routes/submissions')
const { errorHandler } = require('./utils/error')
const AppDataSource = require('./utils/data-source')

// dotenv configuration
dotenv.config();

const app = express()
app.use(express.json());

const port = process.env.PORT || 3001;

// initializing db
AppDataSource.initialize().then(() => {
  console.log(`database connected successsfully on port`, process.env.DB_PORT)
}).catch(err => {
  console.log(err);
});


// routes
app.use('/user', usersRouter);
app.use('/questions', questionsRouter);
app.use('/submissions', submissionsRouter);

// error handler
app.use(errorHandler);

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})