import React, {Component} from 'react';
import {connect} from 'react-redux';
import List from 'material-ui/List';
import Duos from './Duos';
import Header from '../Header';
import _ from 'lodash';

export class DuosList extends Component {

    renderDuosList() {
        const {duos} = this.props;
        return Object.keys(duos).map((key,index) => {
                return <Duos key={index} {...duos[key]}/>
            })

    }

    render() {
        return (
            <div>
                <List>
                    {this.renderDuosList()}
                </List>
            </div>
        );
    }
}

function mapStateToProps(state) {
    var availabilityArray = Object.keys(state.availability).map((id)=>{
	return {
        ...state.availability[id],
        id
            
    }}).filter(availability => { return availability.userId != undefined });
    availabilityArray = _.mapValues(_.groupBy(availabilityArray, 'userId'), clist => clist.map(av => _.omit(av, 'userId')));
    return {
        duos: Object.keys(availabilityArray).map((id)=>{
            return {
                schedules:[...availabilityArray[id]],
                ...state.users.filter((user) => {return id == user.id})[0],
                requests:null,
                availability:null
            }
        })
    };
}


export default connect(mapStateToProps)(DuosList);
