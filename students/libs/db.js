const mysql = require('mysql');

class Db{
    constructor(table) {
        this.table = table;
        this.__init();
    }
    __init(){
        return this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'gzx123456',
            database: 'wui2006',
            port:3308
        })

        this.connection.connect();
    }

    edit(id){
        return new Promise((resolve, reject) => {
            this.connection.query("select * from "+this.table+" where id=?",[id],function(error,result){
                if (error){
                    reject(error)
                }
                if(result.length){
                    resolve(result)
                }else{
                    reject(error)
                }
            })
        })
    }

    update(object,id){
        return new Promise((resolve, reject) => {
            let str='';
            for(let key in object){
                if(key!='id'){
                    // if(key=='age'){
                    //     str+=key+'='+object[key]+',';
                    // }else{
                    //     str+=key+'="'+object[key]+'",';
                    // }
                    str+=key+'="'+object[key]+'",';
                }
            }
            str = str.slice(0,-1)
            console.log(str)
            this.connection.query("update "+this.table+" set "+str+" where id=?",[id],function(error,result){
                if(error){
                    reject(error)
                }
                if(result.affectedRows){

                    resolve(result)
                }else
                    reject(error);
            });

        })
    }
}

module.exports = {
    Db:Db
}