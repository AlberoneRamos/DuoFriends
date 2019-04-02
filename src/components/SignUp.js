import React, {Component} from 'react';
import PersonalInfo from './SignUpSteps/PersonalInfo';
import {withStyles} from 'material-ui/styles';

export class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0
        };
        // this.handleNext = this.handleNext.bind(this);
        // this.handleBack = this.handleBack.bind(this);
        // this.getCurrentPage = this.getCurrentPage.bind(this);
    }

    // handleNext() {
    //     this.setState({
    //         activeStep: this.state.activeStep + 1
    //     });
    // };

    // handleBack() {
    //     this.setState({
    //         activeStep: this.state.activeStep - 1
    //     });
    // };

    // getCurrentPage(){
    //     switch (this.state.activeStep) {
    //         case 0:
    //             return <PersonalInfo handleNext={this.handleNext.bind(this)}/>
    //         case 1:
    //             return <AddAvailability handleNext={this.handleNext.bind(this)} handleBack={this.handleBack.bind(this)}/>
    //     }
    // }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <PersonalInfo/>
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
        height:'100vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }
});


export default withStyles(styles, { withTheme: true })(SignUp);