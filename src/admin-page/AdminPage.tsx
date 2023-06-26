import { invoke } from '@forge/bridge';
import ForgeReconciler, { Text } from '@forge/react';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const text: string = await invoke('getText', { example: 'my-invoke-variable' });
      setData(text);
    };
    fetchData();
  }, []);
  return (
    <>
      <Text>Hello world!</Text>
      <Text>{data ? data : 'Loading...'}</Text>
    </>
  );
};
ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
