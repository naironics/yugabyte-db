---
title: Encryption in transit
linkTitle: Encryption in transit
description: Encryption in transit
headcontent: Enable encryption in transit (using TLS) to protect network communication.
image: /images/section_icons/secure/tls-encryption.png
aliases:
  - /secure/tls-encryption/
menu:
  latest:
    identifier: tls-encryption
    parent: secure
    weight: 740
---

YugabyteDB can be configured to protect data in transit with:

- [Server-server encryption](./server-to-server) for intra-node communication between YB-Master and YB-TServer nodes
- [Client-server](./client-to-server) for communication between clients and nodes when using CLIs, tools, and APIs for YSQL and YCQL

YugabyteDB supports [Transport Layer Security (TLS)](https://en.wikipedia.org/wiki/Transport_Layer_Security) encryption based on [OpenSSL](https://www.openssl.org), an open source cryptography toolkit that provides an implementation of the Transport Layer Security (TLS) and Secure Socket Layer (SSL) protocols.

**Note:** Client-server TLS encryption is not supported for YEDIS.

Follow the steps in this section to learn how to enable encryption using TLS for a three-node YugabyteDB cluster.

<div class="row">

  <div class="col-12 col-md-6 col-lg-12 col-xl-6">
    <a class="section-link icon-offset" href="prepare-nodes/">
      <div class="head">
        <img class="icon" src="/images/section_icons/secure/tls-encryption/prepare-nodes.png" aria-hidden="true" />
        <div class="title">1. Prepare nodes</div>
      </div>
      <div class="body">
          Prepare YugabyteDB nodes with the configuration data and TLS certificates.
      </div>
    </a>
  </div>

  <div class="col-12 col-md-6 col-lg-12 col-xl-6">
    <a class="section-link icon-offset" href="server-to-server/">
      <div class="head">
        <img class="icon" src="/images/section_icons/secure/tls-encryption/server-to-server.png" aria-hidden="true" />
        <div class="title">2. Server-server encryption</div>
      </div>
      <div class="body">
          Enable server-server encryption (using TLS) between YB-Master and YB-TServer nodes.
      </div>
    </a>
  </div>

  <div class="col-12 col-md-6 col-lg-12 col-xl-6">
    <a class="section-link icon-offset" href="client-to-server/">
      <div class="head">
        <img class="icon" src="/images/section_icons/secure/tls-encryption/client-to-server.png" aria-hidden="true" />
        <div class="title">3. Client-server encryption</div>
      </div>
      <div class="body">
          Enable client-server encryption (using TLS) for YSQL and YCQL.
      </div>
    </a>
  </div>

  <div class="col-12 col-md-6 col-lg-12 col-xl-6">
    <a class="section-link icon-offset" href="connect-to-cluster/">
      <div class="head">
        <img class="icon" src="/images/section_icons/secure/tls-encryption/connect-to-cluster.png" aria-hidden="true" />
        <div class="title">4. Connect to cluster</div>
      </div>
      <div class="body">
          Connect to a YugabyteDB cluster with encryption enabled.
      </div>
    </a>
  </div>

</div>
