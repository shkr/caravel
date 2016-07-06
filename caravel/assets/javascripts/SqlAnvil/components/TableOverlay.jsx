import React from 'react';
import Draggable from 'react-draggable';
import { Table } from 'reactable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

const TableOverlay = React.createClass({
  render() {
    return <Draggable
      defaultPosition={this.props.defaultPosition}
      position={null}
      handle=".handle"
      zIndex={500}>
      <div className="window panel panel-default">
        <div className="panel-heading handle">
          <strong>{this.props.table.name}</strong>
          <div className="pull-right">
            <a onClick={this.props.actions.hideTablePopup.bind(this, this.props.table.id) } href="#">
              <i className="fa fa-close"/>
            </a>
          </div>
        </div>
        <div className="panel-body nopadding">
          <Table
            className="table table-condensed table-striped small table-bordered"
            sortable={true}
            columns={['name', 'type']}
            data={this.props.table.columns}/>
        </div>
      </div>
    </Draggable>;
  }
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(TableOverlay)
