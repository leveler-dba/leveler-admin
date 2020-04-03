import React, { PureComponent } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import styles from './Edit.module.scss';
import Header from '../Header';
import UpdateForm from '../UpdateForm';

class Edit extends PureComponent { 
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      query: "",
      hasResult: false,
      entryData: {},
      entryIndexData: {}
    };
  }

  componentDidMount = () => {
    document.title = 'leveler | search';
  }

  componentDidUpdate = () => {
  }

  componentWillUnmount = () => {
  }

  handleChange = event => {
    this.setState({
      query: event.target.value
    })
  }

  handleSearch = (event) => {
    event.preventDefault();
    const { 
      entriesIndexCollection, 
      entriesCollection 
    } = this.props.firebase;
    entriesIndexCollection.where('email','==',this.state.query).limit(1).get().then(r => {
      if (r.empty) {
        this.setState({hasResult: false, hasError: true});
        return;
      }  
      r.forEach(doc => {
        let data = doc.data()
        this.setState({
          entryIndexData: data
        })
      });
      entriesCollection.doc(this.state.entryIndexData.parent_id).get().then(doc => {
        if (!doc.exists) {
          this.setState({hasResult: false, hasError: true});
          return;
        } else {
          let result = doc.data();
          this.setState({
            entryData: result
          })
        }
        this.setState({hasResult: true});
      });
    })
    .catch(err => {
      this.setState({hasError: true});
    });
  }

  onFormUpdate = () => {
    this.setState({
      hasResult: false,
      query: "",
      entryData: {},
      entryIndexData: {}
    })
  }

  render () {
    return (
      <div className={styles.EditWrapper}>
        <Header />
        <div className={styles.EditBody}>
          <p>search for a user by their email.</p>
          <form className={styles.SearchForm} onSubmit={this.handleSearch}>
            <input type="text" name="query" value={this.state.query} onChange={this.handleChange} placeholder="email-goes-here@gmail.com" />
            <button type="submit" value="search" onClick={this.handleSearch}>Search</button>
            {this.state.hasError && (<span className={styles.error}>we don't have anything for them. try again.</span>)}
          </form>
          {this.state.hasResult && (
            <UpdateForm entry={this.state.entryData} entryIndex={this.state.entryIndexData} onUpdate={this.onFormUpdate} />
          )}
        </div>
      </div>
    );
  }
}

export default compose(withFirebase, withRouter)(Edit);
