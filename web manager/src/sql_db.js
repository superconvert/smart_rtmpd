var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
 
var db = db || {};
 
/// 
db.sqlitedb = function(file) {
	db.db = new sqlite3.Database(file); 
    db.exist = fs.existsSync(file);
    if ( !db.exist ) {
		fs.openSync(file, 'w');
    };
};
 
/// print error
db.print_error = function(err) {
	console.log("error msg: " + err.message + ", error no: " + err.errno);
};
 
/// create table
db.sqlitedb.prototype.create_table = function(sql) {
	db.db.serialize(function() {
		db.db.run(sql, function(err) {
			if ( null != err ) {
                db.print_error(err);
                return;
            }
        });
    });
};
 
/// tilesData format; [[level, column, row, content], [level, column, row, content]]
db.sqlitedb.prototype.insert = function(sql, objects) {
	db.db.serialize(function() {
		var stmt = db.db.prepare(sql);
        for (var i = 0; i < objects.length; ++i) {
            stmt.run(objects[i]);
        }
    
        stmt.finalize();
    });
};
 
/// query sql
db.sqlitedb.prototype.query = function(sql, callback) {
	db.db.all(sql, function(err, rows) {
        if (null != err) {
			callback(1, err);
            return;
        }
 
        if (callback ) {
            callback(0, rows);
        }
    });
};
 
/// execute sql
db.sqlitedb.prototype.execute = function(sql, callback) {
    db.db.run(sql, function(err) {
        if (null != err) {
            callback(1, err);
			return;
        }
		callback(0, null);
    });
};
 
/// close db
db.sqlitedb.prototype.close = function() {
    db.db.close();
};

/// export db
exports.sqlitedb = db.sqlitedb;
