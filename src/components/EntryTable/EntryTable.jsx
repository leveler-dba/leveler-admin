import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import lunr from 'lunr';
import { withFirebase } from '../Firebase';
import styles from './EntryTable.module.scss';
import Header from '../Header';

class Home extends PureComponent { 
  constructor(props) {
    super(props);

    this.state = {
			hasError: false,
			query: '',
			activeGroup:''
    };
  }

  componentDidMount = () => {
		document.title = "leveler | admin"
		// this.getAllEntries();
  }

  componentDidUpdate = () => {
  }

  componentWillUnmount = () => {
	}
	
	// async getAllEntries() {
	// 	const entriesArr = [];
  //   const { entriesCollection } = this.props.firebase;
	// 	const allEntries = await entriesCollection
	// 		.where('group', '==', "bipoclgbtq")
	// 		.get()
	// 	for (const doc of allEntries.docs){
	// 		entriesArr.push(doc.data())
	// 	}
	// 	this.createSearchIndex(entriesArr)
	// }
	
	async setUpSearchIndex() {
		const entriesArr = [];
    const { entriesCollection } = this.props.firebase;
		const allEntries = await entriesCollection
			.where('group', '==', this.state.activeGroup)
			.get()
		for (const doc of allEntries.docs){
			entriesArr.push(doc.data())
		}
		this.runSearchOnIndex(entriesArr)
	}

	runSearchOnIndex(entries) {
		const idx = lunr(function () {
			this.ref('payment_url')
			this.ref('description')
			this.field('description')
			this.field('payment_url')
			this.field('location')
			entries.forEach(function (doc) {
				this.add(doc)
			}, this)
		})
		const result = idx.search(this.state.query)
		console.log(result)
	}

	handleChange = event => {
    this.setState({
      query: event.target.value
    })
  }

  handleSearch = (event) => {
		event.preventDefault();
    this.setUpSearchIndex(this.state.query)
  }

  render () {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className={styles.EntryTableWrapper}>
        <Header />
        <div className={styles.EntryTableBody}>
					<button onClick={() => {this.setState({activeGroup: 'leveler'})}}>leveler</button>
					<button onClick={() => {this.setState({activeGroup: 'mexico'})}}>mexico</button>
					<button onClick={() => {this.setState({activeGroup: 'canada'})}}>canada</button>
					<button onClick={() => {this.setState({activeGroup: 'bipoclgbtq'})}}>bipoclgbtq</button>
					<button onClick={() => {this.setState({activeGroup: 'helpyourblackneighbor'})}}>helpyourblackneighbor</button>
					{this.state.activeGroup && (
						<>
							<p>You're searching in the {this.state.activeGroup} database:</p>
							<p>Search by payment url or description</p>
							<form className={styles.SearchForm} onSubmit={this.handleSearch}>
								<input type="text" name="query" value={this.state.query} onChange={this.handleChange} placeholder="add text for search" />
								<button type="submit" value="search" onClick={this.handleSearch}>Search</button>
								{this.state.hasError && (<span className={styles.error}>we don't have anything for them. try again.</span>)}
							</form>
						</>
					)}
        </div>
      </div>
    );
  }
}

export default compose(withFirebase, withRouter)(Home);
