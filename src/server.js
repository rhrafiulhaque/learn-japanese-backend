
const { database_url, port } = require("./app/config")
const app = require("./app")
const { default: mongoose } = require("mongoose")





async function bootstrap() {
    try {
        mongoose.connect(database_url)
        console.log(`Database Connected`)
        app.listen(port, () => {
            console.log(`Learn Japanese Backend listening on port ${port}`)
        })
    } catch (err) {
        console.log(`Error occured`, err)
    }
}

bootstrap().catch(console.dir);
app.get('/', (req, res) => {
    res.send('Hello From Japanese Backend Server');
});
