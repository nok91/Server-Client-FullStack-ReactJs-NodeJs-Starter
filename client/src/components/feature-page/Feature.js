import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import FeatureTable from './Feature-table';

class Feature extends Component {
    state = {
        data: [
            { id: 'Cupcake', name: 305, calories: 3.7, fat: 67, carbs: 67 },
            { id: 'Donut', name: 305, calories: 3.7, fat: 67, carbs: 67 },
            { id: 'Eclair', name: 305, calories: 3.7, fat: 67, carbs: 67 },
            { id: 'Frozen yoghurt', name: 305, calories: 3.7, fat: 67, carbs: 67 },
            { id: 'Gingerbread', name: 305, calories: 3.7, fat: 67, carbs: 67 },
            { id: 'Honeycomb', name: 305, calories: 3.7, fat: 67, carbs: 67 },
            { id: 'Ice cream sandwich', name: 305, calories: 3.7, fat: 67, carbs: 67 },
            { id: 'Jelly Bean', name: 305, calories: 3.7, fat: 67, carbs: 67 },
            { id: 'KitKat', name: 305, calories: 3.7, fat: 67, carbs: 67 },
            { id: 'Lollipop', name: 305, calories: 3.7, fat: 67, carbs: 67 },
            { id: 'Marshmallow', name: 305, calories: 3.7, fat: 67, carbs: 67 },
            { id: 'Nougat', name: 305, calories: 3.7, fat: 67, carbs: 67},
            { id: 'Oreo', name: 305, calories: 3.7, fat: 67, carbs: 67 },
        ]
    }
    render() {
        return (
            <div>
                <FeatureTable {...this.state} />
            </div>
        );
    }
}

export default requireAuth(Feature);