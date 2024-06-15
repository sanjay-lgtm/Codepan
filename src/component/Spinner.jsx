import React from 'react';
import { Triangle } from 'react-loader-spinner';
import PropTypes from 'prop-types';

const Spinner = ({ visible, height, width, color }) => {
    return (
        <Triangle
            visible={visible}
            height={height}
            width={width}
            color={color}
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    );
};

Spinner.propTypes = {
    visible: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number,
    color: PropTypes.string,
};

Spinner.defaultProps = {
    visible: true,
    height: 80,
    width: 80,
    color: "#4fa94d",
};

export default Spinner;
