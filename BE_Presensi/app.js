const express = require('express');
const bodyParser = require('body-parser');
const karyawanRoutes = require('./routes/karyawan')
const presensiRoutes = require('./routes/presensi')
const corsOptions = require('./config/cors')
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/api', karyawanRoutes)
app.use('/api', presensiRoutes)

app.listen(port, () => {
  console.log(`Server Running at http://localhost:${port}`);
});
