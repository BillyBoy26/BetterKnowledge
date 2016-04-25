var query = require('./connexionPostgres');



var add = function (category){
    if(category.name && category.description) {
        query("INSERT INTO bk_category.t_category_cat(cat_name,cat_description) values($1,$2)",
            [category.name, category.description],function(err,rows,fields){
                if(err){
                    console.error(err);
                    throw err;
                }
                console.log("Insert category done");
            });
    }

};

var findAll = function(callback){
    query("SELECT cat_id,cat_name,cat_description FROM bk_category.t_category_cat ORDER BY update_date desc",{},function(err,rows,fields){
            if(err){
                console.error(err);
                throw err;
            }
            console.log("Find all category done");
            var categoryList = [];
            if(rows) {
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    var category = {
                        id: row.cat_id,
                        name: row.cat_name,
                        description: row.cat_description
                    };
                    categoryList.push(category);
                }
            }
            callback(categoryList);
     });
}

module.exports = {
    add : add,
    findAll :findAll
};
