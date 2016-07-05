import React, { PropTypes } from 'react'
import { Alert, Button, ButtonGroup } from 'react-bootstrap'
import Select from 'react-select'
import Link from './Link.js'
import TableOverlay from './TableOverlay'


const WorkspaceElement = React.createClass({
  render: function () {
    return (
      <div className="ws-el">
        <a href="#">{this.props.value}</a>
        <ButtonGroup className="ws-el-controls pull-right">
          <Button bsSize="small">
            <Link className="fa fa-info-circle" tooltip="Show table structure in popup"/>
          </Button>
          <Button bsSize="small">
            <Link className="fa fa-play" tooltip="Run query in a new tab"/>
          </Button>
          <Button bsSize="small">
            <Link className="fa fa-trash" tooltip="Remove from workspace"/>
          </Button>
        </ButtonGroup>
      </div>
    )
  }
});


const Workspace = React.createClass({
  getInitialState: function() {
    return {
      selectedDatabase: null,
      tableName: null,
      tableOptions: [],
      tableLoading: false,
      tables: [],
    };
  },
  getDatabaseOptions: function(input, callback) {
    $.get('/databaseview/api/read', function (data) {
      var options = [];
      for (var i=0; i<data.pks.length; i++) {
        options.push({ value: data.pks[i], label: data.result[i].database_name });
      }
      callback(null, {
        options: options,
        cache: false
      });
    });
  },
  getTableOptions: function(input, callback) {
      var that = this;
      $.get('/tableasync/api/read', function (data) {
        var options = [];
        for (var i=0; i<data.pks.length; i++) {
          options.push({ value: data.pks[i], label: data.result[i].table_name });
        }
        callback(null, {
          options: options,
          cache: false
        });
      });
  },
  changeDb: function (dbId) {
    this.setState({ tableLoading: true });
    var that = this;
    var url = '/databaseasync/api/read?id=' + dbId;
    $.get(url, function (data) {
      var tables = data.result[0].all_table_names;
      var options = [];
      for (var i=0; i<tables.length; i++) {
        options.push({ value: tables[i], label: tables[i] });
      }
      that.setState({ tableOptions: options });
      that.setState({ tableLoading: false });
      that.setState({ selectedDatabase: data.result[0] });
    });
    this.render();
  },
  changeTable: function (tableOpt) {
    var tableName = tableOpt.value;
    this.setState({ tableName: tableName });
    var that = this;
    var url = `/caravel/table/${this.state.selectedDatabase.id}/${tableName}`;
    $.get(url, function (data) {
      var options = [];
      data['showPopup'] = true;
      var cols = data.columns;
      var tables = that.state.tables;
      tables.push(data);
      that.setState({ tables: tables });
      that.render();
    });
    this.render();
  },
  render: function () {
    var tableElems = (
      <Alert bsStyle="info">
        To add a table to your workspace, pick one from the dropdown above.
      </Alert>);
    if (this.state.tables.length > 0) {
      tableElems = this.state.tables.map(function (table) {
        return <WorkspaceElement key={table.name} value={table.name}/>;
      });
    }

    var tableOverlayElems = [];
    var i = 0;
    this.state.tables.forEach(function (table) {
      tableOverlayElems.push(
        <TableOverlay key={table.name} closeCallback={function () {table.showPopup = false;}} visible={table.showPopup} data={table} defaultPosition={{ x: i*100, y: i*50 }}/>
      );
      i++;
    });

    return (
      <div className="panel panel-default Workspace">
        {tableOverlayElems}
        <div className="panel-heading">
          Workspace
        </div>
        <div className="panel-body">
          <div>
            <Select.Async
              name="select-db"
              placeholder="[Database]"
              loadOptions={this.getDatabaseOptions}
              value={(this.state.selectedDatabase) ? this.state.selectedDatabase.id : null}
              onChange={this.changeDb}
              autosize={false}
            />
            <div>
              <Select
                disabled={(!this.state.selectedDatabase === null)}
                ref="selectTable"
                name="select-table"
                isLoading={this.state.tableLoading}
                placeholder="[Table / View]"
                className="p-t-10"
                value={this.state.tableName}
                onChange={this.changeTable}
                options={this.state.tableOptions}/>
            </div>
            <hr/>

            <h6>Tables / Views</h6>
            <div>
              {tableElems}
            </div>
            <hr/>

            <h6>Queries</h6>
            <div className="queries">
              <WorkspaceElement value="super query shocking results"/>
              <WorkspaceElement value="bookings by market"/>
              <WorkspaceElement value="query with an extremely long title that never end really"/>
            </div>
            <hr/>

            <h6>Slices</h6>
            <div className="queries">
              <WorkspaceElement value="is it nice to have slices in a workspace?"/>
              <WorkspaceElement value="bookings by markets"/>
            </div>
            <hr/>

          </div>
        </div>
      </div>
    )
  }
});


export default Workspace
