echo "请输入commit信息："

read msg

git commit -a -m "$msg"
git push -u origin master
rsync -avz -4 --exclude=".git" /var/www/poimoe/ root@poimoe.com:/var/www/poimoe/
