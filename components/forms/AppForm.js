import React from "react";
import { Formik } from "formik";

function AppForm({ initialValues, onSubmit, validationSchema, children }) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { resetForm }) => {
        try {
          await onSubmit(values, { resetForm });
          resetForm(); // Reset the form after successful submission
        } catch (error) {
          console.error("Form submission error:", error);
          // Optionally handle error here
        }
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, resetForm }) => (
        <>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { handleSubmit, resetForm });
            }
            return child;
          })}
        </>
      )}
    </Formik>
  );
}

export default AppForm;
