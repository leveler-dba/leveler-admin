import React, { PureComponent } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import styles from './Home.module.scss';
import Header from '../Header';

class Home extends PureComponent { 
  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  componentWillMount = () => {
    console.log('Home will mount');
  }

  componentDidMount = () => {
    console.log('Home mounted');
    document.title = "leveler | admin"
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('Home will receive props', nextProps);
  }

  componentWillUpdate = (nextProps, nextState) => {
    console.log('Home will update', nextProps, nextState);
  }

  componentDidUpdate = () => {
    console.log('Home did update');
  }

  componentWillUnmount = () => {
    console.log('Home will unmount');
  }

  render () {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className={styles.HomeWrapper}>
        <Header />
        <div className={styles.HomeBody}>
          <p>Home</p>
        </div>
      </div>
    );
  }
}

export default compose(withFirebase, withRouter)(Home);
