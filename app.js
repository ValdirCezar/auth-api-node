import express from "express"

const app = express();
const env = process.env;
const PORT = env.PORT || 8080

app.get('/api/status', (req, res) => {
    return res.json({
        "service": "auth-api",
        "status": "up"
    })
})

app.listen(PORT, () => {
    console.info(`Server is running at port ${PORT}`);
})