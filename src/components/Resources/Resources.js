import React, {PureComponent} from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Header from '../Header';
import { SelectCountry } from '../Forms/SelectCountry';
import AddResourceItem from '../Forms/AddResourceItem';
import styles from './Resources.module.scss';
import * as INTL from '../../constants/intl'

class Resources extends PureComponent {
	state = {
		selectedCountryName: null,
		selectedCountryPrefix: null,
	}
	
	componentDidMount = () => {
    document.title = 'leveler | resources';
	}
	
	render () {
		const returnSelectedCountry = (country) => {
			this.setState({
				selectedCountryName: Object.keys(country).toString(),
				selectedCountryPrefix: Object.values(country).toString()
			})
		}

		const { countries } = INTL;
		const { selectedCountryName, selectedCountryPrefix } = this.state;
		return (
			<>
				<Header />
				<div className={styles.ResourcesBody}>
					<p>add a link:</p>
						<SelectCountry 
							countries={countries} 
							returnSelectedCountry={returnSelectedCountry}
						/>
					{selectedCountryName && <div>You are adding a Resource Link to {selectedCountryName}</div>}
				</div>
			</>
		)
	}
}

export default compose(withFirebase, withRouter)(Resources);