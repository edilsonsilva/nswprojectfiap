const env = process.env.NODE_ENV || "dev";

const config = ()=>{
    switch(env){
        case "dev":
            return{
                dbpath:"mongodb+srv://edilson:Alunos123@clustercliente.gmcsz.mongodb.net/banco?retryWrites=true&w=majority",
                jwt_key:"Navegacao",
                jwt_expires:"2d"
            };
        case "prod":
            return {
                dbpath:"mongodb+srv://edilson:Alunos123@clustercliente.gmcsz.mongodb.net/banco?retryWrites=true&w=majority",
                jwt_key:"Navegacao",
                jwt_expires:"2d"
            };
    }
}

module.exports = config();