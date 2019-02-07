import React, { Component } from 'react';
import { Document, Page, pdfjs } from "react-pdf";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';


import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class FilesViewerPdf extends Component {

    state = {
        numPages: null,
        pageNumber: 1,
    }

    componentDidMount() {
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }

    onClickNextHandler = () => {
        const { pageNumber, numPages } = this.state;
        var nextpage = pageNumber +1 <= numPages ? pageNumber +1 : 1;

        this.setState({
            pageNumber: nextpage
        })
    }

    onClickPrevHandler = () => {
        const { pageNumber, numPages } = this.state;
        var prevpage = pageNumber - 1 >= 1 ? pageNumber - 1 : numPages;
        this.setState({
            pageNumber: prevpage
        })
    }

    render() {
        const { table_data, filesViewer } = this.props;
        const { pageNumber, numPages } = this.state;

        return (
            <React.Fragment>
                    <Document file={filesViewer.src} onLoadSuccess={this.onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} />
                    </Document>

                    {/* //["inherit","primary","secondary","default"] */}
                    <AppBar position="fixed" color="secondary" style={{ top: 'auto', bottom: 0 }}> 
                        <Toolbar style={{ alignItems: 'center', justifyContent: 'space-between' }} >
                            <IconButton color="inherit" aria-label="Open drawer">
                                <KeyboardArrowLeft onClick={this.onClickPrevHandler}/>
                            </IconButton>
                            <p>Page {pageNumber} of {numPages}</p>
                            <div>
                                <IconButton color="inherit">
                                    <KeyboardArrowRight onClick={this.onClickNextHandler} />
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>
            </React.Fragment>
        );
    }
}

export default FilesViewerPdf;