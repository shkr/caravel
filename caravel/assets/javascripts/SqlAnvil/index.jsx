var $ = window.$ = require('jquery');
var jQuery = window.jQuery = $;
var px = require('../modules/caravel.js');
require('bootstrap');

import React from 'react';
import { render } from 'react-dom';

import { Tab, Tabs } from 'react-bootstrap';
import { Table } from 'reactable';
import SplitPane from 'react-split-pane'

import Workspace from './components/Workspace'
import SqlEditor from './components/SqlEditor'
import { QueryLog } from './components/Mocks'

import { createStore } from 'redux'
import { Provider } from 'react-redux';

import sqlAnvilReducer from './reducers'

require('./main.css')

let store = createStore(sqlAnvilReducer);

const App = React.createClass({
  render: function () {
    return (
      <div className="App">
        <SplitPane split="vertical" minSize={200} defaultSize={300}>
          <div className="pane-cell pane-west">
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
                  <Tab title="Saved Queries" eventKey={2}>
                    Unavaillable.
                  </Tab>
                  <Tab title="Popular Queries" eventKey={3}>
                    Unavaillable.
                  </Tab>
                </Tabs>
              </div>
            </SplitPane>
          </div>
        </SplitPane>
      </div>
    )
  }
});

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);
