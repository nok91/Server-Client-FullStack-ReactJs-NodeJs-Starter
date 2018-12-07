import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import './Header.css';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Header extends Component {
    renderLinks() {
        if (this.props.authenticated){ //if authenticated
            return (
                <React.Fragment>
                    <Button color="inherit"> <Link className="AppBar_Link" to="/signout"> Sign Out</Link></Button>  
                    <Button color="inherit"> <Link className="AppBar_Link" to="/features"> Features  </Link> </Button>
                </React.Fragment>
            )
        }else{
            return (
                <React.Fragment>
                    <Button color="inherit"><Link className="AppBar_Link" to="/signup"> Sign Up </Link></Button> 
                    <Button color="inherit"><Link className="AppBar_Link" to="/signin">  Sign In </Link></Button> 
                </React.Fragment>
            );
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.root}>
                    <AppBar position="sticky">
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                <Link className="AppBar_Link" to="/">Home</Link>
                            </Typography>
                            {this.renderLinks()}
                        </Toolbar>
                    </AppBar>
                </div>
            </div>
        );
    }
}
Header.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}
export default connect(mapStateToProps)(withStyles(styles)(Header));