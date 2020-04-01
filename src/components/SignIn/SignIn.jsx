import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
//import { Test } from './SignIn.styles';

class SignIn extends PureComponent { 
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentWillMount = () => {
    console.log('SignIn will mount');
  }

  componentDidMount = () => {
    console.log('SignIn mounted');
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('SignIn will receive props', nextProps);
  }

  componentWillUpdate = (nextProps, nextState) => {
    console.log('SignIn will update', nextProps, nextState);
  }

  componentDidUpdate = () => {
    console.log('SignIn did update');
  }

  componentWillUnmount = () => {
    console.log('SignIn will unmount');
  }

  render () {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className="SignInWrapper">
        Sign In
      </div>
    );
  }
}

SignIn.propTypes = {
  // bla: PropTypes.string,
};

SignIn.defaultProps = {
  // bla: 'test',
};

export default SignIn;
