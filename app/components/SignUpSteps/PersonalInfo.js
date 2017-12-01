import React,{Component} from 'react';
import { Field, reduxForm } from 'redux-form'
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import {withStyles} from 'material-ui/styles';
import {MenuItem} from 'material-ui/Menu';
import Input,{InputLabel} from 'material-ui/Input';
import {TextField,Select} from 'redux-form-material-ui';
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
            <form onSubmit={ handleSubmit(this.submit) } style={{
            background:'transparent'}}>
                <Grid container justify="center" spacing={24} alignItems="center">
                    <Grid item xs={10}><Field fullWidth component={TextField} name="username" label="Username" classes={{ root: classes.textField}} margin="normal"/></Grid>
                    <Grid item xs={10}><Field fullWidth component={TextField} name="email" label="Email" classes={{root: classes.textField}} margin="normal"/></Grid>
                    <Grid item xs={10}><Field fullWidth component={TextField} name="password" label="Password" type="password" classes={{ root: classes.textField}} margin="normal"/></Grid>
                    <Grid item xs={10}><Field fullWidth component={TextField} name="confirmPassword" label="Confirm Password" type="password" classes={{root: classes.textField}} margin="normal"/></Grid>
                    <Grid item xs={10}><Field fullWidth component={Select} id="role" name="role" label="Main Role" classes={{root: classes.textField}} margin="normal">
                        <MenuItem value={1}>Top</MenuItem>
                        <MenuItem value={2}>Mid</MenuItem>
                        <MenuItem value={3}>Jungle</MenuItem>
                        <MenuItem value={4}>Bot</MenuItem>
                        <MenuItem value={5}>Support</MenuItem>
                        <MenuItem value={6}>Fill</MenuItem>
                    </Field></Grid>
                    <Grid item xs={10}><Field inputProps={{'aria-label': 'Description',}} fullWidth component={Select} id="role" name="playstyle" label="Main Role" classes={{root: classes.textField}} margin="normal">
                        <MenuItem value={1}>Competitive</MenuItem>
                        <MenuItem value={2}>Casual</MenuItem>
                    </Field></Grid>
                </Grid>
                <Button dense type="submit" className={classes.Button}> Register {<KeyboardArrowRight className={classes.inputLabel}/>}</Button>
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