const os = require('os');
const diskinfo = require('diskinfo');

//cpu架构
const arch = os.arch();
//操作系统内核
const kernel = os.type();
//操作系统平台
const pf = os.platform();
//系统开机时间
const uptime = os.uptime();
//主机名
const hn = os.hostname();
//主目录
const hdir = os.homedir();
//内存大小
const totalMem = os.totalmem();
// 内存空闲
const freeMem = os.freemem();
// 系统负载
const loadaverage = os.loadavg()
//cpu
const cpus = os.cpus();
// 网卡列表
const networksObj = os.networkInterfaces();

var dealTime = (seconds)=>{
    var seconds = seconds|0;
    var day = (seconds/(3600*24))|0;
    var hours = ((seconds-day*24*3600)/3600)|0;
    var minutes = ((seconds-day*3600*24-hours*3600)/60)|0;
    var second = seconds%60;
    (day<10)&&(day='0'+day);
    (hours<10)&&(hours='0'+hours);
    (minutes<10)&&(minutes='0'+minutes);
    (second<10)&&(second='0'+second);
    return [day,hours,minutes,second].join(':');
};
 
var dealMem = (mem)=>{
    var G = 0,
        M = 0,
        KB = 0;
    (mem>(1<<30))&&(G=(mem/(1<<30)).toFixed(2));
    (mem>(1<<20))&&(mem<(1<<30))&&(M=(mem/(1<<20)).toFixed(2));
    (mem>(1<<10))&&(mem>(1<<20))&&(KB=(mem/(1<<10)).toFixed(2));
    return G>0?G+'G':M>0?M+'M':KB>0?KB+'KB':mem+'B';
};

var diskInfo = [];

exports.get_os_info = async function() {	
	let os_info = {}
	
	/*
	console.log("cpu架构："+arch);
	console.log("操作系统内核："+kernel);
	console.log("平台："+pf);
	console.log("开机时间："+ dealTime(uptime));
	console.log("主机名："+hn);	
	console.log("主目录："+hdir);
	console.log("内存大小："+dealMem(totalMem));
	console.log("空闲内存："+dealMem(freeMem));
	//console.log("系统负载: 1分钟, 5分钟，15分钟 - " + loadaverage.join(':'));
	console.log(loadaverage);
	console.log('*****cpu信息*******');
	*/
	
	let cpuinfo = [];
	cpus.forEach((cpu,idx,arr)=>{
		var times = cpu.times;
		/*
		console.log(`cpu${idx}：`);
		console.log(`型号：${cpu.model}`);
		console.log(`频率：${cpu.speed}MHz`);
		console.log(`使用率：${((1-times.idle/(times.idle+times.user+times.nice+times.sys+times.irq))*100).toFixed(2)}%`);		
		*/
		var cpudata = {};
		cpudata['type'] = cpu.model;
		cpudata['speed'] = cpu.speed + ' MHz';
		cpudata['used'] = ((1-times.idle/(times.idle+times.user+times.nice+times.sys+times.irq))*100).toFixed(2);
		cpuinfo.push(cpudata);
	});
	//网卡
	//console.log('*****网卡信息*******');
	let network = [];
	for(let nw in networksObj){
	    let objArr = networksObj[nw];
		// console.log(`\r\n${nw}：`);
	    objArr.forEach((obj,idx,arr)=>{
			/*
		    console.log(`地址：${obj.address}`);
			console.log(`掩码：${obj.netmask}`);
	        console.log(`物理地址：${obj.mac}`);
		    console.log(`协议族：${obj.family}`);
			*/
			let netcard = {}
			netcard["ip"] = obj.address;
			netcard["mask"] = obj.netmask;
			netcard["mac"] = obj.mac;
			netcard["type"] = obj.family;
			network[idx] = netcard;
		});
	}

	os_info["cpu_arch"] = arch;
	os_info["os_type"] = kernel;
	os_info["os_platform"] = pf;
	os_info["run_time"] = dealTime(uptime); 
	os_info["mem_size"] = dealMem(totalMem);
	os_info["mem_free"] = dealMem(freeMem);
	os_info["cpu_average"] = loadaverage;
	os_info["cpu_info"] = cpuinfo;
	os_info["net_interface"] = network;

	function get_disk_info() {
		return new Promise((resolve, reject) => {
			if ( diskInfo.length ) {
				  resolve(diskInfo);
			} else {
				diskinfo.getDrives((err, aDrives)=>{					
					for (var i = 0; i < aDrives.length; i++) {
						 let dk = {};
						 //盘符号
						 var mounted = aDrives[i].mounted;
						 //总量
						 var total = (aDrives[i].blocks /1024 /1024 /1024).toFixed(0) + " GB";
						 //已使用
						 var used = (aDrives[i].used /1024 /1024 /1024).toFixed(0) + " GB";
						 //可用
						 var available = (aDrives[i].available /1024 /1024 /1024).toFixed(0) + " GB";
						 //使用率
						 var capacity = aDrives[i].capacity;
						 dk["mounted"] = mounted;
						 dk["total"] = total;
 						 dk["used"] = used;
 						 dk["available"] = available;
						 dk["capacity"] = capacity;
						 diskInfo[i] = dk;
					}
					resolve(diskInfo);
				});
			}});

			
	}

	os_info["disk_info"] = await get_disk_info();	
	//console.log(JSON.stringify(os_info, null, 4));
	return os_info;	
}

exports.get_os_platform = function () {
	return pf.toLowerCase() ;
}