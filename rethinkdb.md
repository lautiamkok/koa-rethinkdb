RethinkDB
===========

# Installation

```
$ source /etc/lsb-release && echo "deb http://download.rethinkdb.com/apt $DISTRIB_CODENAME main" | sudo tee /etc/apt/sources.list.d/rethinkdb.list
$ wget -qO- https://download.rethinkdb.com/apt/pubkey.gpg | sudo apt-key add -
$ sudo apt-get update -o Acquire::ForceIPv4=true
$ sudo apt-get install rethinkdb -o Acquire::ForceIPv4=true
```

Test:

```
$ rethinkdb -v
rethinkdb 2.3.6~0zesty (GCC 5.4.1)
```

# Starting the server

```
$ rethinkdb
Recursively removing directory /home/lau/rethinkdb_data/tmp
Initializing directory /home/lau/rethinkdb_data
Running rethinkdb 2.3.6~0zesty (GCC 5.4.1)...
Running on Linux 4.10.0-33-generic x86_64
Loading data from directory /home/lau/rethinkdb_data
Listening for intracluster connections on port 29015
Listening for client driver connections on port 28015
Listening for administrative HTTP connections on port 8080
Listening on cluster addresses: 127.0.0.1, 127.0.1.1, ::1
Listening on driver addresses: 127.0.0.1, 127.0.1.1, ::1
Listening on http addresses: 127.0.0.1, 127.0.1.1, ::1
To fully expose RethinkDB on the network, bind to all addresses by running rethinkdb with the `--bind all` command line option.
Server ready, "lau_desktop_nfj" 228933a8-51d6-48ba-a0bc-f7575dccc363
```

By default, this server will only listen for local connections, which means that clients on other machines won't be able to access the database (for security purposes). If you want global access, you can bind to all IPs with the option:

```
$ rethinkdb --bind all
```

https://www.rethinkdb.com/docs/cli-options/
https://www.rethinkdb.com/docs/start-a-server/

# Run some queries

https://rethinkdb.com/docs/quickstart/

# Start RethinkDB at system startup: Startup with systemd

```
$ sudo cp /etc/rethinkdb/default.conf.sample /etc/rethinkdb/instances.d/instance1.conf
$ sudo vim /etc/rethinkdb/instances.d/instance1.conf
$ sudo /etc/init.d/rethinkdb restart
rethinkdb: instance1: Waiting for instance to stop (pid 1098) .... Stopped.
rethinkdb: instance1: will only listen on local network interfaces.
rethinkdb: instance1: To expose rethinkdb on the network, add the 'bind=all' option to /etc/rethinkdb/instances.d/instance1.conf
rethinkdb: instance1: Starting instance. (logging to `/var/lib/rethinkdb/instance1/data/log_file')
```

To stop:

```
$ sudo /etc/init.d/rethinkdb restart
```

https://www.rethinkdb.com/docs/start-on-startup/
https://www.rethinkdb.com/docs/start-on-startup/#startup-with-initd
http://eye-solution.vn/docs/others/NodeJS+RethinkDB-Server-Guide/
https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-rethinkdb-on-an-ubuntu-12-04-vps

# Install client drivers

$ npm install rethinkdb

# Usage

```
r = require('rethinkdb')
r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
  if(err) throw err;
  r.db('test').tableCreate('tv_shows').run(conn, function(err, res) {
    if(err) throw err;
    console.log(res);
    r.table('tv_shows').insert({ name: 'Star Trek TNG' }).run(conn, function(err, res)
    {
      if(err) throw err;
      console.log(res);
    });
  });
});
```

# RethinkDB Administration Interfaces: The web interface

You can access it at:

```
http://localhost:8080
```

# Third-party administration tools: Chateau

1. Download Chateau at https://github.com/neumino/chateau

2. Install its dependencies

```
$ npm install
```

3. Start the server

```
$ ./bin/chateau
```

4. Access the admin at http://127.0.0.1:3333/

http://docs.rethinkdb.com/2.1/docs/third-party-admin-tools/
https://softwarerecs.stackexchange.com/questions/23318/desktop-native-graphical-db-management-tool-for-rethinkdb
https://codehangar.io/rethinkdb-data-management-made-easy-with-reqlpro-admin-gui/

# SQL to ReQL cheat sheet

https://rethinkdb.com/docs/sql-to-reql/javascript/

# References

* https://www.rethinkdb.com/docs/install/ubuntu/
* https://www.rethinkdb.com/docs/start-a-server/
* https://www.rethinkdb.com/docs/install-drivers/javascript/
* https://www.pluralsight.com/guides/nosql-databases/a-practical-introduction-to-rethinkdb
* https://github.com/pluralsight/guides/blob/master/published/nosql-databases/a-practical-introduction-to-rethinkdb/article.md
* https://www.rethinkdb.com/docs/rethinkdb-vs-mongodb/
* https://www.codementor.io/rudrakshmk/mongodb-vs-rethinkdb-du1082cio
* https://www.amon.cx/blog/rethinkdb-reviewed-by-a-mongo-fan/
* https://en.wikipedia.org/wiki/RethinkDB
