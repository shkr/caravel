import React from 'react';
import { Table } from 'reactable';


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

export { ResultSet, QueryLog }
