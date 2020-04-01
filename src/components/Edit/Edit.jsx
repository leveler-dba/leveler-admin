import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
//import { Test } from './Edit.styles';

class Edit extends PureComponent { 
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentWillMount = () => {
    console.log('Edit will mount');
  }

  componentDidMount = () => {
    console.log('Edit mounted');
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('Edit will receive props', nextProps);
  }

  componentWillUpdate = (nextProps, nextState) => {
    console.log('Edit will update', nextProps, nextState);
  }

  componentDidUpdate = () => {
    console.log('Edit did update');
  }

  componentWillUnmount = () => {
    console.log('Edit will unmount');
  }

  render () {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className="EditWrapper">
        Edit
      </div>
    );
  }
}

Edit.propTypes = {
  // bla: PropTypes.string,
};

Edit.defaultProps = {
  // bla: 'test',
};

export default Edit;
