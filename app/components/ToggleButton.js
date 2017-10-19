import React, {Component} from 'react';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';

export class ToggleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggled: false
        };
        this.handleToggleClick = this
            .handleToggleClick
            .bind(this);
    }

    handleToggleClick() {
        this.setState({
            ...this.state,
            toggled: !this.state.toggled
        });
    }

    render() {
        const {classes, children} = this.props;
        const {toggled} = this.state;
        return (
            <Button disableRipple
                classes={{root:toggled
                ? classes.toggled
                : classes.root}}
                onClick={this.handleToggleClick}>{children}</Button>
        );
    }
}

function styles(theme){
    return ({
        root: {
            fontWeight: '600',
            marginTop: 8,
            borderStyle:'solid',
            borderWidth:2,
            borderColor: '#fafafa',
            color: '#fafafa',
            padding: "16px 32px",
            borderRadius:50,
            transition: "0.2s ease-in-out"
        },
        toggled: {
            fontWeight: '600',
            marginTop: 8,
            borderStyle:'solid',
            borderWidth:2,
            borderColor: theme.palette.primary[500]+" !important",
            backgroundColor: theme.palette.primary[500]+" !important",
            color: "#fafafa",
            padding: "16px 32px",
            borderRadius:50,
            transition: "0.2s ease-in-out"
        }
    });
};

export default withStyles(styles)(ToggleButton);