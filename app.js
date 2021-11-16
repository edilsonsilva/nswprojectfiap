const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const settings = require("./config/settings");
const cliente = require("./model/cliente")
const autentica = require("./middleware/autentica")

mongoose.connect(settings.dbpath,{useNewUrlParser:true,useUnifiedTopology:true})


const app = express();


app.use(express.json());
const confCors={
    origin:"*",
    optionsSuccessStatus:200
}
app.get("/",(req,res)=>{
    Cliente.find((erro,dados)=>{
        if(erro){
            return res.status(400).send({mensagem:`Ocorreu um erro durante o processamento da sua requisição -> ${erro}`});
        }
        res.status(200).send({payload:dados});
    })
});

app.post("/cadastro",(req,res)=>{
    const dados = new Cliente(req.body);
    dados.save().then((rs)=>{
        res.status(201).send({mensagem:"Dados Cadastrados",payload:rs})
    }).catch((error)=>res.status(400).send({mensagem:`Erro ao tentar cadastrar -> ${error}`}))
    
});

app.put("/atualizar/:id",(req,res)=>{
    Cliente.findByIdAndUpdate(req.params.id,req.body,{new:true},(erro,dados)=>{
        if(erro){
            return res.status(400).send({mensagem:`Erro ao tentar atualizar -> ${erro}`});
        }
        res.status(200).send({mensagem:"Dados atualizados",payload:dados});
    })
    
});

app.delete("/apagar/:id",(req,res)=>{
    res.status(204).send({mensagem:"Você esto verbo DELETE"});
});

app.use((req,res)=>{
    res.type("application/json");
    res.status(404).send({mensagem:'404 - Not Found'});
});

const createUserToken=(id,usuario,nome)=>{
    return jwt.sign({id:id,usuario:usuario,nome:nome},settings.jwt_key,{expiresIn:settings.jwt_expires})
}

app.listen(3000,()=>console.log("Servidor onine. Para encerrar tecle CTRL+C"));