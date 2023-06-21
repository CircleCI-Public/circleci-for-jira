import ForgeUI, { AdminPage, Fragment, render, Text } from '@forge/ui';

const App = () => {
  return (
    <Fragment>
      <Text>Hello world!</Text>
    </Fragment>
  );
};

export const runAdminPage = render(
  <AdminPage>
    <App />
  </AdminPage>,
);
