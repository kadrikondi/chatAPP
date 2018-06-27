const express = require('express')
const path = require('path')
const exphbs= require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const port= 5000
const router = require('./routes/index')
 const users=[]
// view engin

//bodyparser middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
// app.set('views',path.join(__dirname,'views'))
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars')
//static file
app.use(express.static(path.join(__dirname, 'public')))
//socket.io
io.sockets.on("connection", (socket)=>{
    //set users
    socket.on('set user', (data, callback)=>{
        if(users.indexOf(data)!=-1){
            callback(false)
        }else{
            callback(true)
            socket.username=data;
            users.push(socket.username);
            updateUsers()

        }
        function updateUsers(){
            io.sockets.emit('users' ,users);
        }
    })

})

app.use('/',router)


//server
server.listen(port,()=>{
    console.log(`server is runing @${port} visit ur browser`)
})

