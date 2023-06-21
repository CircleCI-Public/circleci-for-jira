import ForgeUI, { AdminPage, Fragment, render, Text } from '@forge/ui';

const App = () => {
  return (
    <Fragment>
      <Text>Get Started!</Text>
    </Fragment>
  );
};

export const runGetStartedPage = render(
  <AdminPage>
    <App />
  </AdminPage>,
);
