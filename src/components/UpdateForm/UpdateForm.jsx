import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withFirebase } from './../Firebase';
import { compose } from 'recompose';
import styles from './UpdateForm.module.scss';
import classNames from 'classnames';

class UpdateForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      form: {},
      changedFields: {}
    };

  }

  loadForm = () => {
    let entry = this.props.entry;
    let entryIndex = this.props.entryIndex;
    
    this.setState({
      form: {
        email: entryIndex.email,
        potential_contrib: entryIndex.potential_contrib,
        shown: entryIndex.shown,
        social_url: entryIndex.social_url,
        suggestion: entryIndex.suggestion,
        id: entry.id,
        index_id: entryIndex.id,
        context: entry.description,
        industry: entry.industry,
        location: entry.location,
        payment_url: entry.payment_url[0]
      }
    })
  }

  componentDidMount = () => {
    this.loadForm();
  }

  componentWillReceiveProps = (nextProps) => {
    this.loadForm();
  }

  componentDidUpdate = () => {
  }

  componentWillUnmount = () => {
  }

  submitHandler = event => {
    event.preventDefault();
    const { 
      entriesIndexCollection, 
      entriesCollection 
    } = this.props.firebase;
    let updates = this.state.form;
    let entryPayload = {
      description: updates.context,
      industry: updates.industry,
      location: updates.location,
      payment_url: []
    }
    entryPayload.payment_url[0] = updates.payment_url;
    let entryIndexPayload = {
      email: updates.email,
      social_url: updates.social_url,
      suggestion: updates.suggestion
    }
    entriesIndexCollection.doc(updates.index_id).set(entryIndexPayload, {merge: true}).then(
      entriesCollection.doc(updates.id).set(entryPayload, {merge: true})
    );
    this.setState({
      changedFields: {}
    })  
  }

  deleteEntry = event => {
    event.preventDefault();

    if (window.confirm('Are you sure you wish to delete this person from the list?')) {
      const { 
        entriesIndexCollection, 
        entriesCollection 
      } = this.props.firebase;
      let updates = this.state.form;
      entriesCollection.doc(updates.id).delete();
      entriesIndexCollection.doc(updates.index_id).delete();
    }

    this.props.onUpdate({
      deleted: true
    });
  }

  handleChange = (event) => {
    const e = event.target;
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [e.name]: e.value
      },
      changedFields: {
        ...prevState.changedFields,
        [e.name]: true
      }
    }))
  }

  isEmpty(obj){
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
    }
    return true;
  }

  render() {
    return (
      <div className={styles.UpdateFormWrapper}>
        <form className={styles.UpdateForm} onSubmit={this.submitHandler}>
          <p>Shown: {this.state.form.shown}</p>
          <p>Potential Contributions: {this.state.form.potential_contrib}</p>
          <div>
            <fieldset>
              <label className={classNames({[`${styles.changed}`]: this.state.changedFields.email})}>email</label>
              <input type="text" name="email" value={this.state.form.email} onChange={this.handleChange} />
            </fieldset>
            <fieldset>
              <label className={classNames({[`${styles.changed}`]: this.state.changedFields.location})}>location</label>
              <input type="text" name="location" value={this.state.form.location} onChange={this.handleChange} />
            </fieldset>
            <fieldset>
              <label className={classNames({[`${styles.changed}`]: this.state.changedFields.social_url})}>social url</label>
              <input type="text" name="social_url" value={this.state.form.social_url} onChange={this.handleChange} />
            </fieldset>
            <fieldset>
              <label className={classNames({[`${styles.changed}`]: this.state.changedFields.industry})}>industry</label>
              <input type="text" name="industry" value={this.state.form.industry} onChange={this.handleChange} />
            </fieldset>
            <fieldset>
              <label className={classNames({[`${styles.changed}`]: this.state.changedFields.payment_url})}>payment_url</label>
              <input type="text" name="payment_url" value={this.state.form.payment_url} onChange={this.handleChange} />
            </fieldset>
            <fieldset>
              <label className={classNames({[`${styles.changed}`]: this.state.changedFields.context})}>context</label>
              <textarea type="text" name="context" value={this.state.form.context} onChange={this.handleChange} />
            </fieldset>
            <fieldset>
              <label className={classNames({[`${styles.changed}`]: this.state.changedFields.suggestion})}>suggestion</label>
              <textarea type="text" name="suggestion" value={this.state.form.suggestion} onChange={this.handleChange} />
            </fieldset>
            <fieldset className={styles.ButtonPanel}>
              {!this.isEmpty(this.state.changedFields) && (
                <>
                <button className={styles.cancel} onClick={this.loadForm}>Cancel</button>
                <button className={styles.update} type="submit" value="Submit" onClick={this.submitHandler}>Update this Entry</button>
                </>
              )}
              <button className={styles.delete} onClick={this.deleteEntry}>Delete this Entry</button>
            </fieldset>
          </div>
        </form>
      </div>
    );
  }
}

UpdateForm.propTypes = {
  entry: PropTypes.object,
  entryIndex: PropTypes.object
};

export default compose(withFirebase)(UpdateForm);
