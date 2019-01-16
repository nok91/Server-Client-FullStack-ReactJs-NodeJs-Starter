import React, { Component } from 'react';



import FilesTableGridFolder from './FilesTableGridFolder';
import FilesTableGridFile from './FilesTableGridFile';

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

    onClick_dropdown_Handler = () => {
        this.setState({
            dropdown_is_open: !this.state.dropdown_is_open
        })
    }

 

    render() {
        const { is_active, onClick_handler } = this.props;
        
        return (
            <React.Fragment>
             
                    <h3 className="grid-item-type-heading">FOLDERS</h3>
                    <div className="grid-view-items">
                        {this.selectByFolder_helper(true).map((el, index) => {
                            return (
                                // <div className={`grid-view-item is-folder  ${is_active === el.Id ? 'active' : ''}`} key={index} onClick={() => onClick_handler(el.Id)}>
                                //     <div className="grid-view-item-info ">
                                //         <img className="grid-view-item-info-icon" src={folder_icon} width="32" height="32" alt="logo folder icon" />

                                //         <div className="grid-view-item-info-details">
                                //             <div className="grid-view-item-info-details-list-name">{el.name}</div>
                                //             <div className="grid-view-item-info-details-list-date">Today by {el.updated}</div>
                                //             <div className="grid-view-item-info-details-list-size">{el.size} File</div>
                                //         </div>

                                //         <FilesDropDown is_active={is_active === el.Id} dropdown_is_open={this.state.dropdown_is_open} active_dropdown_id={active_dropdown_id} onClickDropDown_handler={this.onClickDropDown_handler}  />
                                //     </div>

                                // </div>
                                <FilesTableGridFolder item={el} key={index} is_active={is_active === el.Id} onClick_handler={(_item) => onClick_handler(_item)}  />
                            );
                        })}
                    </div>
                    <h3 className="grid-item-type-heading">FILES</h3>
                    <div className="grid-view-items ">
                        {this.selectByFolder_helper(false).map((el, index) => {
                            return (
                                // <div className={`grid-view-item ${is_active === el.Id ? 'active' : ''}`} key={index} onClick={() => onClick_handler(el.Id)}>
                                //     <div className="grid-view-item-thumbnail">
                                //         {this.renderFiles(el)}
                                //     </div>
                                //     <div className="grid-view-item-info">
                                //         <div className="grid-view-item-info-details">
                                //             <div className="grid-view-item-info-details-list-name">{el.name}</div>
                                //             <div className="grid-view-item-info-details-list-date">Today by {el.updated}</div>
                                //             <div className="grid-view-item-info-details-list-size">{el.size} File</div>
                                //         </div>

                                //         <FilesDropDown is_active={is_active === el.Id} dropdown_is_open={this.state.dropdown_is_open} active_dropdown_id={active_dropdown_id} onClickDropDown_handler={this.onClickDropDown_handler}  />
                                //     </div>
                                // </div>
                                <FilesTableGridFile item={el} key={index} is_active={is_active === el.Id} onClick_handler={(_item) => onClick_handler(_item)}  />
                            );
                        })}
                    </div>

         
            </React.Fragment>
        );
    }
}

export default FilesTableGrid;