import React, {Component} from 'react';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';

export class ToggleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        const {classes, children, toggled} = this.props;
        this.setState({
            toggled: toggled
        });
        return (
            <Button disableRipple
                classes={{root:this.props.toggled
                ? classes.toggled
                : classes.root}} onClick={this.props.onClick}>{children}</Button>
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
            padding: "10px 12px",
            margin:"0px 8px 0px 0px",
            borderRadius:5,
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
            padding: "10px 12px",
            margin:"0px 8px 0px 0px",
            borderRadius:5,
            transition: "0.2s ease-in-out"
        }
    });
};

export default withStyles(styles)(ToggleButton);