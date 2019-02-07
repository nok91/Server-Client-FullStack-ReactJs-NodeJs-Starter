import React, { Component } from 'react';
// import FileViewer from 'react-file-viewer';
import Grid from '@material-ui/core/Grid';

class FilesViewerTxt extends Component {
    state = {
        text: ""
    };

    componentDidMount() {
		const {filesViewer} = this.props;

		console.log("Here", filesViewer)

		 this.readTextFile(filesViewer.src);
    }
    
    readTextFile = file => {
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", file, false);
		rawFile.onreadystatechange = () => {
			if (rawFile.readyState === 4) {
				if (rawFile.status === 200 || rawFile.status == 0) {
					var allText = rawFile.responseText;
					this.setState({
						text: allText
					});
				}
			}
		};
		rawFile.send(null);
	};

    render() {
        return (
				<Grid container  style={{display: 'flex', minHeight: '100vh', flexGrow: 1}} justify="center"  alignItems="center">
					<Grid item xs={6} style={{padding: 50, backgroundColor: 'white'}}>
						{this.state.text.split("\n").map((item, key) => {
							return <span key={key}>{item}<br /></span>;
						})}	
					</Grid>
				</Grid>
		);
    }
}

export default FilesViewerTxt;