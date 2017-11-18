import React,{Component} from 'react';
import { Field, reduxForm } from 'redux-form'
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import TextField from '../reduxFormComponents/TextField';
import {FormControl} from 'material-ui/Form';
import {createUser} from '../../firebase/auth';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

export class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            errorMessage:'',
            successMessage:''
        }
    }

    submit(values){
        createUser(this.email.value, this.pw.value)
        .catch(e => this.setState({
            errorMessage: e
        }));
    }

    render(){
        const { classes,handleSubmit,handleNext} = this.props;
        return( 
            <form className={classes.container} onSubmit={ handleSubmit(this.submit) } style={{
            background:'transparent'}}>
                <Field component={TextField} name="username" label="Username" placeholder="Username" classes={{ root: classes.textField,focused: classes.focused }} margin="normal"/>
                <Field component={TextField} name="email" label="Email" placeholder="Email" classes={{root: classes.textField,focused: classes.focused }} margin="normal"/>
                <Field component={TextField} name="password" label="Password" placeholder="Password" type="password" classes={{ root: classes.textField, focused: classes.focused }} margin="normal"/>
                <Field component={TextField} name="confirmPassword" label="Confirm Password" placeholder="Confirm Password" type="password" classes={{root: classes.textField,focused: classes.focused}} margin="normal"/>
                <Button dense type="submit" className={classes.Button}> Next {<KeyboardArrowRight/>}</Button>
            </form>
        );
    }
}

const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = 'Required'
    } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if(values.password !== values.confirmPassword){
        errors.password = "Passwords must match!";
        errors.confirmPassword = "Passwords must match!";
    }
    if(!values.password){
        errors.password = "Required";
    }
    if(!values.confirmPassword){
        errors.confirmPassword = "Required";
    }
    return errors
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
    Button:{
        position: 'fixed',
        bottom: '10px',
        right: '5vw',
    }
});

export default reduxForm({
    form: 'signup',
    validate,
    destroyOnUnmount: false,
  })(withStyles(styles)(SignUp));