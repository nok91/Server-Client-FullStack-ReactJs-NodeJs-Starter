import React, { Component, Fragment } from 'react';
import FilesTableRow from './FilesTableRow';
import FilesTableHeader from './FilesTableHeader';

import _listIcon from '../../media/icons/fl-list-header-actions-list.svg';
import _gridIcon from '../../media/icons/fl-list-header-actions-grid.svg';

import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';

import './FilesTable.css'
import FilesTableGrid from './FilesTableGrid';

import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    link: {
      display: 'flex',
    },
    icon: {
      marginRight: theme.spacing.unit / 2,
      width: 20,
      height: 20,
    },
});

class FilesTable extends Component {
    state = {
        active_row_id: -1,
        arraySelectsRow: [],
        dropdown_is_open: false,
        is_view_list: true,
        sliderValue: 2,
        filter_active_id: -1,
        filter_is_asc: true,
        table_data: {},
        filter_data: [
            { title: 'Name',  _className: 'fl-item-name' },
            { title: 'Updated', _className: 'fl-item-updated' },
            { title: 'Size', _className: 'fl-item-size' },
        ],
    }

    componentWillMount () {

        this.setState({
            table_data: this.props.table_data
        })
    }


    onClick_filter_handler = (index) => {
        const {table_data, filter_active_id, filter_data, filter_is_asc} = this.state;

        if(table_data.files != undefined) {
            if (filter_active_id == index) {
                this.setState({
                    filter_is_asc: !filter_is_asc,
                    table_data: {...this.state.table_data, ...{files: this.dynamicSort_helper([...this.state.table_data.files], filter_data[index].title.toLowerCase(), !filter_is_asc)}}
                })
            }else {
                if (filter_data[index] !== undefined) {
                    this.setState({
                        filter_active_id: index,
                        filter_is_asc: true,
                        table_data: {...this.state.table_data, ...{files: this.dynamicSort_helper([...this.state.table_data.files], filter_data[index].title.toLowerCase(), true)}}
                    });
                }
            }
        }

    }
  
    onClick_handler = (index, e ) => {
        console.log(e.ctrlKey)
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
        const { table_data, active_row_id, is_view_list, sliderValue } = this.state;
        const { getFileHandler, classes} = this.props;

        var root =  this.props.match.path.replace("/:id","");
        
        console.log("root ", table_data);

        return (
            <Fragment>


                    <div style={{  margin: '20px 0px' }}>

                        <Breadcrumbs arial-label="Breadcrumb">
                            {
                                table_data.history &&
                                    table_data.history.map((el, index) => {
                                        return  (
                                            <Link href={`${root}/${el.Id}`} color="inherit" key={index}  className={classes.link}>
                                                {index == 0 &&
                                                    <HomeIcon className={classes.icon} />
                                                }
                                                {el.name}
                                            </Link>
                                        )
                                    })
                            }
                        </Breadcrumbs>
                       
                    </div>

                    {/* <Breadcrumbs arial-label="Breadcrumb">
                        <Link href="#" color="inherit"   className={classes.link}>
                            <HomeIcon className={classes.icon} />
                            Material-UI
                        </Link>
                        <Link href="#" color="inherit"  className={classes.link}>
                            <WhatshotIcon className={classes.icon} />
                            Lab
                        </Link>
                        <Typography color="textPrimary" className={classes.link}>
                            <GrainIcon className={classes.icon} />
                                Breadcrumb
                        </Typography>
                    </Breadcrumbs> */}

                    <div className="files-filters-header">
                        <FilesTableHeader {...this.state}  handleChangeSlider={this.handleChangeSlider} sliderValue={sliderValue} onClick_filter_handler={(index) => this.onClick_filter_handler(index)}>  
                            <div className="fl-list-header-actions">
                                <img className={`fl-list-header-actions-icon ${is_view_list ? 'active' : ''}`} src={_listIcon} alt="list view" onClick={() => this.onClick_ChangeView(true)} />
                                <img className={`fl-list-header-actions-icon ${!is_view_list ? 'active' : ''}`} src={_gridIcon} alt="grid view" onClick={() => this.onClick_ChangeView(false)} />
                            </div>
                        </FilesTableHeader>
                    </div>

                    {
                        is_view_list ?
                            <ol className="file_list" >
                                {table_data.files.map((row, index) => {
                                    return (
                                        <FilesTableRow {...row} {...this.props} key={index} row={row} is_active={active_row_id === row.Id} selectedRows={this.checkIfSelected(row.Id)} onClick_handler={(e) => this.onClick_handler(row.Id, e)} getFileHandler={(props) => getFileHandler(props)}/>
                                    );
                                })}
                            </ol>
                        :
                            <div className={`grid-view-content grid-size-${sliderValue + 1} `}>
                                <FilesTableGrid {...this.props} data={table_data.files} is_active={active_row_id} arraySelectsRow={this.state.arraySelectsRow} checkIfSelected={(_id) => this.checkIfSelected(_id)} onClick_handler={(_index, e) => this.onClick_handler(_index, e)} />
                            </div>
                    }
               
            </Fragment>
        );
    }
}

FilesTable.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(FilesTable);