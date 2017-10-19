import React, {Component} from 'react';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import App from './App';
import {withRouter} from 'react-router-dom';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';

export class LogIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
    
    handleUserChange(e){
        this.setState({
            ...this.state,
            username: e.target.value
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
        this.props.history.push("/home");
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.container} style={{
                height: '100vh',}}>
                <form className={classes.container} style={{
                background:'transparent'}}
                    onSubmit={this.handleSubmit.bind(this)}>
                    <img src="../../assets/images/ChallengerOutline.svg" width="200" style={{marginBottom:56}}/>
                    <Input
                        label="User"
                        placeholder="User"
                        classes={{
                            root: classes.textField,
                            focused: classes.focused
                        }}
                        value = {this.state.username}
                        onChange={this.handleUserChange}
                        margin="normal"/>
                    <Input
                        label="Password"
                        placeholder="Password"
                        type="password"
                        classes={{
                            root: classes.textField,
                            focused: classes.focused
                        }}
                        onChange={this.handlePasswordChange}
                        value = {this.state.password}
                        margin="normal"/>
                    <Button type="submit" color="primary" raised className={classes.Button}>Log-in</Button>
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
        background: "url('../../assets/images/Background.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 312,
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
        width: 312
    },
    Button:{
        fontWeight:'600',
        marginTop:32,
        width:312,
        borderRadius:'50px',
        boxShadow:'none',
        color:"#fafafa",
        padding:"20px 24px"
    }
});

export default withRouter(withStyles(styles)(LogIn));