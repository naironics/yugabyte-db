// Copyright (c) YugaByte, Inc.

import React, { Component } from 'react';
import * as moment from 'moment'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
export default class ListUniverse extends Component {

  componentWillMount() {
    this.props.fetchUniverseList();
  }

  componentWillUnmount() {
    this.props.resetUniverseInfo();
  }

  render() {
    var universeDisplay = [];

    function regionNameFormatter(cell, row) {
      var regionNames = cell.split("|");
      return regionNames.map(function(region) { return region }).join("<br />");
    }

    function universeNameFormatter(cell, row) {
      return <a href={"/universes/".concat(row.id)}>{cell}</a>;
    }

    if (typeof this.props.universe.universeList !== "undefined") {
      universeDisplay = this.props.universe.universeList.map(function (item, idx) {
        var regionNames = "";
        if (typeof(item.regions) !== "undefined") {
          regionNames = item.regions.map(function(region) { return region.name }).join("|");
        }
        var providerName = "";
        if (typeof item.provider !== "undefined") {
          providerName = item.provider.name;
        }
        var numNodes = "";
        if (typeof item.universeDetails.numNodes !== "undefined") {
          numNodes = item.universeDetails.numNodes;
        }
        var updateProgressStatus = false;
        var updateSuccessStatus = false;
        var status = "";
        if (typeof item.universeDetails.updateInProgress !== "undefined") {
           updateProgressStatus = item.universeDetails.updateInProgress;
        }
        if (typeof item.universeDetails.updateSucceeded !== "undefined") {
           updateSuccessStatus = item.universeDetails.updateSucceeded;
        }
        if (!updateProgressStatus && !updateSuccessStatus) {
           status = "Failed";
        } else if (updateSuccessStatus) {
           status = "Running";
        } else {
           status = "Provisioning";
        }

        return {
          id: item.universeUUID,
          name: item.name,
          region: regionNames,
          created: moment.default(item.creationDate).format('MMMM DD, YYYY HH:MM a'),
          provider: providerName,
          nodes: numNodes,
          status: status
        };
      });
    }

    function universeDetailsPage(row) {
      window.location.href = '/universes/' + row.id;
    }

    const selectRowProp = {
      bgColor: "rgb(211,211,211)",
      mode: "radio",
      clickToSelect: true,
      onSelect: universeDetailsPage,
      hideSelectColumn: true
    };

    return (
      <div className="row">
        <BootstrapTable data={universeDisplay}
                        striped={true}
                        hover={true}
                        selectRow={selectRowProp} >
          <TableHeaderColumn dataField="name"
                             dataSort={true}
                             isKey={true}
                             dataFormat={universeNameFormatter}>Universe Name</TableHeaderColumn>
          <TableHeaderColumn dataField="created" >Created On</TableHeaderColumn>
          <TableHeaderColumn dataField="region"
                             dataAlign="start"
                             dataFormat={regionNameFormatter}>Regions</TableHeaderColumn>
          <TableHeaderColumn dataField="provider">Provider</TableHeaderColumn>
          <TableHeaderColumn dataField="nodes" >Nodes</TableHeaderColumn>
          <TableHeaderColumn dataField="status" >Status</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}