import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    }
});
class Signout extends Component {
    componentDidMount() {
        this.props.Signout();
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.heroUnit}>
                <div className={classes.heroContent}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom> Sorry to see you go! </Typography>
                    <Typography variant="h6" align="center" color="textSecondary" paragraph>
                        Something short and leading about the collection below—its contents, the creator, etc.
                        Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                        entirely.
                    </Typography>
                    <div className={classes.heroButtons}>
                        <Grid container spacing={16} justify="center">
                            <Grid item>
                                <Button variant="contained" color="primary"> Main call to action </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="primary"> Secondary action </Button>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(withStyles(styles)(Signout));

