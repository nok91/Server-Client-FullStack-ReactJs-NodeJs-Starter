import React, { Component, Fragment } from 'react';


import FilesTableRow from './FilesTableRow';

class FilesTable extends Component {
    state = {
        active_row_id: 0
    }
  
    onClick_handler = (index) => {
        this.setState({
            active_row_id: index
        })
    }

    render() {
        const {data} = this.props;
        const { active_row_id} = this.state;
        return (
            <Fragment>
                <ol className="file_list"  >
                    {data.map((row, index) => {
                        return (
                            <FilesTableRow {...row} key={index} is_active={active_row_id === index ? true : false} onClick_handler={() => this.onClick_handler(index)}  />
                        );
                    })}
                </ol>
            </Fragment>
        );
    }
}

export default FilesTable;