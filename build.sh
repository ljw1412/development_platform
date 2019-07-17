#! /bin/bash
cur_dateTime="`date +%Y-%m-%d_%H:%m:%s`"  
echo "开始打包研发管理平台 $cur_dateTime"
echo '正在更新依赖...'
yarn
echo '正在打包...'
yarn build
echo '打包成功！'

publishPath="/home/services/development_platform_server/public"

if [ ! -d $publishPath ];then
echo "$publishPath 文件夹不存在，开始创建"
mkdir -p $publishPath
else
echo "发现 $publishPath 文件夹"
fi
echo '开始发布'
cp -r dist/* $publishPath
echo '====== <研发管理平台>发布完成 ====='