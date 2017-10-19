import React,{Component} from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import ToggleButton from './ToggleButton';

export class MatchingRequestForm extends Component{
    constructor(props){
        super(props);
    }

    renderAvailability(){
        const { availability } = this.props;
        if(availability == null){
            return <Typography  align="center" type="title" style={{fontWeight: '100'}}>This user doesn't have any time available :(</Typography>
        } else{
            const weekDay=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            return availability.map((singleAvailability, index) => {
                return <div key={index}>
                            <h3>{weekDay[index]}</h3>
                            {singleAvailability.map((availabilityHours,index)=>{
                                if(!availabilityHours.isFilled)
                                    return <ToggleButton key={index}>{`${availabilityHours.startingTime} - ${availabilityHours.endingTime}`}</ToggleButton>
                            })}
                        </div>
            });
        }
    }

    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Typography  align="center" type="title" style={{fontWeight: '100',marginTop:'24px',marginBottom:32}}>Send Duo Request</Typography>
                {this.renderAvailability}
            </div>
        );
    }
}

function styles(theme){
    return ({
        root:{
        }
    });
}

export default withStyles(styles)(MatchingRequestForm);