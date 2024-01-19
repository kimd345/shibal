import { useFormikContext } from 'formik';

import Button from '../Button';

function SubmitButton({ title }) {
  const { handleSubmit } = useFormikContext();

  return <Button title={title} onPress={handleSubmit} width={'60%'} />;
}

export default SubmitButton;
