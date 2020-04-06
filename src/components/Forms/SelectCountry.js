import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const SelectCountry = (props) => {
  return (
    <Formik
      initialValues={{ selectedCountry: ''}}
      validationSchema={Yup.object({
        selectedCountry: Yup.string()
          .required('Selecting a country is Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
					props.returnSelectedCountry(props.countries[values.selectedCountry])
          setSubmitting(false);
        }, 100);
      }}
    >
      <Form>
        <label htmlFor="selectedCountry">Select a Country</label>
        <Field name="selectedCountry" as="select" >
					<option value="">select a country</option>
					{props.countries.map((country, index) => (
						<option value={index}>{Object.keys(country)}</option>	
					))}
				</Field>
        <ErrorMessage name="selectedCountry" />
        
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
