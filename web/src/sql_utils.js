/// Import sqlitedb.
var sqlitedb = require('./sql_db.js').sqlitedb;
var sqliteDB = new sqlitedb("smart_web.db");

exports.create_table = function () {
    /// create table.
    var createTileTableSql = "create table if not exists tiles(level INTEGER, column INTEGER, row INTEGER, content BLOB);";
    var createLabelTableSql = "create table if not exists labels(level INTEGER, longitude REAL, latitude REAL, content BLOB);";
    sqliteDB.createTable(createTileTableSql);
    sqliteDB.createTable(createLabelTableSql);
}

exports.add_user = function (req, res) {
    /// insert data.
    var tileData = [
        [1, "free@google.com", "13681068236", "free", "2021-05-24 14:25:55"], 
        [2, "abcd@google.com", "13881885663", "abcd", "2020-05-22 12:02:01"], 
        [3, "have@google.com", "13825169235", "have", "2020-03-12 21:16:08"], 
        [4, "good@google.com", "13782124312", "good", "2020-06-21 12:15:36"]
    ];
    var insertTileSql = "insert into user(id, email, mobile, nickname, regtime) values(?, ?, ?, ?, ?)";
    sqliteDB.insert(insertTileSql, tileData);   
}

exports.del_user = function (req, res) {    
}

exports.get_user = function (req, res) {
}

exports.get_users = function (req, res) {
    /// query data.
    var querySql = 'select * from user';
    sqliteDB.query(querySql, dataDeal);
    
    /// update data.
    //var updateSql = 'update tiles set level = 2 where level = 1 and column = 10 and row = 10';
    //sqliteDB.executeSql(updateSql);
    
    //sqliteDB.close();
    
    function dataDeal(objects){
        let data = {
            "users" : objects
        };
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data));
    }
}
 
