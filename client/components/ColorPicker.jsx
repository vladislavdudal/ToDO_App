var React = require('react');

import './ColorPicker.less';

const COLORS = ['#008080', '#80D8FF', '#FFFF8D', '#FF8A80', '#CCFF90', '#CFD8DC', '#FFD180'];

class ColorPicker extends React.Component{
    render() {
        return (
            <div className='ColorPicker'>
                {
                    COLORS.map(color =>
                        <div
                            key={color}
                            className={this.props.value === color
                            ? "ColorPicker__swatch selected"
                            : "ColorPicker__swatch "
                        }
                            style={{ backgroundColor: color }}
                            onClick={this.props.onChange.bind(null, color)}
                        />
                    )
                }
            </div>
        );
    }
};

export default ColorPicker;