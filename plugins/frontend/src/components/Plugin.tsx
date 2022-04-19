/*
 * © 2022 Thoughtworks, Inc.
 */

import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import {
  Content,
  ErrorPanel,
  Header,
  HeaderLabel,
  Page,
  Progress,
} from '@backstage/core-components';
import { FlatRoutes } from '@backstage/core-app-api';
import { ThemeProvider } from '@material-ui/core';
import { defaultTheme } from '@cloud-carbon-footprint/client';
import { PluginTabs } from './PluginTabs';

// TODO: Can we change the location from the cache-files? `packages/backend` is far from optimal :/
export const Plugin = ({ loading }: { loading?: boolean }) => {
  const [error, setError] = useState<Error>();

  return (
    <Page themeId="tool">
      <Header title="Cloud Carbon Footprint" type="tool">
        <HeaderLabel label="Owner" value="Team X" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      <Content>
        {error && (
          <p>
            <ErrorPanel error={error} />
          </p>
        )}
        {loading && <Progress />}
        <ThemeProvider theme={defaultTheme()}>
          <FlatRoutes>
            <Route
              path="/*"
              element={<PluginTabs error={error} setError={setError} />}
            />
          </FlatRoutes>
        </ThemeProvider>
      </Content>
    </Page>
  );
};
