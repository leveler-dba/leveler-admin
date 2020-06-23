import React, { PureComponent } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import styles from './Edit.module.scss';
import Header from '../Header';
import UpdateForm from '../UpdateForm';

class Edit extends PureComponent {
    state = {
      hasError: false,
      query: "",
      hasResult: false,
      entryData: {},
      entryIndexData: {},
      numUsers: 0,
      mexSignups: 0,
      burnerSignups: 0,
      bipoclgbtqSignups: 0
    };

  componentDidMount = () => {
    document.title = 'leveler | search';

    const { dbFs } = this.props.firebase;
    dbFs.doc('misc/entriesMeta').get()
      .then(snap => {
        const data = snap.data();
        this.setState({
          numUsers: data.size,
        });
      })
      .catch(err => console.error(err));

      this.getMexicoCount();
      this.getBurnerCount();
      this.getBipocCount();
  }

  getMexicoCount = () => {
    const { entriesCollection } = this.props.firebase;
    entriesCollection
      .where('location.country', 'in', ['Mexico','México','Méx'])
      .get()
      .then((querySnapshot) => {
        this.setState({
          mexSignups: querySnapshot.docs.length
        })
      })
  }

  getBurnerCount = () => {
    const { entriesCollection } = this.props.firebase;
    entriesCollection
      .where('group', '==', 'burners')
      .get()
      .then((querySnapshot) => {
        this.setState({
          burnerSignups: querySnapshot.docs.length
        })
      })
  }

  getBipocCount = () => {
    const { entriesCollection } = this.props.firebase;
    entriesCollection
      .where('group', '==', 'bipoclgbtq')
      .get()
      .then((querySnapshot) => {
        this.setState({
          bipoclgbtqSignups: querySnapshot.docs.length
        })
      })
  }

  handleChange = event => {
    this.setState({
      query: event.target.value
    })
  }

  handleSearch = (event) => {
    event.preventDefault();
    this.getUserByEmail(this.state.query)
  }

  onFormUpdate = () => {
    this.setState({
      hasResult: false,
      query: "",
      entryData: {},
      entryIndexData: {}
    })
  }

  getUserByEmail = async (userInput) => {
    const {
      privateCollection,
    } = this.props.firebase;

    try {
      await privateCollection.where('email','==',userInput).limit(1).get().then(r => {
        if (r.empty) {
          this.setState({hasResult: false, hasError: true});
          return;
        }
        r.forEach(doc => {
          let data = doc.data()
          data.id = doc.id;
          data.parent_id = doc.ref.parent.parent.id
          this.setState({
            entryIndexData: data
          })
          this.getUserObj(doc.ref.parent.parent.id)
        });
     })
    } catch(e) {
      console.log(e)
    }
  }

  getUserObj = async (uid) => {
    const { entriesCollection } = this.props.firebase;

    try {
      entriesCollection.doc(uid).get().then(doc => {
        if (!doc.exists) {
          this.setState({hasResult: false, hasError: true});
          return;
        } else {
          let result = doc.data();
          result['id'] = doc.id;
          this.setState({
            entryData: result
          })
        }
        this.setState({hasResult: true});
      });
    } catch(e) {
      console.log(e.message)
    }
  }

  render () {
    return (
      <>
        <Header />
        <div className={styles.EditBody}>
          <p>There are currently {this.state.numUsers} total signups.</p>
          <p>There are currently {this.state.mexSignups} Mexico signups.</p>
          <p>There are currently {this.state.burnerSignups} Burner signups.</p>
          <p>There are currently {this.state.bipoclgbtqSignups} BIPOCLGBTQ signups.</p>
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
      </>
    );
  }
}

export default compose(withFirebase, withRouter)(Edit);
