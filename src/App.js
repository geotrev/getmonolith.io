import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Home from './components/Home';

const App = () => {
  return (
    <div id="site">
      <Home name="Jeff" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
