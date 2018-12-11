import React, { Component, Fragment } from 'react';
import FilesTableRow from './FilesTableRow';
import FilesTableHeader from './FilesTableHeader';

import _listIcon from '../../media/icons/fl-list-header-actions-list.svg';
import _gridIcon from '../../media/icons/fl-list-header-actions-grid.svg';

import './FilesTable.css'


class FilesTable extends Component {
    state = {
        active_row_id: -1,
        filter_active_id: 0,
        filter_is_asc: true,
        filter_data: [
            { title: 'Name',  _className: 'fl-item-name' },
            { title: 'Updated', _className: 'fl-item-updated' },
            { title: 'Size', _className: 'fl-item-size' },
        ],
        table_data: [
            { type: 'folder', name: 'Test Folder 2', updated: 'Bianca Neve', size: 20 },
            { type: 'folder', name: 'Test Folder 1', updated: 'Mohammed Nokri', size: 40 },
            { type: 'folder', name: 'Test Folder 5', updated: 'Zorro Neve', size: 20 },
            { type: 'folder', name: 'Test Folder 4', updated: 'Alex Neve', size: 20 },
        ]
    }

    componentDidMount() {
        const { table_data, filter_active_id, filter_data, filter_is_asc } = this.state;
        this.dynamicSort_helper([...table_data], filter_data[filter_active_id].title.toLowerCase(), filter_is_asc);
    }

    onClick_filter_handler = (index) => {
        const { table_data, filter_active_id, filter_data, filter_is_asc } = this.state;

        this.dynamicSort_helper([...table_data], filter_data[filter_active_id].title.toLowerCase(), !filter_is_asc)

        if (this.state.filter_active_id === index) {
            this.setState({
                filter_is_asc: !filter_is_asc,
            })
        } else {
            this.setState({
                filter_active_id: index,
                filter_is_asc: true,
            });
        }
    }
  
    onClick_handler = (index) => {
        this.setState({
            active_row_id: index
        })
    }

    dynamicSort_helper = (_data, nameOfFilter, filter_is_asc) => {
        if (filter_is_asc) {
            _data.sort((a, b) => {
                if (a[nameOfFilter] < b[nameOfFilter]) { return -1; }
                if (a[nameOfFilter] > b[nameOfFilter]) { return 1; }
                return 0;
            })
        } else {
            _data.reverse((a, b) => {
                if (a[nameOfFilter] < b[nameOfFilter]) { return -1; }
                if (a[nameOfFilter] > b[nameOfFilter]) { return 1; }
                return 0;
            });
        }

        this.setState({
            table_data: _data
        });
    }

    render() {
        const { active_row_id, table_data} = this.state;

        return (
            <Fragment>
                <div>
                    <ol className="file_list fl-list-header"  >
                        <FilesTableHeader filter_active_id={this.state.filter_active_id} filter_is_asc={this.state.filter_is_asc} onClick_handler={this.onClick_filter_handler} filter_data={this.state.filter_data}>
                            <div className="fl-list-header-actions">
                                <img className="fl-list-header-actions-icon" src={_listIcon} alt="list view" />
                                <img className="fl-list-header-actions-icon" src={_gridIcon} alt="grid view" />
                            </div>
                        </FilesTableHeader>
                    </ol>
                    <ol className="file_list"  >
                        {table_data.map((row, index) => {
                            return (
                                <FilesTableRow {...row} key={index} is_active={active_row_id === index ? true : false} onClick_handler={() => this.onClick_handler(index)}  />
                            );
                        })}
                    </ol>
                </div>
            </Fragment>
        );
    }
}

export default FilesTable;