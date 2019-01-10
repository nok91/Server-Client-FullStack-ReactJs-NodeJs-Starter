import React, { Component } from 'react';
import './App.css';
import Header from './header/Header';
import Grid from '@material-ui/core/Grid';

class App extends Component {
  render() {
    const {children} = this.props
    return (
      <div>
          <Header />
          <Grid container spacing={24}>
            <Grid item xs={2}>
      
            </Grid>
            <Grid item xs={8}>
              {children}
            </Grid>
            <Grid item xs={2}>
    
            </Grid>
          </Grid>
         
      </div>
    );
  }
}

export default App;
