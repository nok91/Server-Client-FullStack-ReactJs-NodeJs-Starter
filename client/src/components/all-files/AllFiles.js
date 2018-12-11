import React, { Component, Fragment } from 'react';
import FilesTable from '../files-table/FilesTable';


import './allFiles.css';
class AllFiles extends Component {
 

    render() {
        return (
            <Fragment>
                <FilesTable />
            </Fragment>
        );
    }
}

export default AllFiles;