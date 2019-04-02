const mapError = (
    {
      meta: { touched, error, warning } = {},
      input,
      ...props
    },
    errorProp = 'error'
  ) =>
    (touched && (error || warning)
      ? {
          ...props,
          ...input,
          [errorProp]: error || warning ? true : false
        }
      : { ...input, ...props })
  
  export default mapError