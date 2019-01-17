import React, { Component } from 'react';



import FilesTableGridFolder from './FilesTableGridFolder';
import FilesTableGridFile from './FilesTableGridFile';

class FilesTableGrid extends Component {
    componentDidMount () {
        // console.log(this.props.data.filter(el => el.type === 'folder'))
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
        const { is_active, onClick_handler, checkIfSelected } = this.props;
        
        return (
            <React.Fragment>
                    <h3 className="grid-item-type-heading">FOLDERS</h3>
                    <div className="grid-view-items">
                        {this.selectByFolder_helper(true).map((el, index) => {
                            return (
                                <FilesTableGridFolder item={el} key={index} is_active={checkIfSelected(el.Id)} onClick_handler={(_item, e) => onClick_handler(_item, e)}  />
                            );
                        })}
                    </div>
                    <h3 className="grid-item-type-heading">FILES</h3>
                    <div className="grid-view-items ">
                        {this.selectByFolder_helper(false).map((el, index) => {
                            return (
                                <FilesTableGridFile item={el} key={index} is_active={checkIfSelected(el.Id)} onClick_handler={(_item, e) => onClick_handler(_item, e)}  />
                            );
                        })}
                    </div>
            </React.Fragment>
        );
    }
}

export default FilesTableGrid;