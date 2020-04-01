import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import styles from './SignIn.module.scss';
import * as KEYS from '../../constants/strings';

class SignIn extends PureComponent { 
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      email: "",
      password: "",
      success: false
    };
  
  }

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.firebase.signIn(this.state.email, this.state.password).then(result => {
      localStorage.setItem(KEYS.STORAGE_KEY, JSON.stringify(result.user));
      this.props.history.push('/');
    }).catch(function(error) {
      console.log(error);
    })
  }

  componentWillMount = () => {
    console.log('SignIn will mount');
  }

  componentDidMount = () => {
    console.log('SignIn mounted');
    document.title = 'leveler | admin | sign in'
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
      <div className={styles.SignInWrapper}>
        <img src="./leveler-logo.png"  alt="logo image" />
        <p>sign in</p>
        <form onSubmit={this.handleSubmit}>
          <label>email</label>
          <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
          <label>password</label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          <button type="submit" value="Submit">Sign in</button>
        </form>
        {this.state.success && (
          <Redirect to="/" />
        )}
      </div>
    );
  }
}

SignIn.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  success: PropTypes.bool
};

SignIn.defaultProps = {
  
};

export default compose(withFirebase, withRouter)(SignIn);
