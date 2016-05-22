import React from 'react';
import { render } from 'react-dom';

import { Button, ButtonGroup, ListGroup, ListGroupItem, Tab, Tabs } from 'react-bootstrap';
import { Table } from 'reactable';

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/sql';
import 'brace/theme/chrome';


var SplitPane = require('react-split-pane');
var Select = require('react-select');
import 'react-select/dist/react-select.css';

require('../stylesheets/carapal.css')

const ResultSet = React.createClass({
  render: function () {
    return (
      <Table
        className="table table-condensed table-striped table-bordered small"
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
        className="table table-condensed table-striped small"
        sortable={true}
        data={[
          {'time': '2016-06-01 12:12:12', 'tables': 'fct_bookings', 'sql': "SELECT * FROM fct_bookings WHERE ds > '120923424'"},
          {'time': '2016-06-01 12:14:28', 'tables': 'dim_listings', 'sql': "SELECT id, sum(something) FROM dim_listings WHERE ds > '120923424"},
          {'time': '2016-06-01 12:14:28', 'tables': 'dim_listings', 'sql': "SELECT id, sum(something) FROM dim_listings WHERE ds > '120923424"},
          {'time': '2016-06-01 12:14:28', 'tables': 'dim_listings', 'sql': "SELECT id, sum(something) FROM dim_listings WHERE ds > '120923424"},
          {'time': '2016-06-01 12:14:28', 'tables': 'dim_listings', 'sql': "SELECT id, sum(something) FROM dim_listings WHERE ds > '120923424"},
          {'time': '2016-06-01 12:14:28', 'tables': 'dim_listings', 'sql': "SELECT id, sum(something) FROM dim_listings WHERE ds > '120923424"},
          {'time': '2016-06-01 12:14:28', 'tables': 'dim_listings', 'sql': "SELECT id, sum(something) FROM dim_listings WHERE ds > '120923424"},
          {'time': '2016-06-01 12:14:28', 'tables': 'dim_listings', 'sql': "SELECT id, sum(something) FROM dim_listings WHERE ds > '120923424"},
          {'time': '2016-06-01 12:14:28', 'tables': 'dim_listings', 'sql': "SELECT id, sum(something) FROM dim_listings WHERE ds > '120923424"},
        ]}/>
    )
  }
});



const SqlEditor = React.createClass({
  getInitialState: function() {
    return {
      collapsed: false,
      startQueryDttm: null,
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
        <div className="panel-body nopadding">
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
        <Button bsSize="small" onClick={this.toggleCollapse}>
          <a className={(this.state.collapsed) ? 'fa fa-angle-down' : 'fa fa-angle-up'}/>
        </Button>
        <Button bsSize="small"><a className="fa fa-cog"/></Button>
        <Button bsSize="small"><a className="fa fa-close"/></Button>
      </ButtonGroup>
    );
    return (
      <div className="SqlEditor">
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="clearfix">
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

var options = [
    { value: '1', label: 'core_data' },
    { value: '2', label: 'core_cx' }
];

const Workspace = React.createClass({
  render: function () {
    return (
      <div className="panel panel-default Workspace">
        <div className="panel-heading">
          Workspace
        </div>
        <div className="panel-body">
          <div>
            <Select
              name="select-db"
              value=""
              placeholder="[Database]"
              options={options}
              className="p-b-10"
            />
            <Select
              name="select-table"
              value=""
              placeholder="[Table / View]"
              options={options}
            />
            <hr/>
            <strong>Tables / Views</strong>
            <ListGroup>
              <ListGroupItem>
                <a href="#">fct_bookings</a>
                <ButtonGroup className="pull-right">
                  <Button bsSize="small"><a className="fa fa-play"/></Button>
                  <Button bsSize="small"><a className="fa fa-trash"/></Button>
                </ButtonGroup>
              </ListGroupItem>
              <ListGroupItem><a href="#">dim_users</a></ListGroupItem>
              <ListGroupItem><a href="#">dim_markets</a></ListGroupItem>
            </ListGroup>
            <strong>Queries</strong>
            <ListGroup>
              <ListGroupItem><a href="#">bookings by market</a></ListGroupItem>
              <ListGroupItem><a href="#">super query shocking results</a></ListGroupItem>
            </ListGroup>
          </div>
        </div>
      </div>
    )
  }
});

const App = React.createClass({
  render: function () {
    return (
      <SplitPane split="vertical" minSize={200} defaultSize={300}>
        <div className="pane-cell">
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
                <Tab title="Query Log" eventKey={1}>
                  <QueryLog/>
                </Tab>
                <Tab title="Saved Queries" eventKey={2}></Tab>
                <Tab title="Popular Queries" eventKey={3}></Tab>
              </Tabs>
              <QueryLog/>
            </div>
          </SplitPane>
        </div>
      </SplitPane>
    )
  }
});

render(
  <App/>,
  document.getElementById('app')
);
