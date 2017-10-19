import React,{Component} from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

export class MatchingRequestForm extends Component{
    render(){
        const { classes,availability } = this.props;
        return(
            <div className={classes.root}>
                <Typography  align="center" type="title" style={{fontWeight: '100'}}>Send Duo Request</Typography>
            </div>
        );
    }
}

function styles(theme){
    return ({
        root:{
            textAlign:'center',
        }
    });
}

export default withStyles(styles)(MatchingRequestForm);