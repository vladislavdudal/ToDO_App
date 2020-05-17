var React = require('react');
import './ItemTask.less';


export default class ItemTask extends React.Component{

    render() {
        const style = { backgroundColor: this.props.color };

        return (
            <div className='Task' style={style}>
                <span className='Task__del-icon' onClick={this.props.onDelete}> × </span>
                {
                    this.props.taskName
                    ?
                        <h4 className='Task__title'>{this.props.taskName}</h4>
                    :
                        null
                }
                <div>{this.props.date}</div>
                <div className='Task__text'>{this.props.children}</div>
            </div>
        );
    }
};
