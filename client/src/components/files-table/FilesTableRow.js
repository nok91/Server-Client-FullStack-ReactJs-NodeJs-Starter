import React, { Component, Fragment } from 'react';
import folder_icon from '../../media/icons/folder-icon.svg';
import file_image_icon from '../../media/icons/file-image-icon.svg';
import file_txt_icon from '../../media/icons/file-txt-icon.svg';
import file_pdf_icon from '../../media/icons/file-pdf-icon.svg';
// import file_loader from '../../media/icons/file-loader.svg'
import Button from '@material-ui/core/Button';

class FilesTableRow extends Component {
    state = {
        dropdown_is_open: false
    }

    componentWillUpdate() {
        console.log("here")
        if( this.state.dropdown_is_open === true) {
            // this.setState({
            //     dropdown_is_open: false
            // });
        }
        // this.setState({
        //     dropdown_is_open: false
        // });
    }

    componentWillUnmount(){
        console.log("componentWillUnmount")
    }

    onClick_dropdown_Handler = () => {
        this.setState({
            dropdown_is_open: !this.state.dropdown_is_open
        })
    }

    render() {
        const { updated, name, size, onClick_handler, is_active, type} = this.props;
        const { dropdown_is_open } = this.state;
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
            default:
                icon = folder_icon;
                break;
        }
      
        return (
            <Fragment>
                <li className={`noselect fl-item-wrapper ${is_active  ? 'active' : ''}`} onClick={onClick_handler}>
                    <div className="fl-item-row">
                        <div className="fl-item-icon-wrapper " >
                            <div className="fl-item-icon is-image-loaded" style={{ backgroundImage: `url(${icon})` }} />
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
                            <button className="btn file-list-item-context-menu" aria-haspopup="true" aria-expanded="false" data-type="context-menu-btn" data-tooltip="" data-tooltip-position="top" data-tooltip-text="More Options" aria-label="More Options" data-resin-target="moreoptions" tabIndex="0" onClick={this.onClick_dropdown_Handler}> ⋯ </button>
                        </div>
                    </div>

                    { (is_active) &&
                        <div className={`fl-item-dropdown ${dropdown_is_open ? 'active' : ''}`}>
                            <ul className="fl-item-dropdown_list">
                                <li>First Option</li>
                                <li>Second Option</li>
                                <li>Third Option</li>
                            </ul>
                        </div>
                    }
                   
                </li>
            </Fragment>
        );
    }
}

export default FilesTableRow;