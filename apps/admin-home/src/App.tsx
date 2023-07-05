import './App.css';

import { ThemeProvider } from '@emotion/react';
import { view } from '@forge/bridge';
import { FullContext } from '@forge/bridge/out/types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { AtlassianTheme, Link } from 'ui';

const InfoBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[400],
  padding: theme.spacing(2),
  textAlign: 'left',
  borderRadius: theme.spacing(1),
}));

const ButtonBox = styled('div')(({ theme }) => ({
  margin: theme.spacing(2),
  '& > button': {
    margin: theme.spacing(1),
  },
}));

type AppUrls = {
  configure: string;
  getStarted: string;
};

function App() {
  const useContext = (select: (data: FullContext) => FullContext | undefined | AppUrls) =>
    useQuery({ queryKey: ['context'], queryFn: () => view.getContext(), select });

  const useContextUrl = () =>
    useContext(data => {
      const siteUrl = data.siteUrl;
      const localId = data.localId;
      const localIdExtension = localId.split('extension/')[1];
      return {
        configure: `${siteUrl}/jira/settings/apps/configure/${localIdExtension}`,
        getStarted: `${siteUrl}/jira/settings/apps/get-started/${localIdExtension}`,
      };
    });

  const { data: appUrls, isLoading } = useContextUrl();

  return (
    <>
      <ThemeProvider theme={AtlassianTheme}>
        <div className='App'>
          <h1>CircleCI For Jira</h1>
          <section>
            <InfoBox>
              <p>
                Version:&nbsp;
                <code>1.0.0</code>
              </p>
              <p>
                Marketplace:&nbsp;
                <Link
                  href='https://marketplace.atlassian.com/apps/1215946/circleci-for-jira'
                  target='_blank'
                >
                  CircleCI For Jira
                </Link>
              </p>
              <p>
                Documentation:&nbsp;
                <Link href='https://circleci.com/docs/jira-plugin/'>CircleCI Docs</Link>
              </p>
              <p>
                Support:&nbsp;
                <Link
                  href='https://support.circleci.com/hc/en-us/requests/new?ticket_form_id=855268'
                  target='_blank'
                >
                  Submit a ticket
                </Link>
              </p>
              <p>
                Submit bugs:&nbsp;
                <Link href='https://github.com/CircleCI-Public/circleci-for-jira' target='_blank'>
                  Github
                </Link>
              </p>
            </InfoBox>
          </section>
          <section>
            <ButtonBox>
              <Button variant='contained' color='primary' href={useContextUrl}>
                Configure
              </Button>
              <Button variant='contained' color='secondary' href={appUrls.getStarted}>
                Get Started
              </Button>
            </ButtonBox>
          </section>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
