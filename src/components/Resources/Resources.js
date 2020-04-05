import React, {PureComponent} from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import styles from './Resources.module.scss';
import Header from '../Header';

class Resources extends PureComponent {
	state = {}
	
	componentDidMount = () => {
    document.title = 'leveler | resources';
	}
	
	render () {
		return (
			<>
				<Header />
				<div className={styles.ResourcesBody}>
				<p>add a link:</p>
				</div>
			</>
		)
	}
}

export default compose(withFirebase, withRouter)(Resources);