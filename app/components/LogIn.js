import React, {Component} from 'react';
import Input,{ InputLabel, InputAdornment } from 'material-ui/Input';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import Button from 'material-ui/Button';
import {withRouter} from 'react-router-dom';
import Typography from 'material-ui/Typography';
import {Link} from 'react-router-dom';
import {withStyles} from 'material-ui/styles';
import {startLogin} from '../actions';
import IconButton from 'material-ui/IconButton';
import {connect} from 'react-redux';

export class LogIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: '',
            showPassword:false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
    
    handleUserChange(e){
        this.setState({
            ...this.state,
            email: e.target.value
        })
    }
    
    handlePasswordChange(e){
        this.setState({
            ...this.state,
            password: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const {email,password} = this.state;
        this.props.login(email, password);
    }

    handleClickShowPassword(){
        this.setState({ showPassword: !this.state.showPassword });
    };

    handleMouseDownPassword(event){
        event.preventDefault();
    };
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.container} style={{
                height: '100vh',}}>
                <form className={classes.container} style={{
                background:'transparent'}}
                    onSubmit={this.handleSubmit}>
                    <img src="/images/ChallengerOutline.svg" width="200" style={{marginBottom:56}}/>
                    <Input
                        label="E-mail"
                        placeholder="E-mail"
                        classes={{
                            root: classes.textField,
                            focused: classes.focused
                        }}
                        type="email"
                        value = {this.state.email}
                        onChange={this.handleUserChange}
                        margin="normal"/>
                    <Input
                        label="Password"
                        placeholder="Password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        classes={{
                            root: classes.textField,
                            focused: classes.focused
                        }}
                        onChange={this.handlePasswordChange}
                        value = {this.state.password}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            onClick={this.handleClickShowPassword.bind(this)}
                            onMouseDown={this.handleMouseDownPassword}
                            >
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                        }
                        margin="normal"/>
                    <Button type="submit" color="primary" raised className={classes.Button}>Log-in</Button>
                    <Typography> Don't have an account? <Link to="/signup"style={{textDecoration:'underline',color:'#fafafa'}}>Register!</Link></Typography>
                </form>
            </div>
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
        background: "url('/images/Background.png')",
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
        fontWeight:'600',
        marginTop:32,
        width:'80vw',
        borderRadius:'50px',
        boxShadow:'none',
        color:"#fafafa",
        padding:"20px 24px"
    }
});

function mapStateToProps(state){
    return{};
}

function mapDispatchToProps(dispatch){
    return{
        login: (email,password) => {
            dispatch(startLogin(email,password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(LogIn)));