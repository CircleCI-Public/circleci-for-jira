import { storage } from '@forge/api';
import ForgeUI, {
  AdminPage,
  Button,
  Form,
  Fragment,
  Macro,
  render,
  Text,
  TextField,
  useEffect,
  useState,
} from '@forge/ui';

const App = () => {
  const [formState, setFormState] = useState<{
    organizationId?: string;
    jwtAudience?: string;
  }>({});

  useEffect(async () => {
    const organizationId = await storage.get('organizationId');
    const jwtAudience = await storage.get('jwtAudience');
    setFormState({ organizationId, jwtAudience });
  }, []);

  const onSubmit = async (formData: {
    organizationId?: string;
    jwtAudience?: string;
  }): Promise<void> => {
    setFormState(formData);
    await storage.set('organizationId', formData.organizationId);
    await storage.set('jwtAudience', formData.jwtAudience);
  };

  const goBack = () => {
    console.log('go back');
  };
  const cancel = () => {
    console.log('cancel');
  };

  // The array of additional buttons.
  // These buttons align to the right of the submit button.
  // Probably don't need this. Will delete later.
  const actionButtons = [
    <Button text='Go back' onClick={goBack} />,
    <Button text='Cancel' onClick={cancel} />,
  ];

  return (
    <AdminPage>
      <Fragment>
        <Form onSubmit={onSubmit} actionButtons={actionButtons}>
          <TextField
            name='organizationId'
            label='Organization ID'
            defaultValue={formState.organizationId}
          />
          <TextField name='jwtAudience' label='JWT Audience' defaultValue={formState.jwtAudience} />
        </Form>
        {formState && <Text>{JSON.stringify(formState)}</Text>}
      </Fragment>
    </AdminPage>
  );
};

export const runConfigurePage = render(<Macro app={<App />} />);
