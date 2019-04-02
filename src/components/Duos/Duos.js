import React, {Component} from 'react';
import {ListItem, ListItemText} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router-dom';
import {withStyles} from 'material-ui/styles';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import Schedule from './Schedule';
import {connect} from 'react-redux';
import {startRemoveDuoSchedule} from '../../actions';
import {getProfileImage} from '../../riotApi/customApi';

export class Duo extends Component {
    constructor(props){
        super(props);
        this.state = {
            isExpanded:false
        }
        this.toggle = this.toggle.bind(this);
    }

    
	toggle(){
         this.setState({
             isExpanded:!this.state.isExpanded
        });
    }

    render() {
        const { id,rank,nickName,schedules,classes } = this.props;
        return(
            <div>
                <ListItem button onClick={() => {this.toggle()}}>
                    <Link to={`players/${id}`}>
                        <Avatar alt={rank} src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${getProfileImage(id)}.png`}></Avatar>
                    </Link>
                    <ListItemText primary={nickName}/>
                    {this.state.isExpanded ? <ExpandLess className={classes.Expand}/> : <ExpandMore className={classes.Expand}/>}
                </ListItem>
                <Collapse className={classes.collapseText} in={this.state.isExpanded} transitionDuration="auto" unmountOnExit>
                    {schedules.map((schedule,index)=> <Schedule {...schedule} key={index} duoId={id}/>)}
                </Collapse>
            </div>
        );
    }
}

const styles = theme => ({
    icon: {
        height: 17,
        verticalAlign: 'top'
    },
    removeIcon: {
        color:'#ef5350'
    },
    secondaryAction:{
        top:'50%',
        marginTop:'-16px',
        right:8
    },
    Expand:{
        color:theme.palette.primary[500]
    },
    ButtonBase:{
        height:36,
        width:36,
        padding:0,
        marginRight:8,
        borderRadius:'100%',
        minWidth:0,
        color:'#fafafa'
    },
    ButtonAccept: {
        backgroundColor : '#05c7a3'
    },
    ButtonRemove: {
        backgroundColor: '#ef5350'
    },
    Avatar:{
        borderRadius:0,
    }

});

function mapStateToProps(state){
    return{}
}

function mapDispatchToProps(dispatch,ownProps){
    return{
        removeDuoSchedule: (id) => {
            dispatch(startRemoveDuoSchedule(id,ownProps.id));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Duo));