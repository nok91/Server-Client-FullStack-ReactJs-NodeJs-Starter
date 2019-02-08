import React, { Component, Fragment } from 'react';
import FilesTable from '../files-table/FilesTable';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import LinearProgress from '@material-ui/core/LinearProgress';


import './allFiles.css';
import FilesViewer from '../files-table/FilesViewer';
import Grid from '@material-ui/core/Grid';

class AllFiles extends Component {
    state = {
        table_data: [],
        filesViewer: false,
    }

    componentDidMount() {
        const _id = this.props.match.params.id || 0;
        var props = {
            Id : _id
        }
       

        this.props.GetFiles(props, (files) => {

            try {
                if (typeof files.data === 'object' && files.data !== null){
                    if(this.props.match.path == '/file' || this.props.match.path == '/file/:id') {
                        // Open Files Viewer
                        this.setState({
                            filesViewer: files.data,
                        });
                    }else{
                          // Open Files Viewer
                          this.setState({
                            table_data: files.data,
                        });
                    }
                   
                }
            }catch {
                console.log("it's not an array")
            }
         
        });
    }

    closeViewerHandler = () => {
        this.setState({
            filesViewer: false
        });
    }

    getFileHandler = (props) => {
    }

    render() {
        const { table_data, filesViewer } = this.state;

        return (
            <Fragment>
                {
                    table_data.files !== undefined  &&  table_data.files.length > 0 ?
                        <Grid container spacing={24}>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={8}>
                                <FilesTable {...this.props} table_data={table_data} getFileHandler={(props) => this.getFileHandler(props)} />
                            </Grid>
                            <Grid item xs={2}></Grid>
                        </Grid>
                    :
                        <LinearProgress />
                }
                {
                    filesViewer &&
                       <FilesViewer table_data={table_data} filesViewer={filesViewer}  />
                    // <FilesViewerTest />
                }
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        errorMessage: state.auth.errorMessage,
    }
}

export default connect(mapStateToProps, actions)(AllFiles);