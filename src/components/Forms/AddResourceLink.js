import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './AddResourceLink.module.scss';

export const AddResourceLink = (props) => {
	const categories = [
		'EMERGENCY FUNDING',
		'FUNDING OPPORTUNITIES',
		'CROWDFUNDING'
	]
  return (
		<Formik
		initialValues={{ title: '', url: '', category: '' }}
		validationSchema={Yup.object({
			title: Yup.string()
				.max(100, 'Must be 60 characters or less')
				.required('Required'),
			url: Yup.string()
				.required('Required'),
				category: Yup.string()
				.required('Required')
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
			<ErrorMessage name="title" />
			<label htmlFor="url">URL</label>
			<Field name="url" type="text" />
			<ErrorMessage name="url" />
			<label htmlFor="category">Category</label>
			<Field name="category" as="select" >
				<option value="">select a category</option>
				{categories.map(category => (
					<option value={category}>{category}</option>	
				))}
			</Field>
			<button type="submit">Submit</button>
		</Form>
	</Formik>
  );
};
