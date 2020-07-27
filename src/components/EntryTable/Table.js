import React from 'react'
import styles from './EntryTable.module.scss';

const Table = (props) => {
	console.log(props, 'table props')

	const tableItems = props.results.map((result) => 
		<>
		<span>{result.group}</span>
		<span>{result.industry}</span>
		<span>{result.payment_url}</span>
		<span>{result.shown}</span>
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
		{tableItems}
	</div>
	)
}
export default Table;