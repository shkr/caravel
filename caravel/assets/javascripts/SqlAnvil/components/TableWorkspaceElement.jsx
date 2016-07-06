import React, { PropTypes } from 'react'
import { Alert, Button, ButtonGroup } from 'react-bootstrap'
import Link from './Link'
import TableOverlay from './TableOverlay'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import shortid from 'shortid'

// CSS
import 'react-select/dist/react-select.css';

const TableWorkspaceElement = React.createClass({
  selectStar: function () {
    var cols = "";
    var that = this;
    this.props.table.columns.forEach(function (col, i) {
      console.log(col);
      cols += col.name;
      if (i < that.props.table.columns.length - 1) {
        cols += ', ';
      }
    });
    var sql = `SELECT ${cols}\nFROM ${this.props.table.name}`;
    var id = shortid.generate();
    this.props.actions.addQueryEditor(id, this.props.table.name, sql);
  },
  render: function () {
    return (
      <div className="ws-el">
        <a href="#">{this.props.table.name}</a>
        <ButtonGroup className="ws-el-controls pull-right">
          <Button bsSize="small">
            <Link
                className="fa fa-info-circle"
                onClick={this.props.actions.showTablePopup.bind(this, this.props.table.id)}
                tooltip="Show table structure in popup"
            />
          </Button>
          <Button bsSize="small">
            <Link
                className="fa fa-play"
                onClick={this.selectStar}
                tooltip="Run query in a new tab"/>
          </Button>
          <Button bsSize="small">
            <Link
                className="fa fa-trash"
                onClick={this.props.actions.removeTable.bind(this, this.props.table.id)}
                tooltip="Remove from workspace"
            />
          </Button>
        </ButtonGroup>
      </div>
    )
  }
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}
export default connect(null, mapDispatchToProps)(TableWorkspaceElement)

