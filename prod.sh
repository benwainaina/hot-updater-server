serviceName="hot-updater-server"
pm2 stop $serviceName
pm2 delete $serviceName

pm2 start npm --name $serviceName -- run start
echo "Server started"
