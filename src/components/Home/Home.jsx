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
          <p>you're at the admin panel. you did everything right so far. i'm proud of you.</p>
          <p>right now, all that's here is that edit button up there. hit that and you can update 
            people's info or delete them. You can also see some basic stats on how many times 
            they were shown to people and stuff. its nothing fancy but its there.</p>
        </div>
      </div>
    );
  }
}

export default compose(withFirebase, withRouter)(Home);
