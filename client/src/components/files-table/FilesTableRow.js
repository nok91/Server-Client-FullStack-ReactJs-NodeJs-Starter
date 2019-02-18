import React, { Component, Fragment } from 'react';
import folder_icon from '../../media/icons/folder-icon.svg';
import file_image_icon from '../../media/icons/file-image-icon.svg';
import file_txt_icon from '../../media/icons/file-txt-icon.svg';
import file_pdf_icon from '../../media/icons/file-pdf-icon.svg';
import video_player_icon from '../../media/icons/video-player-icon.svg';
// import file_loader from '../../media/icons/file-loader.svg'
// import Button from '@material-ui/core/Button';
import FilesDropDown from './FilesDropDown';

class FilesTableRow extends Component {

    render() {
        const { updated, name, size, onClick_handler, is_active, type, active_dropdown_id, onClickDropDown_handler, dropdown_is_open, selectedRows, row, getFileHandler} = this.props;

        var icon = folder_icon;
        switch (type) {
            case 'image':
                icon = file_image_icon;
                break;
            case 'txt':
                icon = file_txt_icon;
                break;
            case 'pdf':
                icon = file_pdf_icon;
                break;
            case 'video':
                icon = video_player_icon;
                break;
            default:
                icon = folder_icon;
                break;
        }
      
        return (
            <Fragment >
                <li className={`noselect fl-item-wrapper ${is_active ? 'active' : ''} ${selectedRows ? 'selected' : ''}`}  onClick={onClick_handler}>
                   
                    <div className="fl-item-row">
                        <div className="fl-item-icon-wrapper " >
                            <div className="fl-item-icon is-image-loaded" style={{ backgroundImage: `url(${icon})` }} />
                        </div>
                        <div className="fl-item-name">
                            <a onClick={() => getFileHandler( { })} href={(row.type == 'folder' ? '/folder' : '/file') +`/${row.Id}`}>  {name}  </a>
                        </div>
                        <div className="fl-item-resize-handle" />
                        <div className="fl-item-updated">
                            Today by {updated}
                        </div>
                        <div className="fl-item-resize-handle" />
                        <div className="fl-item-size">
                            {size} Files
                        </div>
                        <div className="fl-item-row-actions">
                            <FilesDropDown is_active={is_active} active_dropdown_id={active_dropdown_id} onClickDropDown_handler={onClickDropDown_handler} dropdown_is_open={dropdown_is_open}    />
                        </div>
                    </div>
                </li>
            </Fragment>
        );
    }
}

export default FilesTableRow;