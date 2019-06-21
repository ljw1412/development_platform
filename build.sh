#! /bin/bash
cur_dateTime="`date +%Y-%m-%d_%H:%m:%s`"  
echo "开始打包研发管理平台 $cur_dateTime"
echo '正在更新依赖...'
yarn
echo '正在打包...'
yarn build
echo '打包成功！'

publishPath="/home/www/platform"

if [ ! -d $publishPath ];then
echo "$publishPath 文件夹不存在，开始创建"
mkdir $publishPath
else
echo "发现 $publishPath 文件夹"
fi
echo '开始发布'
cp -r dist/* $publishPath