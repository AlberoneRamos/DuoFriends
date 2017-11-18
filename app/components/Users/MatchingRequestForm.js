import React,{Component} from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import ToggleButton from '../generalComponents/ToggleButton';
import keyIndex from 'react-key-index';
import _ from 'lodash';
import {startSendRequest, broadcastSuccessMessage} from '../../actions';

export class MatchingRequestForm extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            open: false,
            vertical: null,
            horizontal: null,
            availability:[]
        }
    }

    componentWillReceiveProps(nextProps){
        var { availability } = nextProps;
        if(availability == null){
            return <Typography  align="center" type="title" style={{fontWeight: '100'}}>This user doesn't have any time available :(</Typography>
        } else{
            for(var i in availability){
                availability[i].toggled = false;
            }
            this.setState({
                ...this.state,
                availability:availability
            });
        }
    }
    
    handleCloseForm(){
        if (typeof this.props.closeFunction === 'function') {
            this.props.closeFunction();
        }
    }

    handleSubmit(e){
        e.preventDefault();
        var selected = Object.keys(this.state.availability).map((av)=>{
            return{
                ...this.state.availability[av],
                id:av
            }
        }).filter((av)=> av.toggled === true);
        if(selected.length > 0){
            this.props.dispatch(startSendRequest(selected,this.props.userId));
            if (typeof this.props.closeFunction === 'function') {
                this.props.closeFunction();
            }
            this.props.dispatch(broadcastSuccessMessage('Request sent'));
        }
    }
    
    handleToggle(id){
        var newAvailability = this.state.availability;
        for(var i in newAvailability){
            if(i == id){
                newAvailability[i].toggled = !newAvailability[i].toggled;
            }
        }
       
        this.setState({
            ...this.state,
            availability:newAvailability
        });
    }

    renderAvailability(){
        var availability  = this.state == null ? null : this.state.availability ;
        if(availability == null){
            return <Typography  align="center" type="title" style={{fontWeight: '100'}}>This user doesn't have any time available :(</Typography>
        } else{
            availability = Object.keys(availability).map((av,index)=>{
                    return {
                            ...availability[av],
                            toggled:false,
                            id:av
                        }
                });
            availability = _.mapValues(_.groupBy(availability, 'dayOfWeek'), clist => clist.map(av => _.omit(av, 'dayOfWeek')));

            return Object.keys(availability).map((weekday)=>{
                return <div key={weekday}>
                    <Typography type="subheading">{weekday}</Typography>
                    {availability[weekday].map((availabilityHours,index)=>{
                        if(!availabilityHours.isFilled)
                            return <ToggleButton key={availabilityHours.id} toggled={this.state.availability[availabilityHours.id].toggled} onClick={this.handleToggle.bind(this,availabilityHours.id)}>{`${availabilityHours.startingTime} - ${availabilityHours.endingTime}`}</ToggleButton>
                    })}
                </div>
             });
            
            }
    }


    render(){
        const { classes } = this.props;
        return(
            <form onSubmit={this.handleSubmit}>
                <div style={{textAlign:'left',height:'50vh',overflowY:'scroll',margin:'2vh 4vw 0vh 4vw'}}>
                    {this.renderAvailability()}
                </div>
                <Divider/>
                <div className={classes.buttonContainer}>
                    <Button className={classes.button} onClick={this.handleCloseForm.bind(this)} style={{border:"2px solid #fafafa",color:"#fafafa",fontWeight:'bold'}}>Cancel</Button>
                    <Button color="primary" raised className={classes.button} style={{color:'#fafafa'}} type="submit">Send</Button>
                </div>
            </form>
        );
    }
}

function styles(theme){
    return ({
        buttonContainer:{
            textAlign:'left',
            height:'10vh',
            display:'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        button:{
            margin:'0vw 2.5vw',
            padding:'4vw 20vw',
            fontWeight:'medium',fontWeight:'bold'
        }
    });
}

export default withStyles(styles)(MatchingRequestForm);


