const jwt = require('jsonwebtoken');
const settings = require("../config/settings");

const autentica = (req,res,next)=>{
    const token_gerado = req.headers.token

if(!token_gerado){
    res.status(401).send({mensagem:`Não há token`})
    return
}

jwt.verify(token_gerado,settings.jwt_key,(erro,dados)=>{
    if(erro){
        return res.status(401).send({mensagem:`Token inválido -> ${erro}`})
    }
    req.content={
        id:dados.id,
        usuario:dados.usuario,
        nome:dados.nome
    }
    return next();
})
}
module.exports = autentica;