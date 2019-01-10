import React, { Component, Fragment } from 'react';
import FilesTableRow from './FilesTableRow';
import FilesTableHeader from './FilesTableHeader';

import _listIcon from '../../media/icons/fl-list-header-actions-list.svg';
import _gridIcon from '../../media/icons/fl-list-header-actions-grid.svg';

import './FilesTable.css'
import FilesTableGrid from './FilesTableGrid';



class FilesTable extends Component {
    state = {
        active_row_id: -1,
        active_dropdown_id: -1,
        is_view_list: false,
        sliderValue: 2,
        filter_active_id: -1,
        filter_is_asc: true,
        filter_data: [
            { title: 'Name',  _className: 'fl-item-name' },
            { title: 'Updated', _className: 'fl-item-updated' },
            { title: 'Size', _className: 'fl-item-size' },
        ],
        table_data: [
            { Id:"87b9a123-0670-4f23-8064-50595d216f47", type: 'folder', name: 'Test Folder 2', updated: 'Bianca Neve', size: 2 },
            { Id:"87b9a123-1670-4f23-2974-85234d216f47", type: 'folder', name: 'Test Folder 1', updated: 'Mohammed Nokri', size: 40 },
            { Id:"87b9a123-2670-4f23-3884-50595d216f47", type: 'folder', name: 'Test Folder 5', updated: 'Zorro Neve', size: 30 },
            { Id:"87b9a123-3670-4f23-4793-50595d216f47", type: 'folder', name: 'Test Folder 4', updated: 'Alex Neve', size: 20 },
            { Id:"87b9b123-0670-4f23-6666-50595d216f47", type: 'txt', name: 'Test Text file', updated: 'Carlo Bacchi', size: 20, src: "https://dataroom-dev.azurewebsites.net/Library/Download/24" },
            { Id:"87b9a123-0670-4f23-7510-50595d216f47", type: 'folder', name: 'Test Folder 9', updated: 'David Zuru', size: 60 },
            { Id:"87b9a123-0670-4f23-8460-50595d216f47", type: 'pdf', name: 'Fin Stat 2015', updated: 'David Anita', size: 29, src: "https://dataroom-dev.azurewebsites.net/Library/Download/8"},
            { Id:"87b9a123-0670-4f23-9362-50595d216f47", type: 'folder', name: 'Test Folder 8', updated: 'David Anita', size: 29 },
            { Id: "87b9a123-0670-4f23-1263-50595d216f47", type: 'image', name: 'Test Image 1', updated: 'David Anita', size: 29, src: "http://static.boxxed.com/boxxed/Media/images/projects/p_12/Preview.jpg", download: "https://dataroom-dev.azurewebsites.net/Library/Download/25"},
            { Id:"87b9a123-0670-4f23-0166-50595d216f47", type: 'pdf', name: 'Fin-Stat 2011', updated: 'David Anita', size: 29, src: "https://dataroom-dev.azurewebsites.net/Library/Download/9" },
        ]
    }

    onClick_filter_handler = (index) => {
        const { table_data, filter_active_id, filter_data, filter_is_asc} = this.state;
        console.log(filter_is_asc, index)

        if (filter_active_id === index) {
            this.setState({
                filter_is_asc: !filter_is_asc,
                table_data: this.dynamicSort_helper([...table_data], filter_data[index].title.toLowerCase(), !filter_is_asc)
            })
        } else {
            if (filter_data[index] != undefined) {
                this.setState({
                    filter_active_id: index,
                    filter_is_asc: true,
                    table_data: this.dynamicSort_helper([...table_data], filter_data[index].title.toLowerCase(), true)
                });
            }
        }
    }
  
    onClick_handler = (index) => {
        this.setState({
            active_row_id: index,
            active_dropdown_id: index
        })
    }

    onClick_ChangeView = (_val) =>{
        this.setState({
            is_view_list: _val
        })
    }

    handleChangeSlider = (event, value) => {
        console.log(value)
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

    render() {
        const { active_row_id, table_data, is_view_list, sliderValue} = this.state;

        return (
            <Fragment>
                    <div className="files-filters-header">
                        <FilesTableHeader filter_active_id={this.state.filter_active_id} filter_is_asc={this.state.filter_is_asc} onClick_handler={this.onClick_filter_handler} filter_data={this.state.filter_data} is_view_list={is_view_list} handleChangeSlider={this.handleChangeSlider} sliderValue={sliderValue}>
                            <div className="fl-list-header-actions">
                                <img className={`fl-list-header-actions-icon ${is_view_list ? 'active' : ''}`} src={_listIcon} alt="list view" onClick={() => this.onClick_ChangeView(true)} />
                                <img className={`fl-list-header-actions-icon ${!is_view_list ? 'active' : ''}`} src={_gridIcon} alt="grid view" onClick={() => this.onClick_ChangeView(false)} />
                            </div>
                        </FilesTableHeader>
                    </div>

                { is_view_list ?
                        <ol className="file_list" >
                            {table_data.map((row, index) => {
                                return (
                                    <FilesTableRow {...row} key={index} is_active={active_row_id === row.Id ? true : false} onClick_handler={() => this.onClick_handler(row.Id)}  />
                                );
                            })}
                        </ol>
                    :
                    <div className={`grid-view-content grid-size-${sliderValue+1} `}>
                        <FilesTableGrid data={table_data} is_active={active_row_id} onClick_handler={(_index) => this.onClick_handler(_index)}  />
                    </div>
                }
               
            </Fragment>
        );
    }
}

export default FilesTable;