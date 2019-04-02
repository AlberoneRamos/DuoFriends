import React, { Component } from 'react';
import ToggleStar from 'material-ui-icons/Star';
import ToggleStarBorder from 'material-ui-icons/StarBorder';

const styles = {
    editable: {
        cursor: 'pointer'
    }
};

const defaultValues = [1,2,3,4,5];

const Ch = (props) => {
    let {checked, hovered, readOnly=false, ...p} = props;
    const st = readOnly ? {} : styles.editable;
    if (checked)
        return <ToggleStar style={st} color="#05c7a3" {...p}/>;
    else if (hovered)
        return <ToggleStarBorder style={st} color="#05c7a3" {...p}/>;
    else
        return <ToggleStarBorder style={st} color="#05c7a3" {...p}/>;
};

class Rating extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hoveredIndex: 0,
            checkedIndex: props.value
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({checkedIndex: nextProps.value});
    }

    onCheck(i, e) {
        this.setState({checkedIndex: i});
        if (this.props.onChange)
            this.props.onChange(i);
    }

    onMouseEnter(i, e) {
        this.setState({hoveredIndex: i});
    }

    onMouseLeave(i, e) {
        this.setState({hoveredIndex: 0});
    }

    render() {
        const {hoveredIndex, checkedIndex} = this.state;
        const {readOnly, values=defaultValues,className} = this.props;
        return (<div style={{}} className={className ? className : null}>
            {values.map( (i) => {
                let
                    onClick= readOnly ? undefined : this.onCheck.bind(this, i),
                    onMouseEnter= readOnly ? undefined : this.onMouseEnter.bind(this, i),
                    onMouseLeave= readOnly ? undefined : this.onMouseLeave.bind(this, i),
                    checked = i<=checkedIndex,
                    hovered = i<=hoveredIndex;

                if (hoveredIndex>0 && checkedIndex>0 && i>hoveredIndex && i<=checkedIndex) {
                    checked = false;
                    hovered = true;
                }

                return <Ch checked={checked} key={i} hovered={hovered} readOnly={readOnly}
                    onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                />
            })}
        </div>)
    }
}

export default Rating;