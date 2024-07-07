#!/bin/bash

red='\e[0;41m' # 红色
RED='\e[1;31m'
green='\e[0;32m' # 绿色
GREEN='\e[1;32m'
yellow='\e[5;43m' # 黄色
YELLOW='\e[1;33m'
blue='\e[0;34m' # 蓝色
BLUE='\e[1;34m'
purple='\e[0;35m' # 紫色
PURPLE='\e[1;35m'
cyan='\e[4;36m' # 蓝绿色
CYAN='\e[1;36m'
WHITE='\e[1;37m' # 白色

NC='\e[0m' # 没有颜色

app_name=smart_rtmpd

#############################################################
#
# Wellcom ( 欢迎词 )
#
#############################################################

title=$(cat<<EOF
${CYAN}

:'######::'##::::'##::::'###::::'########::'########::::'########::'########:'##::::'##:'########::'########::
'##... ##: ###::'###:::'## ##::: ##.... ##:... ##..::::: ##.... ##:... ##..:: ###::'###: ##.... ##: ##.... ##:
 ##:::..:: ####'####::'##:. ##:: ##:::: ##:::: ##::::::: ##:::: ##:::: ##:::: ####'####: ##:::: ##: ##:::: ##:
. ######:: ## ### ##:'##:::. ##: ########::::: ##::::::: ########::::: ##:::: ## ### ##: ########:: ##:::: ##:
:..... ##: ##. #: ##: #########: ##.. ##:::::: ##::::::: ##.. ##:::::: ##:::: ##. #: ##: ##.....::: ##:::: ##:
'##::: ##: ##:.:: ##: ##.... ##: ##::. ##::::: ##::::::: ##::. ##::::: ##:::: ##:.:: ##: ##:::::::: ##:::: ##:
. ######:: ##:::: ##: ##:::: ##: ##:::. ##:::: ##::::::: ##:::. ##:::: ##:::: ##:::: ##: ##:::::::: ########::
:......:::..:::::..::..:::::..::..:::::..:::::..::::::::..:::::..:::::..:::::..:::::..::..:::::::::........:::

${NC}
EOF
)

brief=$(cat<<EOF
${YELLOW}
/**************************************************************************************************
*                                                                                                 *
*  Copyright (C) 2024 www.qiyicc.com All rights reserved.                                         *
*                                                                                                 *
*  @file     deploy_smart_rtmpd                                                                   *
*  @brief    一键部署 smart_rtmpd 流媒体服务器                                                    *
*  Details.                                                                                       *
*                                                                                                 *
*  @author   FreeABC                                                                              *
*  @email    cwf12345@sina.com                                                                    *
*  @QQ       99766553                                                                             *
*  @WebChat  99766553                                                                             *
*  @github   https://github.com/superconvert/smart_rtmpd                                          *
*  @gitee    https://gitee.com/superconvert/smart_rtmpd                                           *
*  @webadmin https://github.com/superconvert/smart_rtmpd/blob/master/web%20manager/src/README.md  *
*  @version  0.1                                                                                  *
*  @date     2024-07-08                                                                           *
*                                                                                                 *
*-------------------------------------------------------------------------------------------------*
*  Remark         : Description                                                                   *
*-------------------------------------------------------------------------------------------------*
*  Change History :                                                                               *
*  <Date>     | <Version> | <Author>       | <Description>                                        *
*-------------------------------------------------------------------------------------------------*
*  2024-07-08    | 0.1.0     | FreeABC         | 新建文件                                         *
*-------------------------------------------------------------------------------------------------*
*                                                                                                 *
**************************************************************************************************/
${NC}
EOF
)

echo -e "${title}"
echo -e "${brief}"

#############################################################
#
# env check ( 环境检测 )
#
#############################################################
OS_TYPE=/etc/redhat-release

# 端口检测
function env_port() {
    echo ""
    echo -e "${YELLOW}端口检测 ...${NC}"
    rtmp=$(ss -lnp | grep 1935)
    http=$(ss -lnp | grep 8080)
    https=$(ss -lnp | grep 8181)
    rtsp=$(ss -lnp | grep 8554)
    srt=$(ss -lnp | grep 9000)
    sip=$(ss -lnp | grep 5060)
    ims=$(ss -lnp | grep 6666)

    if [[ ${rtmp} ]]; then
        printf "${RED}rtmp  port 被占用${NC}\n"
        exit
    else
        printf "${GREEN}rtmp  port 正常${NC}\n"
    fi

    if [[ ${http} ]]; then
        printf "${RED}http  port 被占用${NC}\n"
        exit
    else
        printf "${GREEN}http  port 正常${NC}\n"
    fi


    if [[ ${https} ]]; then
        printf "${RED}https port 被占用${NC}\n"
        exit
    else
        printf "${GREEN}https port 正常${NC}\n"
    fi


    if [[ ${rtsp} ]]; then
        printf "${RED}rtsp  port 被占用${NC}\n"
        exit
    else
        printf "${GREEN}rtsp  port 正常${NC}\n"
    fi


    if [[ ${srt} ]]; then
        printf "${RED}srt   port 被占用${NC}\n"
        exit
    else
        printf "${GREEN}srt   port 正常${NC}\n"
    fi

    if [[ ${sip} ]]; then
        printf "${RED}sip   port 被占用${NC}\n"
        exit
    else
        printf "${GREEN}sip   port 正常${NC}\n"
    fi

    if [[ ${ims} ]]; then
        printf "${RED}ims   port 被占用${NC}\n"
        exit
    else
        printf "${GREEN}ims   port 正常${NC}\n"
    fi
}

# rpm 包是否存在，不存在则初始化环境
function env_rpm(){
    rpm_name=$1
    var_rpm=$(rpm -qa | grep ${rpm_name})
    if [[ $? -ne 0 || ! -n "${var_rpm}" ]]; then
        yum -y install ${rpm_name}
        if [[ $? -eq 0 ]]; then
            printf "${CYAN}%-16s : ok${NC}\n" ${rpm_name}
        else
            printf "${RED}%-16s : failed${NC}\n" ${rpm_name}
            exit
        fi
    else
        printf "${CYAN}%-16s : ok${NC}\n" ${rpm_name}
    fi
}

# deb 包是否存在，不存在则初始化环境
function env_deb(){

    deb_name=$1
    var_deb=$(dpkg -l | grep ${deb_name})
    if [[ $? -ne 0 || ! -n "${var_deb}" ]]; then
        apt -y install ${deb_name}
        if [[ $? -eq 0 ]]; then
            printf "${CYAN}%-16s : ok${NC}\n" ${deb_name}
        else
            printf "${RED}%-16s : failed${NC}\n" ${deb_name}
            exit
        fi
    else
        printf "${CYAN}%-16s : ok${NC}\n" ${deb_name}
    fi
}

############################################################
#
# download ( 下载软件包 )
#
############################################################
function download(){
    echo ""
    echo -e "${YELLOW}下载软件包 ...${NC}"

    os_name=$1
    rm tmp -rf && mkdir tmp && cd tmp
    curl -o smart_rtmpd.zip http://www.qiyicc.com/download/rtmpd.zip

    echo ""
    echo -e "${YELLOW}正在部署环境 ...${NC}"
    unzip smart_rtmpd.zip
    if [ ${os_name} = 'ubuntu' ]; then
        bin_name=smart_rtmpd.multithread.ubuntu16.04LTS.x64.tar.gz
    else
        bin_name=smart_rtmpd.multithread.centos7.7.1908.x64.tar.gz
    fi
    mv rtmpd/${bin_name} ./
    rm smart_rtmpd.zip rtmpd -rf
    mkdir smart_rtmpd
    tar zxf ${bin_name} -C smart_rtmpd
    rm ${bin_name} -rf
    rm /opt/smart_rtmpd -rf
    mv smart_rtmpd /opt/
    cd ..
    rm tmp -rf

}

############################################################
#
# run_server (准备运行环境)
#
############################################################

cat > start_rtmpd.sh << 'EOF'
#!/bin/sh
cd /opt/smart_rtmpd/
nohup ./run_rtmpd.sh > /dev/null 2>&1 &
EOF

cat > stop_rtmpd.sh << 'EOF'
#!/bin/sh

# 停止监听进程
server=`ps aux | grep ./run_rtmpd.sh | grep -v grep | awk -F ' ' '{print $2}'`
if [ "$server" ]; then
    kill -9 $server
fi

# 停止流媒体服务器 smart_rtmpd
server=`ps aux | grep ./smart_rtmpd | grep -v grep | awk -F ' ' '{print $2}'`
if [ "$server" ]; then
    kill -9 $server
fi

EOF

cat > run_rtmpd.sh << 'EOF'
#!/bin/sh

cd /opt/smart_rtmpd

# 添加本地执行路径
export LD_LIBRARY_PATH=./

while true; do
    # 启动一个循环，定时检查进程是否存在
    server=`ps aux | grep ./smart_rtmpd | grep -v grep`
    if [ ! "$server" ]; then
        # 如果不存在就重新启动
        ./smart_rtmpd -d
        sleep 5
    fi
    sleep 3
done
EOF


function runserver(){
    echo ""
    echo -e "${YELLOW}准备启动 smart rtmpd 流媒体服务器 ...${NC}"
    chmod +x start_rtmpd.sh && mv start_rtmpd.sh /opt/smart_rtmpd/
    chmod +x run_rtmpd.sh && mv run_rtmpd.sh /opt/smart_rtmpd/
    chmod +x stop_rtmpd.sh && mv stop_rtmpd.sh /opt/smart_rtmpd/
    /opt/smart_rtmpd/start_rtmpd.sh
    
    i=0
    while [ $i -le 6 ]
    do
       let i++
       sleep 1 
       echo -e "${CYAN}please waiting.${NC}"
    done

    state=$(ss -lnp | grep 1935)
    if [[ ${state} ]]; then
        printf "${GREEN}启动成功!!!${NC}\n"
    else
        printf "${RED}启动失败!!!${NC}\n"
    fi
    echo -e "${PURPLE}您的服务器工作目录是: /opt/smart_rtmpd ${NC}"
    echo -e "${PURPLE}您的服务器启动脚本是: /opt/smart_rtmpd/start_rtmpd.sh ${NC}"
    echo -e "${PURPLE}您的服务器停止脚本是: /opt/smart_rtmpd/stop_rtmpd.sh ${NC}"
}

############################################################
#
# 主函数 ( CentOS )
#
############################################################
function deploy_centos() {
    echo -e "${YELLOW}基本环境检测 ...${NC}"
    env_rpm tar
    env_rpm unzip
    env_port
    download centos
    runserver
}

############################################################
#
# 主函数 ( Ubuntu )
#
############################################################
function deploy_ubuntu() {
    echo -e "${YELLOW}基本环境检测 ...${NC}"
    env_deb tar
    env_deb unzip
    env_port
    download ubuntu
    runserver
}

if [ -f "$OS_TYPE" ];then
    if [[ `cat /etc/redhat-release` =~ $C ]];then
        deploy_centos
        exit
     fi
fi

deploy_ubuntu
