import React, {Component} from 'react';
import {connect} from 'react-redux';
import List from 'material-ui/List';
import Input,{InputAdornment} from 'material-ui/Input';
import Select from 'material-ui/Select';
import User from './User';
import SearchIcon from 'material-ui-icons/Search';
import FilterIcon from 'material-ui-icons/FilterList';
import Collapse from 'material-ui/transitions/Collapse';
import { Field, reduxForm } from 'redux-form'
import {MenuItem} from 'material-ui//Menu';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import {getUsers} from '../../actions';

export class UserList extends Component {

    constructor(props){
        super(props);
        this.state = {
            open: false,
            search:{
                playername:'',
                roles:[],
                ranks:[],
                playstyles:[],
            }
        }
    }

    renderUserList(users) {
        return users
        .filter( user => this.state.search.playername != '' ? user.nickName.toLowerCase().includes(this.state.search.playername.toLowerCase()) : true)
        .filter( user => this.state.search.roles.length > 0 ? this.state.search.roles.includes(user.mainRole) : true)
        .filter( user => this.state.search.ranks.length > 0 ? this.state.search.ranks.includes(user.league) : true)
        .filter( user => this.state.search.playstyles.length > 0 ? this.state.search.playstyles.includes(user.playStyle) : true)
        .map((user,index) => {
                return <User key={index} {...user}/>
            });

    }

    toggleAdvancedFilter(){
        this.setState({
            open: !this.state.open
        });
    }

    componentWillMount(){
        this.props.getUsers();
    }

    submit(values){
        console.log(values);
    }

    handleChangeSearch(searchParameter,e){
        e.preventDefault();
        this.setState({
            search:{
                ...this.state.search,
                [searchParameter]:e.target.value
            }
        });
    }

    render() {
        const {handleSubmit,classes} = this.props;
        const roles = ["Top","Mid","Jungle","Bot","Support","Fill"];
        const ranks = ["Bronze","Silver","Gold","Platinum","Diamond","Master","Challenger"];
        const playstyles = ["Casual","Competitive"];
        return (
            <div>
                <div style={{backgroundColor:"#0f1015"}}>
                    <Input startAdornment={
                        <InputAdornment position="start"  className={classes.iconCenter}>
                            <SearchIcon/>
                        </InputAdornment>
                        } name="playername" placeholder="Player name..." onChange={(e)=>{this.handleChangeSearch('playername',e)}} disableUnderline style={{width: '75vw', marginRight:"0px !important"}} value={this.state.search.playername} classes={{root:classes.searchInput,focused:classes.searchInput,input:classes.input}} />
                    <IconButton onClick={()=>{this.toggleAdvancedFilter()}}>
                        <FilterIcon className={this.state.open ? classes.advancedSearchOpen : {}}/>
                    </IconButton>
                <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
                        <Select style={{width:'24vw'}} name="role" value={this.state.search.roles} onChange={(e)=>{this.handleChangeSearch('roles',e)}} multiple disableUnderline className={classes.multipleSelect}>
                            {roles.map(role => (
                                <MenuItem key={role} value={roles.indexOf(role)+1}>
                                    {role}
                                </MenuItem>
                            ))}
                        </Select>
                        <Select style={{width:'24vw'}} name="rank" value={this.state.search.ranks} onChange={(e)=>{this.handleChangeSearch('ranks',e)}} multiple disableUnderline className={classes.multipleSelect}>
                            {ranks.map(rank => (
                                <MenuItem key={rank} value={rank.toUpperCase()}>
                                    {rank}
                                </MenuItem>
                            ))}
                        </Select>
                        <Select style={{width:'24vw'}} name="playstyle" value={this.state.search.playstyles} onChange={(e)=>{this.handleChangeSearch('playstyles',e)}} multiple disableUnderline className={classes.multipleSelect}>
                            {playstyles.map(playstyle => (
                                <MenuItem key={playstyle} value={playstyles.indexOf(playstyle)+1}>
                                    {playstyle}
                                </MenuItem>
                            ))}
                        </Select>
                </Collapse>
                </div>
                <List style={{paddingBottom:'8vh'}}>
                    {this.renderUserList(this.props.users)}
                </List>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {users: state.users};
}

function mapDispatchToProps(dispatch){
    return{
        getUsers: () => {
            dispatch(getUsers())
        }
    }
}

const styles = theme => ({
    searchInput:{
        marginLeft: theme.spacing.unit,
        padding:'0px 8px 0px 8px !important',
        borderRadius: '20px',
        margin:'8px 8px',
        backgroundColor: theme.palette.secondary[400],
        '&:before':{
            content: 'none'
        },
        alignItems: 'center',
    },
    multipleSelect:{
        marginLeft: theme.spacing.unit,
        padding:'0px 8px 0px 8px !important',
        borderRadius: '20px',
        margin:'8px 8px',
        backgroundColor: theme.palette.secondary[400],
        '&:before':{
            content: 'none'
        },
        alignItems: 'center',
        width: '25vw',
        display: 'inline-block',
        alignSelf: 'center',
    },
    advancedSearchOpen:{
        color: theme.palette.primary[500]
    },
    input:{
        padding:'8px 0px !important',
    },
    iconCenter:{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        pointerEvents: 'none',
        justifyContent: 'center',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'search'
  })(withStyles(styles)(UserList)));
