import React, {PureComponent} from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Header from '../Header';
import { SelectCountry } from '../Forms/SelectCountry';
import { AddResourceLink } from '../Forms/AddResourceLink';
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
				{!selectedCountryName && <p>First, select a country</p>}
						<SelectCountry 
							countries={countries} 
							returnSelectedCountry={returnSelectedCountry}
						/>
					{selectedCountryName && <p>You are adding a Resource Link to <b>{selectedCountryName}</b></p>}
					{selectedCountryName && <AddResourceLink/>}
				</div>
			</>
		)
	}
}

export default compose(withFirebase, withRouter)(Resources);