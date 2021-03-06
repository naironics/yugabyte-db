---
title: YCSB
linkTitle: YCSB
description: YCSB
image: /images/section_icons/architecture/concepts.png
headcontent: Benchmark YugabyteDB using YCSB.
menu:
  latest:
    identifier: ycsb
    parent: benchmark
    weight: 740
aliases:
  - /benchmark/ycsb/
showAsideToc: True
isTocNested: True
---

{{< note title="Note" >}}

For more information about YCSB see: 

* YCSB Wiki: https://github.com/brianfrankcooper/YCSB/wiki
* Workload info: https://github.com/brianfrankcooper/YCSB/wiki/Core-Workloads

{{< /note >}}

<ul class="nav nav-tabs-alt nav-tabs-yb">

  <li >
    <a href="/latest/benchmark/ycsb" class="nav-link active">
      <i class="icon-postgres" aria-hidden="true"></i>
      YSQL
    </a>
  </li>

  <li >
    <a href="/latest/benchmark/ycsb-ycql" class="nav-link">
      <i class="icon-cassandra" aria-hidden="true"></i>
      YCQL
    </a>
  </li>

</ul>

## Step 1. Download the YCSB binaries

You can do this by running the following commands.

```sh
cd $HOME
wget https://github.com/yugabyte/YCSB/releases/download/1.0/ycsb.tar.gz
tar -zxvf ycsb.tar.gz
cd YCSB
```

## Step 2. Start your database
Start the database using steps mentioned here: https://docs.yugabyte.com/latest/quick-start/explore-ysql/.

## Step 3. Configure your database
Create the Database and table using the ysqlsh tool.
The ysqlsh tool is distributed as part of the database package.

```sh
bin/ysqlsh -h <ip> -c 'create database ycsb;'
bin/ysqlsh -h <ip> -d ycsb -c 'CREATE TABLE usertable (YCSB_KEY VARCHAR(255) PRIMARY KEY, FIELD0 TEXT, FIELD1 TEXT, FIELD2 TEXT, FIELD3 TEXT, FIELD4 TEXT, FIELD5 TEXT, FIELD6 TEXT, FIELD7 TEXT, FIELD8 TEXT, FIELD9 TEXT);'
```

## Step 4. Configure YCSB connection properties

Set the following connection configurations in db.properties:

```sh
db.driver=org.postgresql.Driver
db.url=jdbc:postgresql://<ip>:5433/ycsb;
db.user=yugabyte
db.passwd=
```

The other configuration parameters, are described in detail at [this page](https://github.com/brianfrankcooper/YCSB/wiki/Core-Properties)

## Step 5. Running the workload

Before starting the workload, you will need to "load" the data first.

```sh
bin/ycsb load yugabyteSQL -P yugabyteSQL/db.properties -P workloads/workloada
```

Then, you can run the workload:

```sh
bin/ycsb run yugabyteSQL -P yugabyteSQL/db.properties -P workloads/workloada
```

To run the other workloads, say workloadb, all we need to do is change that argument in the above command.

```sh
bin/ycsb run yugabyteSQL -P yugabyteSQL/db.properties -P workloads/workloadb
```
