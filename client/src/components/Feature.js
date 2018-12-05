import React, { Component } from 'react';
import requireAuth from './requireAuth';

class Feature extends Component {
    render() {
        return (
            <div>
                <h1>This is Feature</h1>
            </div>
        );
    }
}

export default requireAuth(Feature);