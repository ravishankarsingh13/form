import React, { useMemo } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const DisplayingErrorMessagesSchema =()=> {
    // console.log('called');
    return Yup.object().shape({
    companyName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    });}
const FormComponent = ({input}) => {
    
    const data = useMemo(()=>{
        const output = {};
Object.keys(input).map((key)=>{
    input[key].map((subChild)=>{
        const name = subChild.fieldData.fieldName;
        output[name] = '';
    })
})
        return output;
    },[input]);
    return (
    <Formik
      initialValues={data}
      validateOnBlur
      validationSchema={DisplayingErrorMessagesSchema}
      onSubmit={({isSubmitting, values})=>{
console.log(values)
      }}
      
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => {
        //   console.log('errors');
        //   console.log(errors);
          return(
        <Form onSubmit={handleSubmit}>
          {Object.keys(input).map((val, index)=>{
            const childs = input[val].map((valC, i)=>{
            const {fieldData} = valC;
            const {fieldName,type, fieldLabel} = fieldData;
            switch(type){
              case 'singleLine':
                return (
                    <>
                  <div className="type">
                    <input id={fieldName}  onChange={handleChange}
             onBlur={handleBlur}
             value={values[fieldName]}
             name={fieldName} 
             className={`input`} 
             placeholder = {fieldLabel} 
             required
                   /><br/>
                  </div>
                   {touched[fieldName] && errors[fieldName] && <div>{errors[fieldName]}</div>}
                   </>
                  )
              case 'dropDown':
                return(
                  <div className="type">
                  <select className="input" id={fieldName}  onChange={handleChange}
             onBlur={handleBlur}
             name={fieldName}  required value={values[fieldName]} defaultValue="Not Selected">  
                    {fieldData.option.length > 0 && fieldData.option.map((op,i) =>
                      <option className="input option" required={fieldData.required}
                            key={i} value={op.optionLabel} >{op.optionLabel}</option>
                        )}
                  </select>
                  {touched[fieldName] && errors[fieldName] && <div>{errors[fieldName]}</div>}
                  </div>
                )
            }
            });
            return <>
            <label className="section" htmlfor={val} id={val} key={index}> {val} </label><br/>
            {childs}
            </> 
          })
        }
        <button type="submit" className="btn btn-primary">Submit</button>
        </Form>
      )}}
    </Formik>
  );
}
export default FormComponent;
