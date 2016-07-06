import React, { PropTypes } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Button } from 'react-bootstrap'


const ButtonWithTooltip = React.createClass({
  render() {
    let tooltip = (
      <Tooltip id="tooltip">
        {this.props.tooltip}
      </Tooltip>
    );
    return (
      <OverlayTrigger overlay={tooltip} delayShow={300} delayHide={150}>
        <Button
          onClick={this.props.onClick}
          className={this.props.className}>
            {this.props.children}
        </Button>
      </OverlayTrigger>
    );
  }
});

export default ButtonWithTooltip
