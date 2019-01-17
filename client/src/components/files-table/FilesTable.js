import React, { Component, Fragment } from 'react';
import FilesTableRow from './FilesTableRow';
import FilesTableHeader from './FilesTableHeader';

import _listIcon from '../../media/icons/fl-list-header-actions-list.svg';
import _gridIcon from '../../media/icons/fl-list-header-actions-grid.svg';

import './FilesTable.css'
import FilesTableGrid from './FilesTableGrid';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import LinearProgress from '@material-ui/core/LinearProgress';

class FilesTable extends Component {
    state = {
        active_row_id: -1,
        arraySelectsRow: [],
        dropdown_is_open: false,
        is_view_list: true,
        sliderValue: 2,
        filter_active_id: -1,
        filter_is_asc: true,
        filter_data: [
            { title: 'Name',  _className: 'fl-item-name' },
            { title: 'Updated', _className: 'fl-item-updated' },
            { title: 'Size', _className: 'fl-item-size' },
        ],
        table_data: []
    }

    componentDidMount() {
        console.log("component did mount!!!");
        this.props.GetFiles((files) => {
            this.setState({
                table_data: files.data
            })
        });

      
    }

    onClick_filter_handler = (index) => {
        const { table_data, filter_active_id, filter_data, filter_is_asc} = this.state;

        if (filter_active_id === index) {
            this.setState({
                filter_is_asc: !filter_is_asc,
                table_data: this.dynamicSort_helper([...table_data], filter_data[index].title.toLowerCase(), !filter_is_asc)
            })
        }else {
            if (filter_data[index] !== undefined) {
                this.setState({
                    filter_active_id: index,
                    filter_is_asc: true,
                    table_data: this.dynamicSort_helper([...table_data], filter_data[index].title.toLowerCase(), true)
                });
            }
        }
    }
  
    onClick_handler = (index, e ) => {
        if (e.ctrlKey) {
            if (this.state.arraySelectsRow.includes(index)) {
                this.setState({
                    arraySelectsRow: this.state.arraySelectsRow.filter(item => item !== index),
                })
            }else{
                this.setState({
                    arraySelectsRow: [...this.state.arraySelectsRow, index],
                })
            }
        } else if (e.shiftKey){
            //TODO: Handle shift key and multi selection

            // startSelecting = false;

            // this.state.arraySelectsRow.forEach(element => {
            //     if (active_row_id === id) {
            //         startSelecting = true;
            //     }
            // });
            
            // console.log("shift key pressed")
        }else{
            this.setState({
                arraySelectsRow: [index],
            })
        }

        this.setState({
            active_row_id: index,
        })
        
    }

    onClick_ChangeView = (_val) =>{
        this.setState({
            is_view_list: _val
        })
    }

    handleChangeSlider = (event, value) => {
        this.setState({ sliderValue: value });
    };

    dynamicSort_helper = (_data, nameOfFilter, filter_is_asc) => {
        if (filter_is_asc) {
            return _data.sort((a, b) => {
                if (a[nameOfFilter] < b[nameOfFilter]) { return -1; }
                if (a[nameOfFilter] > b[nameOfFilter]) { return 1; }
                return 0;
            })
        } else {
            return _data.sort((a, b) => {
                if (a[nameOfFilter] > b[nameOfFilter]) { return -1; }
                if (a[nameOfFilter] < b[nameOfFilter]) { return 1; }
                return 0;
            });
        }
    }

    checkIfSelected = (id) => {
        var exist = false;
        this.state.arraySelectsRow.forEach(element => {
            if (element === id) {
                exist = true;
            }
        });

        return exist;
    }

    render() {
        const { active_row_id, table_data, is_view_list, sliderValue, active_dropdown_id} = this.state;

        return (
            <Fragment>
                    <div className="files-filters-header">
                        <FilesTableHeader filter_active_id={this.state.filter_active_id} filter_is_asc={this.state.filter_is_asc} onClick_handler={this.onClick_filter_handler} filter_data={this.state.filter_data} is_view_list={is_view_list} handleChangeSlider={this.handleChangeSlider} sliderValue={sliderValue} active_dropdown_id={active_dropdown_id}>
                            <div className="fl-list-header-actions">
                                <img className={`fl-list-header-actions-icon ${is_view_list ? 'active' : ''}`} src={_listIcon} alt="list view" onClick={() => this.onClick_ChangeView(true)} />
                                <img className={`fl-list-header-actions-icon ${!is_view_list ? 'active' : ''}`} src={_gridIcon} alt="grid view" onClick={() => this.onClick_ChangeView(false)} />
                            </div>
                        </FilesTableHeader>
                    </div>



                {
                    table_data.length > 0 ?
                    
                        is_view_list ?
                            <ol className="file_list" >
                                {table_data.map((row, index) => {
                                    return (
                                        <FilesTableRow {...row} key={index} is_active={active_row_id === row.Id} selectedRows={this.checkIfSelected(row.Id)} onClick_handler={(e) => this.onClick_handler(row.Id, e)} />
                                    );
                                })}
                            </ol>
                        :
                            <div className={`grid-view-content grid-size-${sliderValue + 1} `}>
                                <FilesTableGrid data={table_data} is_active={active_row_id} arraySelectsRow={this.state.arraySelectsRow} checkIfSelected={(_id) => this.checkIfSelected(_id)} onClick_handler={(_index, e) => this.onClick_handler(_index, e)} />
                            </div>
                    :

                        <LinearProgress />
                }
               
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        errorMessage: state.auth.errorMessage,
    }
}

export default connect(mapStateToProps, actions)(FilesTable);