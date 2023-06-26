import { storage } from '@forge/api';
import ForgeUI, {
  AdminPage,
  Form,
  Fragment,
  Macro,
  render,
  TextField,
  useEffect,
  useState,
} from '@forge/ui';

import { ConfigurePageForm } from './types/types';

const App = () => {
  const [formState, setFormState] = useState<ConfigurePageForm>({});

  useEffect(async () => {
    const organizationId = await storage.get('organizationId');
    const jwtAudience = await storage.get('jwtAudience');
    setFormState({ organizationId, jwtAudience });
  }, []);

  const onSubmit = async (formData: ConfigurePageForm): Promise<void> => {
    setFormState(formData);
    await storage.set('organizationId', formData.organizationId);
    await storage.set('jwtAudience', formData.jwtAudience);
  };

  return (
    <AdminPage>
      <Fragment>
        <Form onSubmit={onSubmit}>
          <TextField
            name='organizationId'
            label='Organization ID'
            defaultValue={formState.organizationId}
          />
          <TextField name='jwtAudience' label='JWT Audience' defaultValue={formState.jwtAudience} />
        </Form>
      </Fragment>
    </AdminPage>
  );
};

export const runConfigurePage = render(<Macro app={<App />} />);
