# Control Center
A central dashboard for monitoring/controlling Dev, Stage and Production instances

## Installation - Ubuntu

### Install NodeJS 5.2.x

```
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Install Forever Globally**
```
> npm install forever -g
```

### Rethink DB (Latest)

```
source /etc/lsb-release && echo "deb http://download.rethinkdb.com/apt $DISTRIB_CODENAME main" | sudo tee /etc/apt/sources.list.d/rethinkdb.list
wget -qO- https://download.rethinkdb.com/apt/pubkey.gpg | sudo apt-key add -
sudo apt-get update
sudo apt-get install rethinkdb
```

## Starting up the app 

Start RethinkDB
```
> rethinkdb --bind all
```

Start Node using forever
```
> cd /var/www
> mkdir conrol_center
> cd control_center
> git clone https://github.com/erickmarsh/control_center.git . 
> npm install
> forever app.js
```

