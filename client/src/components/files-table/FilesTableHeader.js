import React, { Component, Fragment } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import FilesTableHeaderFilter from './FilesTableHeader_filter';
import Slider from '@material-ui/lab/Slider';

class FilesTableHeader extends Component {

    state = {
        sortby: '',
        open: false,
        value: 1,
    };

    

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.onClick_handler(event.target.value)
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    render() {
        const { children, filter_active_id, filter_is_asc, onClick_handler, filter_data, is_view_list, sliderValue, handleChangeSlider} = this.props;
        const { value } = this.state;

        return (
            <Fragment>
                {is_view_list ?
                    <ol className="file_list fl-list-header"  >
                        <li className={`fl-item-wrapper noselect`} >
                            <div className="fl-item-row">
                                <div className="fl-item-icon-wrapper " >
                                    <div className="fl-item-icon is-image-loaded"> &nbsp; </div>
                                </div>

                                {filter_data.map((item, index, arr) => {
                                    return (
                                        <FilesTableHeaderFilter {...item} isActive={filter_active_id === index} filter_is_asc={filter_is_asc} key={index} onClickHandler={() => onClick_handler(index)} isLastChild={(arr.length - 1 === index)} />
                                    );
                                })}
                            </div>
                        </li>
                    </ol>
                :

                    <div className="filter-grid-container">
                        <FormControl style={{ minWidth: 120 }}>
                            <InputLabel htmlFor="demo-controlled-open-select">Sort by</InputLabel>
                            <Select
                                className="select-filter"
                                open={this.state.open}
                                onClose={this.handleClose}
                                onOpen={this.handleOpen}
                                value={this.state.sortby}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'sortby',
                                    id: 'demo-controlled-open-select',
                                }}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {filter_data.map((item, index, arr) => {
                                    return (
                                        <MenuItem value={index} key={index}>{item.title}</MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>

                        <Slider
                            className="filter-grid-slider"
                            style= {{maxWidth : 150}}
                            value={sliderValue}
                            min={0}
                            max={4}
                            step={2}
                            onChange={handleChangeSlider}
                        />
    
                    </div>             
               
                }

                {children}
                
            </Fragment>
        );
    }
}

export default FilesTableHeader;