import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
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

  componentDidMount = () => {
    document.title = "leveler | admin"
  }

  componentDidUpdate = () => {
  }

  componentWillUnmount = () => {
  }

  render () {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className={styles.HomeWrapper}>
        <Header />
        <div className={styles.HomeBody}>
          
        </div>
      </div>
    );
  }
}

export default compose(withFirebase, withRouter)(Home);
