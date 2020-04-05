import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const AddResourceLink = (props) => {
  return (
		<Formik
		initialValues={{ title: '', url: '' }}
		validationSchema={Yup.object({
			title: Yup.string()
				.max(60, 'Must be 15 characters or less')
				.required('Required'),
			url: Yup.string()
				.required('Required')
		})}
		onSubmit={(values, { setSubmitting }) => {
			setTimeout(() => {
				alert(JSON.stringify(values, null, 2));
				setSubmitting(false);
			}, 400);
		}}
	>
		<Form>
			<label htmlFor="title">Title</label>
			<Field name="title" type="text" />
			<ErrorMessage name="title" />
			<label htmlFor="url">url</label>
			<Field name="url" type="text" />
			<ErrorMessage name="url" />
			<button type="submit">Submit</button>
		</Form>
	</Formik>
  );
};
