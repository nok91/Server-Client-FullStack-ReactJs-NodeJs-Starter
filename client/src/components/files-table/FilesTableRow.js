import React, { Component, Fragment } from 'react';
import folder_icon from '../../media/icons/folder-icon.svg';
// import file_loader from '../../media/icons/file-loader.svg'
import Button from '@material-ui/core/Button';

class FilesTableRow extends Component {
    render() {
        const { updated, name, size, onClick_handler, is_active} = this.props;
        return (
            <Fragment>
                <li className={`noselect fl-item-wrapper${is_active ? ' active' : ''}`} onClick={onClick_handler}>
                    <div className="fl-item-row">
                        <div className="fl-item-icon-wrapper " >
                            <div className="fl-item-icon is-image-loaded" style={{ backgroundImage: `url(${folder_icon})` }}>
                            </div>
                        </div>
                        <div className="fl-item-name">
                            {name}
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
                            <button className="btn file-list-item-context-menu" aria-haspopup="true" aria-expanded="false" data-type="context-menu-btn" data-tooltip="" data-tooltip-position="top" data-tooltip-text="More Options" aria-label="More Options" data-resin-target="moreoptions" tabIndex="0"> ⋯ </button>
                        </div>
                    </div>
                </li>
            </Fragment>
        );
    }
}

export default FilesTableRow;