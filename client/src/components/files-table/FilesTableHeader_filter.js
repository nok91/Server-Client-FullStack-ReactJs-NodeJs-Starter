import React, { Component, Fragment } from 'react';
import _arrowIcon from '../../media/icons/fl-item-filter-arrow.svg';

class FilesTableHeader_filter extends Component {
    render() {
        const { title, _className, isActive, filter_is_asc, onClickHandler, isLastChild } = this.props;
        return (
            <Fragment>
                <div className={_className} onClick={onClickHandler}>
                    <div className={`fl-item-filter-link ${isActive && 'active'} ${!filter_is_asc && 'desc'} `}>
                        {title}
                        <img className="fl-item-filter-arrow" src={_arrowIcon} alt="filter arrow icon" />
                    </div>
             
                </div>
                {
                    !isLastChild &&
                    <div className="fl-item-resize-handle" />
                }
            </Fragment>
        );
    }
}

export default FilesTableHeader_filter;