import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap';

import AceEditor from 'react-ace';
import 'brace/mode/sql';
import 'brace/theme/chrome';

import { ResultSet } from './Mocks'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import moment from 'moment'

const SqlEditor = React.createClass({
  getInitialState: function() {
    return {
      collapsed: false,
      startQueryDttm: null,
      tables: [],
      sql: this.props.queryEditor.sql,
    };
  },
  toggleCollapse: function () {
    this.setState({ collapsed: !this.state.collapsed });
    this.render();
  },
  stopwatch: function () {
    var duration = moment().valueOf() - this.state.startQueryDttm.valueOf();
    console.log(duration);
    duration = moment.utc(duration);

    this.setState({ clockStr: duration.format('HH:mm:ss') });
    this.render();
  },
  startQuery: function () {
    this.setState({ startQueryDttm: moment() });
    this.timer = setInterval(this.stopwatch, 500);
    this.render();
  },
  textChange: function (text) {
    this.setState({ sql: text });
  },
  render: function () {
    var body = (<div/>);
    var results = this.state.startQueryDttm ? <img className="loading" src="/static/assets/images/loading.gif"/> : <ResultSet/>;
    if (!this.state.collapsed) {
      body = (
        <div>
          <AceEditor
            mode="sql"
            name={this.props.name}
            theme="chrome"
            minLines={10}
            maxLines={30}
            onChange={this.textChange}
            height="200px"
            width="100%"
            editorProps={{$blockScrolling: true}}
            value={this.state.sql}/>
          {results}
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
        <Button className="clock">{this.state.clockStr}</Button>
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
        <Button bsSize="small"><a className="fa fa-save"/></Button>
        <Button bsSize="small">
          <a
            className="fa fa-close"
            onClick={this.props.actions.removeQueryEditor.bind(this, this.props.queryEditor.id)}/>
        </Button>
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

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(SqlEditor)
