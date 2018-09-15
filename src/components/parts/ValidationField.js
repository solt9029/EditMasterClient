import React, { Component } from 'react';
import { FormFeedback, Input, Label, FormGroup } from 'reactstrap';

export default class ValidationField extends Component {
  render() {
    return (
      <FormGroup>
        <Label>{this.props.label}</Label>
        <Input
          invalid={
            this.props.meta.touched &&
            (this.props.meta.error || this.props.meta.warning)
          }
          {...this.props.input}
          placeholder={this.props.placeholder}
          type={this.props.type}
        />
        {this.props.meta.touched &&
          ((this.props.meta.error && (
            <FormFeedback>{this.props.meta.error}</FormFeedback>
          )) ||
            (this.props.meta.warning && (
              <FormFeedback>{this.props.meta.warning}</FormFeedback>
            )))}
      </FormGroup>
    );
  }
}
