const express = require("express")
const hbs = require("hbs")
const path = require("path")
const {Sequelize, QueryTypes} = require("sequelize")
const multer = require('multer')

const upload = multer({dest: "./src/uploads"})
const app = express()
const port = 5000

const config = require("./config/config.json")
const sequelize = new Sequelize(config.development)

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "src", "pages"))
app.use("/uploads", express.static(path.join(__dirname, "src", "uploads")))

hbs.registerHelper("isTheSame", function(x, y) {
    return x == y
  });

app.get('/', async (req, res)=>{
    const data = await sequelize.query(`SELECT h.name AS hero, t.name AS class, h.picture, t.type_id, h.id FROM public."heroes_db" h LEFT JOIN public."type_db" t on h.type_id = t.type_id`, {type: QueryTypes.SELECT})
    res.render("index", {title: "Home Page", data})
})

app.get('/create', (req, res) => {
    res.render('create', {title: "Create New Hero"})
})

app.post('/create', upload.single("picture") , async(req, res) => {
    const data = req.body
    console.log(data)
    const picture = req.file.filename

    await sequelize.query(`INSERT INTO public."heroes_db" (name, picture, type_id) VALUES('${data.name}','${picture}', '${data.class}')`, {type: QueryTypes.INSERT})
    res.redirect('/')
})

app.post('/delete/:id', async(req, res)=>{
    const id = req.params.id
    await sequelize.query(`DELETE FROM public."heroes_db" WHERE id='${id}'`, {type: QueryTypes.DELETE})
    res.redirect('/')
})

app.get('/edit/:id', async(req, res)=>{
    const id = req.params.id
    const data = await sequelize.query(`SELECT h.name AS hero, t.name AS class, h.picture, t.type_id, h.id FROM public."heroes_db" h LEFT JOIN public."type_db" t on h.type_id = t.type_id WHERE h.id='${id}'`, {type: QueryTypes.SELECT})
    res.render('edit', {title: "edit hero", data: data[0]})
})

app.post('/edit/:id', upload.single("picture") ,async(req, res)=>{
    const {name, type_id} = req.body
    const id = req.params.id
    const picture = req.file.filename

    await sequelize.query(`UPDATE public.heroes_db SET name='${name}', picture='${picture}', type_id='${type_id}' WHERE id='${id}';`)
    res.redirect('/')
})

app.get('/detail/:id', async (req, res) => {
    const id = req.params.id
    const data = await sequelize.query(`SELECT h.name AS hero, t.name AS class, h.picture, t.type_id, h.id FROM public."heroes_db" h LEFT JOIN public."type_db" t on h.type_id = t.type_id WHERE h.id='${id}'`, {type: QueryTypes.SELECT})
    res.render("detail", {title: "Detail Page", data: data[0]})
})

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})