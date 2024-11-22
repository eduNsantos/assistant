import { ErrorMessage, ErrorMessageProps } from "formik";
import React from "react";


export default class FormikError extends React.Component<ErrorMessageProps> {
    constructor(props: ErrorMessageProps) {
        super(props);
    }

    render(): React.ReactNode {

        return (
            <>
                <ErrorMessage name={this.props.name} render={(errorMesage) => (
                    <div className="mt-1 text-danger">{errorMesage}</div>
                )}/>
            </>
        )
    }
}