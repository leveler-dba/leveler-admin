import React, {PureComponent} from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Header from '../Header';
import { AddResourceLink } from '../Forms/AddResourceLink';
import { AddCategory } from '../Forms/CategoriesEditor';
import styles from './Resources.module.scss';
import * as KEYS from '../../constants/strings';


class Resources extends PureComponent {
	state = {
		uid: '',
		username: '',
		submitted: false,
		categories: [],
	}

	async componentDidMount () {
		document.title = 'leveler | resources';
		const lsData = await localStorage.getItem(KEYS.STORAGE_KEY)
		const currentUserId = JSON.parse(lsData)
		await this.setState({
			uid: currentUserId.uid
		})
		this.getUserName(currentUserId.uid);
		this.getCategories();
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

	async getCategories() {
		const { dbFs } = this.props.firebase;
		try {
			const docSnap = await dbFs.doc('misc/resourcesMeta').get()
			const data = docSnap.data();
			this.setState({
				categories: data.categories,
			});
		} catch(error) {
			console.error(error);
		}
	};

	render () {
		const prepLinkObject = (valuesObj) => {
			const { title, url, category, description, group } = valuesObj;
			const { fieldValue } = this.props.firebase;
			const { username } = this.state;

			const writeObj = {
				created: fieldValue.serverTimestamp(),
				by: username,
				title,
				url,
				category,
				description,
				group,
				type: 'story',
				score: 0,
				descendants: 0,
				kids: null,
				parent: null,
				text: null
			}
			writeToResources(writeObj)
		}

		const writeToResources = async (linkObj) => {

			const { resourcesCollection } = this.props.firebase;
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

		const { submitted } = this.state;
		return (
			<>
				<Header />
				<div className={styles.ResourcesBody}>
				<AddCategory firebase={this.props.firebase}/>
				{!submitted &&
					<AddResourceLink
						prepLinkObject={prepLinkObject}
						categories={this.state.categories}
					/>
				}
				{submitted && <div><p>Added! <span role="img" aria-label="checkmark">✅</span> Reload to add another link.</p></div>}
				</div>
			</>
		)
	}
}

export default compose(withFirebase, withRouter)(Resources);
