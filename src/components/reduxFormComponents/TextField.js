import Input from 'material-ui/Input'
import createComponent from './createComponent'
import mapError from './mapError'

export default createComponent(Input, ({ defaultValue, ...props }) =>
  mapError(props)
)