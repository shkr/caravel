import React, { PropTypes } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'


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

export default Link
