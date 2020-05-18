var React = require('react');
import './TaskEditor.less';
import ColorPicker from './ColorPicker.jsx';


export default class Editor extends React.Component{
    constructor(props){
        super(props);
        this.state = {taskName:'Task', status:'',date:'2020-05-18', color:'#CFD8DC'};
        this.handeTitleChange = this.handeTitleChange.bind(this);
        this.handeStatusChange = this.handeStatusChange.bind(this);
        this.handleTaskAdd = this.handleTaskAdd.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    };

    handeTitleChange(event){
        this.setState({taskName: event.target.value});
    }

    handleDateChange(event){  
        this.setState({date: event.target.value});
    }

    handeStatusChange(event){
        this.setState({status: event.target.value});
    }

    handleColorChange(color) {
        this.setState({ color: color });
    }

    handleTaskAdd(event){
        event.preventDefault();
        const newTask = {
            taskName: this.state.taskName,
            status: this.state.status,
            date: this.state.date,
            color: this.state.color
        };
        this.props.onTaskAdd(newTask);
        this.setState({taskName:'Task', status:'',date:'2020-05-18', color:'#CFD8DC'});
    }

    render(){
        return (
            <div className='TaskEditor'>
                <input
                    type='text'
                    className='TaskEditor__title'
                    value={this.state.taskName}
                    onChange={this.handeTitleChange}
                />
                <select
                    className='TaskEditor__text'
                    value={this.state.status}
                    onChange={this.handeStatusChange}
                >
                    <option value="finished" >finished</option>
                    <option value="in process">in process</option>
                </select>
                <input 
                    type="date"
                    className="TaskEditor__date"
                    value={this.state.date}
                    onChange={this.handleDateChange}
                />
                <div className='TaskEditor__footer'>
                    <ColorPicker
                        value={this.state.color}
                        onChange={this.handleColorChange}
                    />
                    <button
                        className='TaskEditor__button'
                        disabled={!this.state.taskName}
                        onClick={this.handleTaskAdd}
                    >
                        Add
                    </button>
                </div>
            </div>
        )
    }
};
