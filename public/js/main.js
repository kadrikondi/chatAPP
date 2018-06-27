$(document).ready( ()=>{
    let messages= [];
    let socket= io.connect('http://localhost:5000');
    let chatform = $('#chatform');
    let message = $('#chatinput');
    let chatwindow =$('#chatwindow')
    let userform = $('#userform')
    let username = $('#username')
    let users = $('#users')
    let error=$('#error');
    
//submit user
userform.on('submit', (evt)=>{
   socket.emit('set user', username.val(), (data)=>{
if(data){
    $('#userformwrap').hide()
    $('#mainwrap').show()
}else{
    error.html('username already taken')
}
   })
   socket.on('users', (data)=>{
       let html= ''
       for( let i=0;i<data.length;i++){
           html += '<li class="list-group-item"> '+data[i]+' </li>'
        
       };
       users.html(html)

   })
    evt.preventDefault()

})

})