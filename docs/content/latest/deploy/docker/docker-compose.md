---
title: Docker
linkTitle: Docker
description: Docker
aliases:
 - /admin/docker-compose/
 - /latest/admin/docker-compose/
menu:
  latest:
    parent: deploy
    name: Docker
    identifier: docker-2-compose
    weight: 625
type: page
isTocNested: false
showAsideToc: true
---

<ul class="nav nav-tabs-alt nav-tabs-yb">
  <li >
    <a href="/latest/deploy/docker/docker-swarm" class="nav-link">
      <i class="fas fa-layer-group"></i>
      Docker Swarm
    </a>
  </li>
  <li>
    <a href="/latest/deploy/docker/docker-compose" class="nav-link active">
      <i class="fab fa-docker" aria-hidden="true"></i>
      Docker Compose
    </a>
  </li>
</ul>

Use [docker-compose](https://docs.docker.com/compose/overview/) utility to create and manage YugabyteDB local clusters. Note that this approach is not recommended for multi-node clusters used for performance testing and production environments.

## 1. Create a single node cluster

### Pull the container

Pull the container from Docker Hub registry.

```sh
$ docker pull yugabytedb/yugabyte
```

### Create a `docker-compose.yaml` file

<div class='copy'></div>

```sh
version: '2'

volumes:
  yb-master-data-1:
  yb-tserver-data-1:

services:
  yb-master:
      image: yugabytedb/yugabyte:latest
      container_name: yb-master-n1
      volumes:
      - yb-master-data-1:/mnt/master
      command: [ "/home/yugabyte/bin/yb-master",
                "--fs_data_dirs=/mnt/master",
                "--master_addresses=yb-master-n1:7100",
                "--rpc_bind_addresses=yb-master-n1:7100",
                "--replication_factor=1"]
      ports:
      - "7000:7000"
      environment:
        SERVICE_7000_NAME: yb-master

  yb-tserver:
      image: yugabytedb/yugabyte:latest
      container_name: yb-tserver-n1
      volumes:
      - yb-tserver-data-1:/mnt/tserver
      command: [ "/home/yugabyte/bin/yb-tserver",
                "--fs_data_dirs=/mnt/tserver",
                "--start_pgsql_proxy",
                "--rpc_bind_addresses=yb-tserver-n1:9100",
                "--tserver_master_addrs=yb-master-n1:7100"]
      ports:
      - "9042:9042"
      - "6379:6379"
      - "5433:5433"
      - "9000:9000"
      environment:
        SERVICE_5433_NAME: ysql
        SERVICE_9042_NAME: ycql
        SERVICE_6379_NAME: yedis
        SERVICE_9000_NAME: yb-tserver
      depends_on:
      - yb-master
```

### Start the cluster

```sh
$ docker-compose -f ./docker-compose.yaml up -d
```

## 2. Initialize the APIs

YCQL and YSQL APIs are enabled by default on the cluster.

Optionally, you can enable YEDIS API by running the following command.

```sh
$ docker exec -it yb-master-n1 /home/yugabyte/bin/yb-admin --master_addresses yb-master-n1:7100 setup_redis_table
```


## 3. Test the APIs

Clients can now connect to the YSQL API at localhost:5433, YCQL API at localhost:9042 and YEDIS API at localhost:6379. The yb-master admin service is available at http://localhost:7000.

For example,
```sh
$ ysqlsh -h localhost -p 5433
ysqlsh (11.2-YB-2.0.11.0-b0)
Type "help" for help.

yugabyte=# CREATE TABLE foo(bar INT PRIMARY KEY);
CREATE TABLE
yugabyte=#
```

Here is an example of a client that is defined within the same Docker Compose file.
```sh
version: '2'

volumes:
  yb-master-data-1:
  yb-tserver-data-1:

networks:
  dbinternal:
  dbnet:

services:
  yb-master:
      image: yugabytedb/yugabyte:latest
      container_name: yb-master-n1
      networks:
      - dbinternal
      volumes:
      - yb-master-data-1:/mnt/master
      command: [ "/home/yugabyte/bin/yb-master",
                "--fs_data_dirs=/mnt/master",
                "--master_addresses=yb-master-n1:7100",
                "--rpc_bind_addresses=yb-master-n1:7100",
                "--replication_factor=1"]
      ports:
      - "7000:7000"
      environment:
        SERVICE_7000_NAME: yb-master

  yb-tserver:
      image: yugabytedb/yugabyte:latest
      container_name: yb-tserver-n1
      networks:
      - dbinternal
      - dbnet
      volumes:
      - yb-tserver-data-1:/mnt/tserver
      command: [ "/home/yugabyte/bin/yb-tserver",
                "--fs_data_dirs=/mnt/tserver",
                "--start_pgsql_proxy",
                "--rpc_bind_addresses=yb-tserver-n1:9100",
                "--tserver_master_addrs=yb-master-n1:7100"
                ]
      ports:
      - "9042:9042"
      - "6379:6379"
      - "5433:5433"
      - "9000:9000"
      environment:
        SERVICE_5433_NAME: ysql
        SERVICE_9042_NAME: ycql
        SERVICE_6379_NAME: yedis
        SERVICE_9000_NAME: yb-tserver
      depends_on:
      - yb-master

  yb-client:
      image: yugabytedb/yb-sample-apps:latest
      container_name: yb-client-n1
      networks:
      - dbnet
      command: [ "--workload", "SqlInserts", "--nodes", "yb-tserver-n1:5433" ]
      depends_on:
      - yb-tserver
```

For more examples, follow the instructions in the [Quick Start](../../../quick-start/explore-ysql/#docker) section with Docker.

## 4. Stop the cluster

```sh
$ docker-compose -f ./docker-compose.yaml down
```
