var query = require('./connexionPostgres');



var add = function (category){
    query("INSERT INTO bk_category.t_category_cat(cat_name,cat_description) values($1,$2)",
        [category.name, category.description],function(err,rows,fields){
            if(err){
                console.error(err);
                throw err;
            }
            console.log("Insert category done");
        });
}

module.exports = {
    add : add
};
