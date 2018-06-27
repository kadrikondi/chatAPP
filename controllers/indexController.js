const bodyParsar = require('body-parser')
exports.homepage = (req, res)=>{

    res.render('index', {user: "eChat"})
}