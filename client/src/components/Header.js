import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
    renderLinks() {
        if (this.props.authenticated){ //if authenticated
            return (
                <React.Fragment>
                    <Link to="/signout">Sign Out</Link> | 
                    <Link to="/features">Features</Link> 
                </React.Fragment>
            )
        }else{
            return (
                <React.Fragment>
                    <Link to="/signup">Sign Up</Link> | 
                    <Link to="/signin">Sign In</Link>  
                </React.Fragment>
            );
        }
    }
    render() {
        return (
            <div>
                <Link to="/">Redux Auth</Link> | 
                {this.renderLinks()}
                <br />    <br />   
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}
export default connect(mapStateToProps)(Header);