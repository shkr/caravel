import React from 'react';
import Draggable from 'react-draggable';
import { Table } from 'reactable';

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

export default TableOverlay
