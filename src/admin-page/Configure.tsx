import ForgeUI, { AdminPage, Fragment, render, Text } from '@forge/ui';

const App = () => {
  return (
    <Fragment>
      <Text>Configure!</Text>
    </Fragment>
  );
};

export const runConfigurePage = render(
  <AdminPage>
    <App />
  </AdminPage>,
);
