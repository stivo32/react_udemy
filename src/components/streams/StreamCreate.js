import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends Component {
    renderError = ({touched, error}) => {
        if (touched && error) {
            return (
                <div className={"ui error message"}>
                    <div className={"header"}>{error}</div>
                </div>
            )
        }
    };

    renderInput = ({input, label, meta}) => { //formProps.input. Объект formProps автоматически передается из Field в component
        const className = `field ${meta.error && meta.touched ? 'error': ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete={"off"}/>
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = formValues => {
        this.props.createStream(formValues);
    };

    render() {
        // Все свойства, которые Field не понимает, проксируется внутрь component как props.
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className={"ui form error"}>
                <Field name={"title"} component={this.renderInput} label={"Enter Title"}/>
                <Field name={"description"} component={this.renderInput} label={"Enter Description"} />
                <button className={"ui button primary"}>Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        //only ran if user did not enter a title
        errors.title = 'You must enter a title';
    }

    if (!formValues.description) {
        errors.description = "You must enter a description";
    }
    // если возвращается пустой {}, то редукс форма думает, что все хорошо

    return errors
};

const formWrapped = reduxForm({
    form: 'streamCreate',
    validate: validate,
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);
