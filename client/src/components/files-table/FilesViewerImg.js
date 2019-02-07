import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

class FilesViewerImg extends Component {
   

    render() {
        const { filesViewer } = this.props;
        return (
           	<Grid container  style={{display: 'flex', minHeight: '100vh', flexGrow: 1}} justify="center"  alignItems="center">
					<Grid item xs={6} style={{backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', padding: 50,  alignItems: 'flex-start'  /* ADD THIS! */}}>
						<img src={filesViewer.src} style={{maxWidth: '100%'}}  />
					</Grid>
			</Grid>
        );
    }
}

export default FilesViewerImg;