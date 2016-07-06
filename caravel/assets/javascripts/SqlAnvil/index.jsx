var $ = window.$ = require('jquery');
var jQuery = window.jQuery = $;
require('bootstrap');

import React from 'react';
import { render } from 'react-dom';

import { Tab, Tabs } from 'react-bootstrap';
import { Table } from 'reactable';
import SplitPane from 'react-split-pane'

import Workspace from './components/Workspace'
import TabbedSqlEditors from './components/TabbedSqlEditors'
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
                <TabbedSqlEditors/>
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
