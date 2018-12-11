import React, { Component, Fragment } from 'react';


import FilesTableHeader_filter from './FilesTableHeader_filter';

class FilesTableHeader extends Component {

    render() {
        const { children, filter_active_id, filter_is_asc, onClick_handler, filter_data} = this.props;

        return (
            <Fragment>
                <li className={`fl-item-wrapper noselect`} >
                    <div className="fl-item-row">
                        <div className="fl-item-icon-wrapper " >
                            <div className="fl-item-icon is-image-loaded">
                                &nbsp;
                            </div>
                        </div>

                        {filter_data.map((item, index, arr) => {
                            return (
                                <FilesTableHeader_filter {...item} isActive={filter_active_id === index} filter_is_asc={filter_is_asc} key={index} onClickHandler={() => onClick_handler(index)} isLastChild={(arr.length - 1 === index)} />
                            );
                        })}
                    </div>

                    {children}
                </li>
            </Fragment>
        );
    }
}

export default FilesTableHeader;