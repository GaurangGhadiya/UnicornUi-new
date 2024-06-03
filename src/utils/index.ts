export const getErrorMessage = (
  errors: any,
  fieldName: string,
  fieldLabel: string
) => {
  if (errors[fieldName]) {
    const { type } = errors[fieldName];
    switch (type) {
      case 'required':
        return `${fieldLabel} is required`;
      case 'sameAs':
        return `Password did not match, Please tryu again.`;
      case 'pattern':
        return `Invalid ${fieldLabel}`;
      case 'maxLength':
        return `${fieldLabel} length must be 10 characters long.`;
      case 'minLength':
        return `${fieldLabel} length at least 10 characters long.`;
      default:
        // eslint-disable-next-line no-console
        return type;
    }
  } else {
    return false;
  }
};
