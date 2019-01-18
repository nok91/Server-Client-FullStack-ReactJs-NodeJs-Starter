import React, { Component } from 'react';
import './App.css';
import Header from './header/Header';


class App extends Component {
  render() {
    const {children} = this.props
    return (
      <div>
          <Header />
          {children}
      </div>
    );
  }
}

export default App;
