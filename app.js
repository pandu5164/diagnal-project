const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 4000;
// app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.listen(9000);
