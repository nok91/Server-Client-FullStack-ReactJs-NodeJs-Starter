import React, { Component } from 'react';
import FilesDropDown from './FilesDropDown';

//import folder_icon from '../../media/icons/folder-icon.svg';
import file_txt_icon from '../../media/icons/file-txt-icon.svg';
import file_pdf_icon from '../../media/icons/file-pdf-icon.svg';

class FilesTableGridFile extends Component {

    state = {
        is_active: false,
    }

    onClickDropDown_handler = () => {
        this.setState({
            dropdown_is_open: !this.state.dropdown_is_open
        })
    }

    renderFiles = (_el) => {
        var file = "";

        switch (_el.type) {
            case 'image':
                file = <div className="grid-view-item-thumbnail-image" style={{ backgroundImage: `url(${_el.src})` }}></div>;
                break;
            case 'txt':
                file = <img className="grid-view-item-info-file-icon" src={file_txt_icon} width="32" height="32" alt="logo text file" />;
                break;
            case 'pdf':
                file = <img className="grid-view-item-info-file-icon" src={file_pdf_icon} width="32" height="32" alt="logo pdf file" />;
                break;
            default:
                file = <div className="grid-view-item-thumbnail-image" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80)` }}></div>;
                break;
        }

        return file;
    }

    render() {
        var { item, is_active, onClick_handler}  = this.props;
        return (
            <React.Fragment>
                <div className={`grid-view-item ${is_active ? 'active' : ''}`} onClick={(e) => onClick_handler(item.Id, e)}>
                    <div className="grid-view-item-thumbnail">
                        {this.renderFiles(item)}
                    </div>
                    <div className="grid-view-item-info">
                        <div className="grid-view-item-info-details">
                            <div className="grid-view-item-info-details-list-name">{item.name}</div>
                            <div className="grid-view-item-info-details-list-date">Today by {item.updated}</div>
                            <div className="grid-view-item-info-details-list-size">{item.size} File</div>
                        </div>

                        <FilesDropDown is_active={is_active} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default FilesTableGridFile;