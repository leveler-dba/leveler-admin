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
          <p>Welp, we added another button op there. It lets you manage resources. the button said that, but 
            i thought i would tell you anyways. resources are new, so if you have any questions, just ask in the slack.
            you can still edit users, we didn't take that away or nothin'.
          </p>
        </div>
      </div>
    );
  }
}

export default compose(withFirebase, withRouter)(Home);
