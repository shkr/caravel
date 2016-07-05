var $ = window.$ = require('jquery');
var jQuery = window.jQuery = $;
var px = require('../modules/caravel.js');
require('bootstrap');
import React from 'react';
import { render } from 'react-dom';

import { Alert, Button, ButtonGroup, ul, li, Tab, Tabs, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Table } from 'reactable';

import brace from 'brace';
import AceEditor from 'react-ace';
import Draggable from 'react-draggable';
import 'brace/mode/sql';
import 'brace/theme/chrome';

var SplitPane = require('react-split-pane');
var Select = require('react-select');
import 'react-select/dist/react-select.css';
require('../../stylesheets/carapal.css')


const TableOverlay = React.createClass({
  getInitialState() {
    return {
      visible: this.props.visible,
    };
  },
  close() {
    this.setState({ visible: false });
    this.props.closeCallback();
    this.render();
  },
  render() {
    if (this.state.visible) {
      return <Draggable
        defaultPosition={this.props.defaultPosition}
        position={null}
        handle=".handle"
        zIndex={500}>
        <div className="window panel panel-default">
          <div className="panel-heading handle">
            <strong>{this.props.data.name}</strong>
            <div className="pull-right">
              <a onClick={this.close} href="#"><i className="fa fa-close"/></a>
            </div>
          </div>
          <div className="panel-body nopadding">
            <Table
              className="table table-condensed table-striped small table-bordered"
              sortable={true}
              columns={['name', 'type']}
              data={this.props.data.columns}/>
          </div>
        </div>
      </Draggable>;
    }
    else {
      return <div/>;
    }
  }
});

const Link = React.createClass({
  render() {
    let tooltip = (
      <Tooltip id="tooltip">
        {this.props.tooltip}
      </Tooltip>
    );
    return (
      <OverlayTrigger overlay={tooltip} delayShow={300} delayHide={150}>
        <a href={this.props.href} className={this.props.className}>
          {this.props.children}
        </a>
      </OverlayTrigger>
    );
  }
});

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

const ResultSet = React.createClass({
  render: function () {
    return (
      <Table
        className="table table-condensed table-striped small table-bordered"
        sortable={true}
        data={[
            {'State': 'New York', 'Description': 'this is some text', 'Tag': 'new'},
            {'State': 'New Mexico', 'Description': 'lorem ipsum', 'Tag': 'old'},
            {'State': 'Colorado',
             'Description': 'new description that shouldn\'t match filter',
             'Tag': 'old'},
            {'State': 'Alaska', 'Description': 'bacon', 'Tag': 'renewed'},
            {'State': 'New York', 'Description': 'this is some text', 'Tag': 'new'},
            {'State': 'New Mexico', 'Description': 'lorem ipsum', 'Tag': 'old'},
            {'State': 'Colorado',
             'Description': 'new description that shouldn\'t match filter',
             'Tag': 'old'},
            {'State': 'Alaska', 'Description': 'bacon', 'Tag': 'renewed'},
        ]}/>
    )
  }
});

const QueryLog = React.createClass({
  render: function () {
    return (
      <Table
        className="table table-condensed table-striped small table-bordered"
        sortable={true}
        data={[
          {
            'time': '2016-06-01 12:12:12',
            'tables': 'fct_bookings',
            'sql': "SELECT * FROM fct_bookings WHERE ds > '120923424'",
            'state': <span className="label label-success">success</span>,
            'controls': (
              <div>
                <i className="fa fa-save"/>
                <i className="fa fa-play"/>
                <i className="fa fa-share"/>
              </div>
            ),
            'duration': '00:10:32'
          },
          {
            'time': '2016-06-03 12:12:12',
            'tables': 'fct_bookings',
            'sql': "SELECT * FROM dim_user WHERE ds > '120924'",
            'state': <span className="label label-danger">failed</span>,
            'controls': (
              <div>
                <i className="fa fa-save"/>
                <i className="fa fa-play"/>
                <i className="fa fa-share"/>
              </div>
            ),
            'duration': '00:01:22'
          },
          {
            'time': '2016-06-04 12:12:12',
            'tables': 'fct_bookings',
            'sql': "SELECT * FROM fct_bookings_super WHERE ds > '120923424'",
            'state': <span className="label label-success">success</span>,
            'controls': (
              <div>
                <i className="fa fa-save"/>
                <i className="fa fa-play"/>
                <i className="fa fa-share"/>
              </div>
            ),
            'duration': '01:15:42'
          },
        ]}/>
    )
  }
});

const SqlEditor = React.createClass({
  getInitialState: function() {
    return {
      collapsed: false,
      startQueryDttm: null,
      tables: [],
    };
  },
  toggleCollapse: function () {
    this.setState({ collapsed: !this.state.collapsed });
    this.render();
  },
  stopwatch: function () {
    this.setState({ clockStr: new Date() - this.startQueryDttm });
    this.render();
  },
  startQuery: function () {
    this.setState({ startQueryDttm: new Date() });
    this.timer = setInterval(this.stopwatch, 100);
    this.render();
  },
  textChange: function (text) {
    this.setState({ sql: text });
  },
  render: function () {
    var body = (<div/>);
    if (!this.state.collapsed) {
      body = (
        <div>
          <AceEditor
            mode="sql"
            name={this.props.name}
            theme="chrome"
            minLines={3}
            maxLines={30}
            onChange={this.textChange}
            height="200px"
            width="100%"
            editorProps={{$blockScrolling: true}}
            value={this.state.sql}/>
          <ResultSet/>
        </div>
      );
    }
    var runButton = (
      <Button onClick={this.startQuery}>
        <a className="fa fa-play"/>
      </Button>
    );
    if (this.state.startQueryDttm) {
      runButton = (
        <Button className="clock">
          {new Date() - this.state.startQueryDttm}
        </Button>
      );
    }
    var rightButtons = (
      <ButtonGroup>
        {runButton}
        <Button bsSize="small"><a className="fa fa-archive"/></Button>
        <Button bsSize="small" onClick={this.toggleCollapse}>
          <a className={(this.state.collapsed) ? 'fa fa-angle-down' : 'fa fa-angle-up'}/>
        </Button>
        <Button bsSize="small"><a className="fa fa-cog"/></Button>
        <Button bsSize="small"><a className="fa fa-close"/></Button>
      </ButtonGroup>
    );
    return (
      <div className="SqlEditor">
        <div>
          <div>
            <div className="clearfix header">
              <div className="pull-left">
                <ButtonGroup>
                  <Button bsSize="small">
                    <a className="fa fa-database"/>
                  </Button>
                </ButtonGroup>
              </div>
              <div className="pull-right">
                {rightButtons}
              </div>
            </div>
          </div>
          {body}
        </div>
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

const App = React.createClass({
  render: function () {
    return (
      <div className="App">
        <SplitPane split="vertical" minSize={200} defaultSize={300}>
          <div className="pane-cell pane-west">
            <Workspace/>
          </div>
          <div>
            <SplitPane split="horizontal" minSize={100} defaultSize={400}>
              <div className="pane-cell">
                <Tabs>
                  <Tab title="Query 1" eventKey={1}><SqlEditor name="qry1"/></Tab>
                  <Tab title="Query 2" eventKey={2}><SqlEditor name="qry2"/></Tab>
                  <Tab title="Query 3" eventKey={3}><SqlEditor name="qry3"/></Tab>
                  <Tab title="Query 4" eventKey={4}><SqlEditor name="qry4"/></Tab>
                  <Tab title="+"></Tab>
                </Tabs>
              </div>
              <div className="pane-cell nopadding">
                <Tabs>
                  <Tab title="Query Log" eventKey={1}></Tab>
                  <Tab title="Saved Queries" eventKey={2}></Tab>
                  <Tab title="Popular Queries" eventKey={3}></Tab>
                </Tabs>
                <QueryLog/>
              </div>
            </SplitPane>
          </div>
        </SplitPane>
      </div>
    )
  }
});

render(
  <App/>,
  document.getElementById('app')
);
