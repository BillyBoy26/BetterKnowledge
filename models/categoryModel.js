var query = require('./connexionPostgres');
var moment = require('moment');



var add = function (category){
    if(category.name && category.description) {
        query("INSERT INTO bk_category.t_category_cat(cat_name,cat_description,cat_image_path) values($1,$2,$3)",
            [category.name, category.description,category.imagePath],function(err,rows,fields){
                if(err){
                    console.error(err);
                    throw err;
                }
                console.log("Insert category done");
            });
    }

};
var update = function (category){
    if(category.name && category.description) {
        query("UPDATE bk_category.t_category_cat SET cat_name = $1 ,cat_description = $2 WHERE cat_id = $3",
            [category.name, category.description,category.id],function(err,rows,fields){
                if(err){
                    console.error(err);
                    throw err;
                }
                console.log("Update category done");
            });
    }

};

var deleteById = function(categoryId) {
    if(categoryId) {
        query("DELETE FROM bk_category.t_category_cat WHERE cat_id = $1",
            [categoryId],function(err,rows,fields){
                if(err){
                    console.error(err);
                    throw err;
                }
                console.log("Delete category done");
            });
    }
};

var findAll = function(callback){
    query("SELECT cat_id,cat_name,cat_description,cat_image_path,update_date FROM bk_category.t_category_cat ORDER BY update_date desc",{},function(err,rows,fields){
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
                        description: row.cat_description,
                        imagePath:row.cat_image_path,
                        updateDate:moment(row.update_date).format('DD/MM/YYYY, HH:MM')
                    };
                    categoryList.push(category);
                }
            }
            callback(categoryList);
     });
};

module.exports = {
    add : add,
    update :update,
    deleteById : deleteById,
    findAll :findAll
};
