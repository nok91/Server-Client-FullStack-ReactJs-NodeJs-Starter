import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import "./FilesViewer.css"
import FilesViewerPdf from './FilesViewerPdf';
import FilesViewerTxt from './FilesViewerTxt';
import FilesViewerImg from './FilesViewerImg';
import FilesViewerVideos from './FilesViewerVideos';

class FilesViewer extends Component {


    viewFilesHandler ()  {
        const { filesViewer } = this.props;

        switch(filesViewer.type.toLowerCase()) {
            case 'pdf' :
                    return <FilesViewerPdf {...this.props} />
                break;
            case 'txt' :
                    return <FilesViewerTxt {...this.props}  />
                break;
            case 'image' :
                    return <FilesViewerImg  {...this.props}  />
            case 'video' :
                    return <FilesViewerVideos  {...this.props}  />
            default: 
                    return "HERE IS A FILE"
                break;
        }
    }

    render() {
        const { filesViewer } = this.props;

        return (
            <div className="fileViewer-contaner" >
                <AppBar position="fixed" color="secondary">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                                FilesViewer
                        </Typography>

                        <Button variant="outlined" style={{ marginRight: 10 }} > ... </Button> 
                        <Button variant="outlined" style={{ marginRight: 10 }} > Open </Button> 
                        <Button variant="outlined" style={{ marginRight: 10 }}> Download </Button>

                        <a href={`/folder/${filesViewer.root || 0}`} >
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="default"
                            >
                                <CloseIcon />
                            </IconButton>
                        </a>
                    </Toolbar>
                </AppBar>

                <div style={{width : "100vw"}}>
                   {this.viewFilesHandler()}
                </div>
            </div>
        );
    }
}

export default FilesViewer;