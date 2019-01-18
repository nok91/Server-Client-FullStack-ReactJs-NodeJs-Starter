import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import "./FilesViewer.css"

class FilesViewer extends Component {
    componentDidMount() {
        console.log(this.props.table_data);
    }

    render() {
        const { filesViewer, table_data } = this.props;
        return (
            <div className="fileViewer-contaner" >
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                                FilesViewer
                        </Typography>

                        <Button variant="outlined" style={{ marginRight: 10 }} > ... </Button> 
                        <Button variant="outlined" style={{ marginRight: 10 }} > Open </Button> 
                        <Button variant="outlined" style={{ marginRight: 10 }}> Download </Button>


                        <a href={`/folder/${table_data.Id}`} >
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                            >
                                <CloseIcon />
                            </IconButton>
                        </a>
                        
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default FilesViewer;