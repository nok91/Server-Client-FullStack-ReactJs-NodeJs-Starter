import React, { Component, Fragment } from 'react';
import FilesTable from '../files-table/FilesTable';


import './allFiles.css';
class AllFiles extends Component {
    state = {
        data: [
            { type: 'folder', title: 'Test Folder', author: 'Mohammed Nokri', size: 40 },
            { type: 'folder', title: 'Test Folder 2', author: 'Bianca Neve', size: 20 },
        ]
    }

    render() {
        return (
            <Fragment>
                <FilesTable  {...this.state} />
            </Fragment>
        );
    }
}

export default AllFiles;