import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './AddResourceLink.module.scss';

export const AddResourceLink = (props) => {
	const categories = props.categories;

  return (
		<Formik
		initialValues={{ title: '', url: '', category: '' }}
		validationSchema={Yup.object({
			title: Yup.string()
				.max(100, 'Must be 100 characters or less')
				.required('Required'),
			url: Yup.string(),
			category: Yup.string()
				.required('Required'),
			description: Yup.string(),
		})}
		onSubmit={(values, { setSubmitting }) => {
			setTimeout(() => {
				props.prepLinkObject(values)
				setSubmitting(false);
			}, 400);
		}}
	>
		<Form className={styles.AddResourceLinkForm}>
			<label htmlFor="title">Title</label>
			<Field name="title" type="text" />
			<ErrorMessage component="span" name="title"/>
			<label htmlFor="url">URL</label>
			<Field name="url" type="text" />
			<ErrorMessage component="span" name="url" />
			<label htmlFor="category">Category</label>
			<Field name="category" as="select" >
				<option value="">select a category</option>
				{categories.map(category => (
					<option value={category}>{category}</option>
				))}
			</Field>
			<label htmlFor="description">Description</label>
			<Field name="description" type="text" component="textarea" />
			<button type="submit">Submit</button>
		</Form>
	</Formik>
  );
};
