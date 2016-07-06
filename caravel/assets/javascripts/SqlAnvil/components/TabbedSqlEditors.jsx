import React from 'react'
import { Button, Tab, Tabs } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import SqlEditor from './SqlEditor'
import shortid from 'shortid'

var queryCount = 1;

const QueryEditors = React.createClass({
  getInitialState: function() {
    return {tabkey: 0};
  },
  newQueryEditor: function () {
    var id = shortid.generate();
    queryCount++;
    this.props.actions.addQueryEditor(id, `Query ${queryCount}`, "SELECT...");
  },
  handleSelect(key) {
    this.setState({tabkey: key});
  },
  render: function () {
    var editors = this.props.queryEditors.map(function (qe, i) {
      return (
        <Tab
          key={qe.id}
          title={qe.title}
          eventKey={i}>
            <SqlEditor name={qe.id} queryEditor={qe}/>
        </Tab>);
    });
    return (
      <Tabs activeKey={this.state.tabkey} onSelect={this.handleSelect}>
        {editors}
        <Tab title="+" eventKey={this.props.queryEditors.length}>
          <Button onClick={this.newQueryEditor}>
            Add Tab
          </Button>
        </Tab>
      </Tabs>
    );
  }
});

function mapStateToProps(state) {
  return {
    queryEditors: state.queryEditors
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryEditors)

