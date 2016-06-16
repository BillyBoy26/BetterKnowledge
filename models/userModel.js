var query = require('./connexionPostgres');

var findUser = function(loginInfos, callback) {
    if(loginInfos) {
        query("SELECT * FROM bk_user.t_user_usr WHERE usr_mail = $1 AND usr_password = $2",
            [loginInfos.email, loginInfos.password],function(err,rows,fields){
                if(err){
                    console.error(err);
                    throw err;
                }
                console.log("Search user done");
                if(rows.length > 0){
                    var row = rows[0];
                    var user = {
                        id: row.usr_id,
                        name: row.usr_name,
                        firstname: row.usr_firstname,
                        displayName : row.usr_firstname + " " + row.usr_name,
                        email:row.usr_mail
                    };
                    callback(user);
                }
                else{
                    callback(null);
                }
            });
    }
};

var findUserById = function(userId, callback) {
    if(userId) {
        query("SELECT * FROM bk_user.t_user_usr WHERE usr_id = $1",
            [userId],function(err,rows,fields){
                if(err){
                    console.error(err);
                    throw err;
                }
                console.log("Search user by id done");
                if(rows && rows.lenght>0){
                    var row = rows[0];
                    var user = {
                        id: row.usr_id,
                        name: row.usr_name,
                        firstname: row.usr_firstname,
                        email:row.usr_mail
                    };
                    callback(user);
                }
                else
                {
                    callback(null);
                }
            });
    }
};

var createUserFromOauth = function(user){
    if(user){
        query("INSERT into bk_user.t_user_usr(usr_id,usr_name, usr_firstname, usr_mail, usr_profil_picture, usr_provider) " +
            "VALUES($1,$2,$3,$4,$5,$6)",[user.id,user.name,user.firstname,user.email,user.profilPicture,user.provider], function(err,rows,fields){
            if(err){
                console.error(err);
                throw err;
            }
            console.log("User created");
        });
    }
};

var createUser = function(user){
    if(user){
        query("INSERT into bk_user.t_user_usr(usr_name, usr_firstname, usr_mail, usr_password,usr_provider) " +
            "VALUES($1,$2,$3,$4,$5)",[user.name,user.firstname,user.email,user.password,'BetterKnowledge'], function(err,rows,fields){
            if(err){
                console.error(err);
                throw err;
            }
            console.log("User created");
        });
    }
};

module.exports = {
    findUser : findUser,
    findUserById : findUserById,
    createUserFromOauth : createUserFromOauth,
    createUser : createUser
};