echo "请输入commit信息："

read msg

git add .
git commit -a -m "$msg"
git push -u origin master
rsync -avz -4 --exclude-from "/var/www/poimoe/exclude.md" /var/www/poimoe/ root@poimoe.com:/var/www/poimoe/
