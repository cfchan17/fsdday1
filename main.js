//imports
const express = require('express')
const handlebars = require('express-handlebars')

//configure the app
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000

//create an instance of an Express app
const app = express()

//configure handlebars
app.engine('hbs',
    handlebars({ defaultLayout: 'default.hbs'})//specify the default layout
)
app.set('view engine', 'hbs')

//****** Middlewares ******/
app.use(express.static(__dirname + '\\static\\images'))

app.get(
    '/',
    (req, res) => {
        res.status(200)
        res.type('text/html')
        res.render('roll',
            {
                isLandingPage : true
            }
        )
    }
)

app.get(
    '/roll',
    (req, res) => {
        let number = 9
        if(number > 6) {
            Math.floor(Math.random() * 10) + 1
        }

        res.status(200)
        res.type('text/html')
        res.render('roll',
            {
                isLandingPage : false
            }
        )
    }
)

app.use((req,res) => {
    res.status(300)
    res.type('text/html')
    res.render('roll',
        {
            isLandingPage : true
        }
    )
})

//start the app
app.listen(
    PORT,
    () => {
        console.info(`Application started on port ${PORT} at ${new Date()}`)
    }
)