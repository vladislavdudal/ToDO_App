var React = require('react');
import Masonry from 'react-masonry-component';
import './TaskGrid.less';
import ItemTask from './ItemTask.jsx';

export default class Grid extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        const masonryOptions = {
            itemSelector: '.Task',
            columnWidth: 250,
            gutter: 10,
            isFitWidth: true
        };
        return (
            <Masonry
                className='TaskGrid'
                options={masonryOptions}
            >
                {
                    this.props.tasks.map(task =>
                        <ItemTask
                            key={task._id}
                            taskName={task.taskName}
                            onDelete={this.props.onTaskDelete.bind(null, task)}
                            date={task.date}
                            color={task.color}
                        >
                            {task.status}
                        </ItemTask>
                    )
                }
            </Masonry>

        );
    }
};
