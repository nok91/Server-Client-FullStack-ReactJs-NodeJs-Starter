import React, { Component, Fragment } from 'react';
import folder_icon from '../../media/icons/folder-icon.svg';
// import file_loader from '../../media/icons/file-loader.svg'

class FilesTableRow extends Component {
    render() {
        const { author, title, type, size, onClick_handler, is_active} = this.props;
        return (
            <Fragment>
                <li className={`fl-item-wrapper ${is_active && 'active'}`} onClick={onClick_handler}>
                    <div className="fl-item-row">
                        <div className="fl-item-icon-wrapper " >
                            <div className="fl-item-icon is-image-loaded" style={{ backgroundImage: `url(${folder_icon})` }}>
                            </div>
                        </div>
                        <div className="fl-item-name">
                            {title}
                        </div>
                        <div className="fl-item-resize-handle" />
                        <div className="fl-item-updated">
                            Today by {author}
                        </div>
                        <div className="fl-item-resize-handle" />
                        <div className="fl-item-size">
                            {size} Files
                        </div>
                    </div>
                </li>
            </Fragment>
        );
    }
}

export default FilesTableRow;