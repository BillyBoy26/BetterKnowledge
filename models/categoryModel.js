var postgres = require('./connexionPostgres');

postgres.connect();


var add = function (category){
    postgres.query("INSERT INTO bk_category.category(cat_name,cat_description) values($1,$2)",
        [category.name, category.desciption]);
}

module.exports = {
    add : add
};
/*
function(err,rows,fields){
    if(err){
        console.error(err);
        throw err;
    }
    console.log("Insert category done");
    return done(null, profile)
}*/