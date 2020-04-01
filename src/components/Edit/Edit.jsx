import React, { PureComponent } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import styles from './Edit.module.scss';
import Header from '../Header';


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
      <div className={styles.EditWrapper}>
        <Header />
        <div className={styles.EditBody}>
          <p>Edit</p>
        </div>
      </div>
    );
  }
}

export default compose(withFirebase, withRouter)(Edit);
