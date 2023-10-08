import express from "express"
import { engine } from "express-handlebars"
import { options } from "./app/static.js"
import "dotenv/config"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

console.log(`NODE_ENV set to: ${process.env.NODE_ENV}`)

if (process.env.NODE_ENV === "development") {
  const livereload = await import("livereload")
  const connectLiveReload = (await import("connect-livereload")).default

  const liveReloadServer = livereload.createServer()
  liveReloadServer.watch(path.join(__dirname, "public"))
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/")
    }, 100)
  })
  app.use(connectLiveReload())
}

app.engine(".hbs", engine({ extname: ".hbs" }))
app.set("view engine", ".hbs")
app.set("views", "./views")
app.use(express.static("public", options))

app.get("/", (req, res) => {
  res.render("home", {
    title: "Node.js Calculator",
  })
})

export default app
