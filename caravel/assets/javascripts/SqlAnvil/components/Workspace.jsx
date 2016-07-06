import React, { PropTypes } from 'react'
import { Alert, Button, ButtonGroup } from 'react-bootstrap'
import Select from 'react-select'
import Link from './Link'
import TableOverlay from './TableOverlay'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import TableWorkspaceElement from './TableWorkspaceElement'
import shortid from 'shortid'

// CSS
import 'react-select/dist/react-select.css';


const Workspace = React.createClass({
  getInitialState: function() {
    return {
      selectedDatabase: null,
      tableName: null,
      tableOptions: [],
      tableLoading: false,
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
      that.props.actions.addTable(shortid.generate(), that.state.selectedDatabase.id, data.name, data.columns, true);
      that.render();
    });
    this.render();
  },
  render: function () {
    var tableElems = (
      <Alert bsStyle="info">
        To add a table to your workspace, pick one from the dropdown above.
      </Alert>);
    if (this.props.tables.length > 0) {
      tableElems = this.props.tables.map(function (table) {
        return <TableWorkspaceElement key={table.name} table={table}/>;
      });
    }

    var tableOverlayElems = [];
    var i = 0;
    this.props.tables.forEach(function (table) {
      if (table.showPopup) {
        tableOverlayElems.push(
          <TableOverlay
            key={table.name}
            table={table}
            defaultPosition={{ x: i*100, y: i*50 }}/>
        );
        i++;
      }
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
            <div>
              <div className="ws-el">
                <a href="#">Bookings by market YoY</a>
              </div>
              <div className="ws-el">
                <a href="#">A wonderful query</a>
              </div>
            </div>
            <hr/>

          </div>
        </div>
      </div>
    )
  }
});

function mapStateToProps(state) {
  return {
    tables: state.tables
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace)
