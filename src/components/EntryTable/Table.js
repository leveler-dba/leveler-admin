import React from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import styles from './EntryTable.module.scss';

const Table = (props) => {
	console.log(props, 'table props')

	const removeUser = async (random) => {
		let entryIdToDelete;
		let entryToDelete;
		const { entriesCollection } = props.firebase;
		const entry = await entriesCollection
			.where('random', '==', random)
			.get()
		for (const doc of entry.docs){
			entryToDelete = doc.data();
			entryIdToDelete = doc.id;
			console.log(entryToDelete, ' was deleted')
		}
		entriesCollection.doc(entryIdToDelete).delete()
		window.alert('DELETED')
	}

	const tableItems = props.results.map((result) => 
		<>
		<span>{result.group}</span>
		<span>{result.industry}</span>
		<span>{result.payment_url}</span>
		<span>{result.shown}</span>
		<span>
			<button>edit</button>
			<button onClick={() => {removeUser(result.random)}}>delete</button>
		</span>
		</>
	);
	
	return (
	<div className={styles.GridTable}>
		<span>
			<strong>Group</strong>
		</span>
		<span>
			<strong>Industry</strong>
		</span>
		<span>
			<strong>Payment URL</strong>
		</span>
		<span>
			<strong>Shown</strong>
		</span>
		<span>
			<strong>Actions</strong>
		</span>
		{tableItems}
	</div>
	)
};
export default compose(withFirebase)(Table);