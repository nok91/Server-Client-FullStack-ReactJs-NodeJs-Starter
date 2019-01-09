import React, { Component } from 'react';

import folder_icon from '../../media/icons/folder-icon.svg';
import file_txt_icon from '../../media/icons/file-txt-icon.svg';
import file_pdf_icon from '../../media/icons/file-pdf-icon.svg';

class FilesTableGrid extends Component {

    componentDidMount () {
        console.log(this.props.data.filter(el => el.type === 'folder'))
    }

    selectByFolder_helper = (_is_select_by_folder) => {
        if (_is_select_by_folder )
            return this.props.data.filter(el => el.type === 'folder')
        else
            return this.props.data.filter(el => el.type !== 'folder')
    }

    renderFiles = (_el) => {
        var file = "";

        switch (_el.type) {
            case 'image':
                file = <div className="grid-view-item-thumbnail-image" style={{ backgroundImage: `url(${_el.src})` }}></div>;
                break;
            case 'txt':
                file = <img className="grid-view-item-info-file-icon" src={file_txt_icon} width="32" height="32" />;
                break;
            case 'pdf':
                file = <img className="grid-view-item-info-file-icon" src={file_pdf_icon} width="32" height="32" />;
                break;
            default:
                file = <div className="grid-view-item-thumbnail-image" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80)` }}></div>;
                break;
        }

        return file;

    }

    render() {
        const { data, is_active, onClick_handler } = this.props;
        
        return (
            <React.Fragment>
             
                    <h3 className="grid-item-type-heading">FOLDERS</h3>
                    <div className="grid-view-items">
                        {this.selectByFolder_helper(true).map((el, index) => {
                            return (
                                <div className={`grid-view-item is-folder  ${is_active === el.Id ? 'active' : ''}`} key={index} onClick={() => onClick_handler(el.Id)}>
                                        <div className="grid-view-item-info ">
                                            <img className="grid-view-item-info-icon" src={folder_icon} width="32" height="32" />

                                            <div className="grid-view-item-info-details">
                                                <div className="grid-view-item-info-details-list-name">{el.name}</div>
                                                <div className="grid-view-item-info-details-list-date">Today by {el.updated}</div>
                                                <div className="grid-view-item-info-details-list-size">{el.size} File</div>
                                            </div>
                                        </div>
                                    </div>
                            );
                        })}
                    </div>
                    <h3 className="grid-item-type-heading">FILES</h3>
                    <div className="grid-view-items ">
                        {this.selectByFolder_helper(false).map((el, index) => {
                            return (
                                <div className={`grid-view-item ${is_active === el.Id ? 'active' : ''}`} key={index} onClick={() => onClick_handler(el.Id)}>
                                    <div className="grid-view-item-thumbnail">
                                        {this.renderFiles(el)}
                                        
                                    </div>
                                    <div className="grid-view-item-info">
                                        <div className="grid-view-item-info-details">
                                            <div className="grid-view-item-info-details-list-name">{el.name}</div>
                                            <div className="grid-view-item-info-details-list-date">Today by {el.updated}</div>
                                            <div className="grid-view-item-info-details-list-size">{el.size} File</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                       
                    </div>
         
            </React.Fragment>
        );
    }
}

export default FilesTableGrid;