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

// Roll Dice Function
const roll_dice = () => Math.floor(Math.random() * 6) + 1

//Image file name map
const dice_images_map = {
    1 : '1.png',
    2 : '2.png',
    3 : '3.png',
    4 : '4.png',
    5 : '5.png',
    6 : '6.png'
}

//****** Middlewares ******/
app.use(express.static(__dirname + '\\static\\images'))
app.use(express.static(__dirname + '\\static'))

app.get(
    ['/', '/index.html'],
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
        let firstDie = roll_dice()
        let secondDie = roll_dice()

        let firstFilename = dice_images_map[firstDie]
        let secondFilename = dice_images_map[secondDie]

        res.status(200)
        res.type('text/html')
        res.render('roll',
            {
                isLandingPage : false,
                firstDieFile : firstFilename,
                secondDieFile : secondFilename
            }
        )
    }
)

app.use((req,res) => {
    res.status(302)
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