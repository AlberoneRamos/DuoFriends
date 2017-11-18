import React,{Component} from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form'
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import TextField from '../reduxFormComponents/TextField';
import {FormControl} from 'material-ui/Form';
import 'react-times/css/material/default.css';
import TimePicker from 'react-times';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';

export class AddAvailability extends Component{
    constructor(props){
        super(props);
        this.state = {
            numOfFields: [0]
        };
        this.renderMembers = this.renderMembers.bind(this);
        this.addAvailability = this.addAvailability.bind(this);
    }

    addAvailability(){
        this.setState({
            numOfFields:numOfFields.push(numOfFields[numOfFields.length]+1)
        });
    }

    renderMembers({ meta: { touched, error } }){
        const {numOfFields} = this.state;
        return (<ul>
            <li>
            {touched && error && <span>{error}</span>}
            </li>
            {numOfFields.map((member, index) =>
            <li key={index}>
                <h4>Member #{index + 1}</h4>
                <Field name={`${member}.weekday`} type="text" component='input' label="First Name"/>
                <Field name={`${member}.lastName`} type="text" component='input' label="Last Name"/>
                <Button onClick={() => fields.remove(index)}>-</Button>
            </li>
            )}
        </ul>);
    }


    render(){
        const { classes,handleSubmit,handleNext,handleBack} = this.props;
        return( 
            <form className={classes.container} onSubmit={ handleSubmit(handleNext) } style={{
            background:'transparent'}}>
                <FieldArray name="members" component={this.renderMembers}/>
                <Button dense className={classes.ButtonLeft} onClick = { handleBack } > Back {<KeyboardArrowLeft/>}</Button>
                <Button dense type="submit" className={classes.ButtonRight} > Next {<KeyboardArrowRight/>}</Button>
            </form>
        );
    }
}

const styles = theme => ({
    container: {
        display: 'flex',
        width: '100%',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center', 
        background: "url('../../assets/images/Background.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '80vw',
        color: '#fafafa',
        "&:before": {
            backgroundColor: '#fafafa'
        },
        "&:placeholder": {
            color: '#fafafa'
        },
        margin: '15px'
    },
    focused: {
        "&:after": {
            backgroundColor: theme.palette.primary[500]
        }
    },
    menu: {
        width: '80vw'
    },
    ButtonRight:{
        position: 'fixed',
        bottom: '10px',
        right: '5vw',
    },
    ButtonLeft:{
        position: 'fixed',
        bottom: '10px',
        left: '5vw',
    }
});

export default reduxForm({
    form: 'signup',
    destroyOnUnmount: false,
  })(withStyles(styles)(AddAvailability));