import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap';

import AceEditor from 'react-ace';
import 'brace/mode/sql';
import 'brace/theme/chrome';

import { ResultSet } from './Mocks'

const SqlEditor = React.createClass({
  getInitialState: function() {
    return {
      collapsed: false,
      startQueryDttm: null,
      tables: [],
      sql: "SELECT *\nFROM \nWHERE ",
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

export default SqlEditor
