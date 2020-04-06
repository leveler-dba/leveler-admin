import React, {PureComponent} from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Header from '../Header';
import { SelectCountry } from '../Forms/SelectCountry';
import { AddResourceLink } from '../Forms/AddResourceLink';
import styles from './Resources.module.scss';
import * as INTL from '../../constants/intl'
import * as KEYS from '../../constants/strings';


class Resources extends PureComponent {
	state = {
		selectedCountryName: '',
		selectedCountryPrefix: '',
		uid: '',
		username: '',
		submitted: false
	}
	
	async componentDidMount () {
		document.title = 'leveler | resources';
		const lsData = await localStorage.getItem(KEYS.STORAGE_KEY)
		const currentUserId = JSON.parse(lsData)
		await this.setState({
			uid: currentUserId.uid
		})
		this.getUserName(currentUserId.uid);
	}

	async getUserName(uid) {
		const { userCollection } = this.props.firebase;
		const userRef = userCollection.doc(uid);
		try {
			await userRef
			.get()
			.then((doc) => {
				if (doc.exists) {
					this.setState({
						username: doc.data().id
					})
				} else {
					alert('cant find your username!')
				}
			})
		} catch(e) {
			console.log(e.message)
		}
	}
	
	render () {
		const returnSelectedCountry = (country) => {
			this.setState({
				selectedCountryName: Object.keys(country).toString(),
				selectedCountryPrefix: Object.values(country).toString()
			})
		}

		const prepLinkObject = (valuesObj) => {
			const { title, url, category } = valuesObj;
			const { fieldValue } = this.props.firebase;
			const { username } = this.state;
			
			const writeObj = {
				created: fieldValue.serverTimestamp(),
				by: username,
				title,
				url,
				category,
				type: 'story',
				score: 0,
				descendants: null,
				kids: null,
				parent: null,
				text: null
			}
			writeToResources(writeObj)
		}

		const writeToResources = async (linkObj) => {

			const { resourcesCollection, resourcesCollectionMex } = this.props.firebase;
			if (selectedCountryPrefix === 'Usa') {
				try {
					await resourcesCollection
						.add(linkObj)
						.then((docRef) => {
							updateUser(docRef.id)
							this.setState({submitted: true})
							})
						} catch(e) {
							console.log(e.message)
					}
				} else {
					switch (selectedCountryPrefix) {
						case 'Mex':
							try {
								await resourcesCollectionMex
									.add(linkObj)
									.then((docRef) => {
										updateUser(docRef.id)
										this.setState({submitted: true})
									})
							} catch(e) {
								console.log(e.message)
							}
							break;
						default:
							break;
					}
				}
			}

		const updateUser = async (docId) => {
			const { uid } = this.state;
			const { userCollection, fieldValue } = this.props.firebase;
			try {
				await userCollection
					.doc(uid)
					.update({
						submitted: fieldValue.arrayUnion(docId),
						karma: fieldValue.increment(1)
					});
			} catch(e) {
				console.log(e.message)
			}
		}


		const { countries } = INTL;
		const { selectedCountryName, selectedCountryPrefix, submitted } = this.state;
		return (
			<>
				<Header />
				<div className={styles.ResourcesBody}>
				{!selectedCountryName && <p>First, select a country</p>}
						<SelectCountry 
							countries={countries} 
							returnSelectedCountry={returnSelectedCountry}
						/>
					{selectedCountryName && <p><b>You are adding a Resource Link to {selectedCountryName}</b></p>}
					{selectedCountryName && !submitted && 
						<AddResourceLink
							prepLinkObject={prepLinkObject} />
					}
					{submitted && <div><p>Added! <span role="img" aria-label="checkmark">✅</span> Reload and choose your country to add another link.</p></div>}
				</div>
			</>
		)
	}
}

export default compose(withFirebase, withRouter)(Resources);