import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import "./FilesViewer.css"
import { Document, Page, pdfjs } from "react-pdf";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
class FilesViewer extends Component {
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
        const { table_data } = this.props;
        const { pageNumber, numPages } = this.state;
      
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

                        <a href={`/folder/${table_data.Id}`} >
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
                    <Document file="//localhost:3000/pdf-sample.pdf" onLoadSuccess={this.onDocumentLoadSuccess}>
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
                  
                </div>
            </div>
        );
    }
}

export default FilesViewer;