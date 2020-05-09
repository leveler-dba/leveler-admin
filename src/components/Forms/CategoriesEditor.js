import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const AddCategory = (props) => {
  const [showForm, setShowForm] = useState(false);

  const addCategory = (
    <Formik
      initialValues={{ newCategory: '' }}
      validationSchema={Yup.object({
        newCategory: Yup.string().required('Required')
      })}
      onSubmit={values => {
        const newCategory = values.newCategory.toUpperCase().trim();
        setTimeout(() => {
          const confirmed = window.confirm(`Are you sure you want to add new category "${newCategory}"?`);
          if (confirmed) {
            const { dbFs, fieldValue } = props.firebase;
            const docRef = dbFs.doc('misc/resourcesMeta')
            docRef.update({
              categories: fieldValue.arrayUnion(newCategory)
            })
            .catch((error) => console.error(error));
          }
        }, 500)
      }}
    >
      {props => (
        <Form>
          <label htmlFor="newCategory">New category:</label>
          <Field name="newCategory" type="text" />
          <ErrorMessage component="span" name="newCategory" />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );

  return (
    <div>
      <p>Add a new category for resources</p>
      { showForm
        ? addCategory
        : <button onClick={() => setShowForm(true)}>Add category</button>
      }
    </div>
  );
}
