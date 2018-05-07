import React from 'react';
import hoistStatics from 'recompose/hoistStatics';
import validate from 'coral-framework/helpers/validate';
import errorMsj from 'coral-framework/helpers/error';

const initialState = {
  formData: {},
  errors: {},
};

export default hoistStatics(WrappedComponent => {
  class WithForm extends React.Component {
    state = initialState;

    fieldValidation = (value, type, name) => {
      if (!value.length) {
        this.addError({
          [name]: 'This field is required',
        });
      } else if (!validate[type](value)) {
        this.addError({ [name]: errorMsj[type] });
      } else {
        this.removeError(name);
      }
    };

    onChange = e => {
      const { name, value, type, dataset } = e.target;
      const validationType = dataset.validationType || type;

      this.setState(
        state => ({
          formData: {
            ...state.formData,
            [name]: value,
          },
        }),
        () => {
          this.fieldValidation(value, validationType, name);
        }
      );
    };

    addError = err => {
      this.setState(({ errors }) => ({
        errors: { ...errors, ...err },
      }));
    };

    removeError = errKey => {
      this.setState(state => {
        const { [errKey]: _, ...errors } = state.errors;
        return {
          errors,
        };
      });
    };

    clearForm = () => {
      this.setState(initialState);
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          onChange={this.onChange}
          clearForm={this.clearForm}
          addError={this.addError}
          removeError={this.removeError}
        />
      );
    }
  }

  return WithForm;
});
