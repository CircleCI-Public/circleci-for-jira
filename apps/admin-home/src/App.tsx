import './App.css';

import { ThemeProvider } from '@emotion/react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Link } from 'ui';

import AtlassianTheme from './theme';

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

function App() {
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
                <Link href='https://marketplace.atlassian.com/apps/1215946/circleci-for-jira'>
                  CircleCI For Jira
                </Link>
              </p>
              <p>
                Documentation:&nbsp;
                <Link href='https://circleci.com/docs/jira-plugin/'>CircleCI Docs</Link>
              </p>
              <p>
                Support:&nbsp;
                <Link href='https://support.circleci.com/hc/en-us/requests/new?ticket_form_id=855268'>
                  Submit a ticket
                </Link>
              </p>
              <p>
                Submit bugs:&nbsp;
                <Link href='https://github.com/CircleCI-Public/circleci-for-jira'>Github</Link>
              </p>
            </InfoBox>
          </section>
          <section>
            <ButtonBox>
              <Button variant='contained' color='primary'>
                Configure
              </Button>
              <Button variant='contained' color='secondary' href=''>
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
