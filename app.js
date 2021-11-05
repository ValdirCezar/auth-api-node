import express from "express"

import * as db from "./src/config/db/initialData.js"

const app = express();
const env = process.env;
const PORT = env.PORT || 8080

db.createInitialData();

app.get('/api/status', (req, res) => {
    return res.json({
        "service": "auth-api",
        "status": "up"
    })
})

app.listen(PORT, () => {
    console.info(`Server is running at port ${PORT}`);
})