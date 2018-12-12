import React, { Component } from 'react';
import requireAuth from '../HOC/requireAuth';
import FeatureTable from './Feature-table';

class Feature extends Component {
    render() {
        return (
            <div>
                <FeatureTable />
            </div>
        );
    }
}

export default requireAuth(Feature);