import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import ReactPlayer from 'react-player'

class FilesViewerVideos extends Component {
    render() {
        const { filesViewer } = this.props;
        console.log(filesViewer)

        return (
           	<Grid container  style={{display: 'flex', minHeight: '100vh', flexGrow: 1, backgroundColor: '#222222'}} justify="center"  alignItems="center">
					<Grid item xs={6} style={{backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', padding: 50,  alignItems: 'flex-start'  /* ADD THIS! */}}>
                        <ReactPlayer  width='100%' height='100%' url={filesViewer.src} playing={true} />
					</Grid>
			</Grid>
        );
    }
}

export default FilesViewerVideos;