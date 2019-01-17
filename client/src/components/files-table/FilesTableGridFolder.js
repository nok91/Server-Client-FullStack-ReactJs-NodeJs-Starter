import React, { Component } from 'react';
import FilesDropDown from './FilesDropDown';
import folder_icon from '../../media/icons/folder-icon.svg';

class FilesTableGridFolder extends Component {
    state = {
        is_active: false,
    }

    componentDidMount(){
      
    }


    componentWillUnmount () {
        console.log("componentWillUnmount")
        this.setState({
            dropdown_is_open: false
        })
    }

    onClick_handler () {
        this.setState({
            is_active: true
        })
    }

    render() {
        const { item, is_active, onClick_handler } = this.props;
        return (
            <React.Fragment>
                <div className={`grid-view-item is-folder  ${is_active ? 'active' : ''}`} onClick={(e) => { onClick_handler(item.Id, e);} } >
                    <div className="grid-view-item-info ">
                        <img className="grid-view-item-info-icon" src={folder_icon} width="32" height="32" alt="logo folder icon" />

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

export default FilesTableGridFolder;