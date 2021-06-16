'use strict';

/// Import sqlitedb.
const crypto = require('crypto');
const date = require('silly-datetime');
const config = require('./config');
const sqlitedb = require('./sql_db.js').sqlitedb;
var sqliteDB = new sqlitedb("smart_web.db");

// ----------------------------------------------------------
// 创建表
// ----------------------------------------------------------
function create_table () {
    /// create table.
    var createTileTableSql = "create table if not exists tiles(level INTEGER, column INTEGER, row INTEGER, content BLOB);";
    var createLabelTableSql = "create table if not exists labels(level INTEGER, longitude REAL, latitude REAL, content BLOB);";
    sqliteDB.createTable(createTileTableSql);
    sqliteDB.createTable(createLabelTableSql);
}

// ----------------------------------------------------------
// 加密密码
// ----------------------------------------------------------
function crypt_passwd (password) {
    var md5 = crypto.createHash('md5');
	return md5.update(password).digest('hex');
}

// ----------------------------------------------------------
// 添加用户
// ----------------------------------------------------------
function add_user (req, res) {
		
	var querySql = 'select max(id) from user';
	sqliteDB.query(querySql, query_data);
	
	function query_data( objects ) {
		var id = 1;
		var user = req.body;		
		var email = user["email"];
		var mobile = user["mobile"];
		var nickname = user["nickname"];
		var regtime = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
		var passwd = crypt_passwd(crypt_passwd('123456'));
		if (objects[0]['max(id)'] != null) {
			id = objects[0]['max(id)']+1;
		}
		var tileData = [
			[id, email, mobile, nickname, regtime, passwd], 
		];
		var insertTileSql = "insert into user(id, email, mobile, nickname, regtime, passwd) values(?, ?, ?, ?, ?, ?)";
		sqliteDB.insert(insertTileSql, tileData);        
		var data = {
			"code": 0,
			"msg": "ok",
			"data": JSON.parse("{}")
		};
	    res.setHeader('Content-Type', 'application/json');
		res.send(data);
	}
}

// ----------------------------------------------------------
// 删除用户
// ----------------------------------------------------------
function del_user (req, res) {
	var userid = req.body["user"];
	for (var i = 0; i < userid.length; i++) {
		var delSql = "delete from user where id=" + userid[i];
		sqliteDB.execute(delSql);
	}
	
	var data = {
		"code": 0,
		"msg": "ok",
		"data": JSON.parse("{}")
	};
    res.setHeader('Content-Type', 'application/json');
	res.send(data);
}

// ----------------------------------------------------------
// 修改用户或密码
// ----------------------------------------------------------
function mdf_user (req, res) {
	
	var user = req.body;
	var updateSql = '';
	console.log(user);
	// 更改信息
	if ( user['mobile'] || user['email'] ) {
		updateSql = 'update user set mobile=\'' + user['mobile'] + '\', ' + 
			'email=\'' + user['email'] + '\', ' + 'nickname=\'' + user['nickname'] + '\' ';
		updateSql = updateSql + 'where id=' + user['id'];
		console.log(updateSql);
		sqliteDB.execute(updateSql);
		var data = {
			"code": 0,
			"msg": "ok",
			"data": JSON.parse("{}")
		};
	    res.setHeader('Content-Type', 'application/json');
		res.send(data);
	// 更改密码
	} else {
		var querySql = 'select passwd from user where id=' + user['id'];
		sqliteDB.query(querySql, query_data);	
		function query_data( objects ) {
			var data = {};
			if ( objects[0]['passwd'] == null || objects[0]['passwd'] != user['oldpwd'] ) {
				data["code"] = 1;
				data["msg"] = "bad old password";
			} else {
				var updateSql = "update user set passwd='" + user['newpwd'] + "'";
				sqliteDB.execute(updateSql);        
				data["code"] = 0,
				data["msg"] = "ok",
				data["data"] = JSON.parse("{}");
			}
		    res.setHeader('Content-Type', 'application/json');
			res.send(data);
		}
	}
}

// ----------------------------------------------------------
// 用户授权
// ----------------------------------------------------------
function auth_user (req, res) {
	var user = req.body;
	console.log(user);
	var token = user['id'] + '-' + user['type'] + '-' + user['begin'] + '-' + user['end'];
	token = crypt_passwd ( crypt_passwd ( token ) ) ;

	var tileData = [
		[user['id'], user['type'], user['begin'], user['end'], token], 
	];
	var insertTileSql = "insert into service(id, type, begin, end, salt) values(?, ?, ?, ?, ?)";
	sqliteDB.insert(insertTileSql, tileData);
	var data = {
		"code": 0,
		"msg": "ok",
		"data": JSON.parse("{}")
	};
	res.setHeader('Content-Type', 'application/json');
	res.send(data);	
	console.log(data);
}

// ----------------------------------------------------------
// 查询授权
// ----------------------------------------------------------
function auth_query (req, res) {

	var user = req.query['id'];
	var querySql = 'select type, begin, end, salt from service where id=' + user;
	sqliteDB.query(querySql, query_data);
    
	function query_data(objects) {
		var auth = [];
		for (var i = 0; i < objects.length; i++) {
			var info = {};
			info['id'] = parseInt(user);
			info['type'] = objects[i]['type'];
			info['begin'] = objects[i]['begin'];
			info['end'] = objects[i]['end'];
			info['token'] = objects[i]['salt'];
			auth[i] = info ;		
		}
		var data = {
			"code": 0,
			"msg": "ok",
			"data": auth
		};
		res.setHeader('Content-Type', 'application/json');
	    res.send(JSON.stringify(data));
	}
}

// ----------------------------------------------------------
// 查找用户
// ----------------------------------------------------------
function find_user (req, res) {
	var kw = req.query['keyword'];
	var querySql = "select * from user where id like '" + kw + "%' or email like '%" + 
		kw + "%'" + " or mobile like '" + kw + "%' or nickname like '%s" + kw + "%'";
	sqliteDB.query(querySql, query_data); 
	function query_data(objects){
		var data = {
			"code": 0,
			"msg": "ok",
			"data": objects
		};
	    res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(data));
	}
}

// ----------------------------------------------------------
// 取消授权
// ----------------------------------------------------------
function auth_del (req, res) {

	var user = req.query['id'];
	var querySql = 'delete from service where id=' + user;
	sqliteDB.query(querySql, query_data);
    
	function query_data(objects) {
		var data = {
			"code": 0,
			"msg": "ok"
		};
		res.setHeader('Content-Type', 'application/json');
	    res.send(JSON.stringify(data));
	}	
}

// ----------------------------------------------------------
// 获取用户
// ----------------------------------------------------------
exports.get_user = function (req, res) {

	if ( req.query["cmd"] ) {
		// 添加用户
		if ( req.query["cmd"] == "add" ) {
			add_user ( req, res ) ;
		// 删除用户
		} else if ( req.query["cmd"] == "del" ) {
			del_user ( req, res ) ;
		// 授权用户
		} else if ( req.query["cmd"] == "auth" ) {
			auth_query ( req, res ) ;
		// 查找用户
		} else if ( req.query["cmd"] == "find" ) {
			find_user ( req, res ) ;		
		// 修改用户信息
		} else if ( req.query["cmd"] == "modify" ) {
			mdf_user ( req, res ) ;
		// 错误处理
		} else {
	        var data = {
				"code": 1,
				"msg": "not found query param",
				"data": JSON.parse('{}')
			};
	        res.setHeader('Content-Type', 'application/json');
		    res.send(JSON.stringify(data));			
		}
	// 分页用户列表
	} else {
		var page = req.query['page'];
		var limit = req.query['limit'];
		var querySql = 'select * from user limit ' + page * limit + ',' + limit ;
	    sqliteDB.query(querySql, query_data);    
	    function query_data(objects){
	        var data = {
				"code": 0,
				"msg": "ok",
				"data": objects
			};
	        res.setHeader('Content-Type', 'application/json');
		    res.send(JSON.stringify(data));
		}
	}
}

// ----------------------------------------------------------
// 设置用户
// ---------------------------------------------------------- 
exports.set_user = function (req, res) {

	if ( req.query["cmd"] ) {
		// 添加用户
		if ( req.query["cmd"] == "add" ) {
			add_user ( req, res ) ;
		// 删除用
		} else if ( req.query["cmd"] == "del" ) {
			del_user ( req, res ) ;
		} else if ( req.query["cmd"] == "auth" ) {
			// 取消授权
			if ( req.query["id"] ) {
				auth_del ( req, res ) ;
			// 产生授权
			} else {
 			    auth_user ( req, res ) ;
			}
		// 修改用户
		} else if ( req.query["cmd"] == "modify" ) {
			mdf_user ( req, res ) ;
		// 错误返回
		} else {
	        var data = {
				"code": 1,
				"msg": "not found query param",
				"data": JSON.parse('{}')
			};
	        res.setHeader('Content-Type', 'application/json');
		    res.send(JSON.stringify(data));			
		}

	} else {
		
	
	}
}
