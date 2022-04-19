/*
 * © 2022 Thoughtworks, Inc.
 */

import React from 'react';
import { CardTab, Progress, TabbedCard } from '@backstage/core-components';
import {
  CarbonComparisonCard,
  EmissionsBreakdownCard,
  EmissionsFilterBar,
  EmissionsOverTimeCard,
  useFootprintData,
} from '@cloud-carbon-footprint/client';
import { Grid } from '@material-ui/core';

export const EmissionsTab = ({
  footprint,
  baseUrl,
}: {
  footprint: ReturnType<typeof useFootprintData>;
  baseUrl: string;
}) => (
  <Grid container spacing={3} direction="column">
    <Grid item>
      <EmissionsFilterBar {...footprint.filterBarProps} />
      {footprint.loading && <Progress />}
    </Grid>
    <Grid item>
      <TabbedCard title="Estimated Emissions">
        <CardTab label="Cloud Usage">
          <EmissionsOverTimeCard data={footprint.filteredData} />
        </CardTab>
        <CardTab label="Breakdown">
          <Grid container direction="row" spacing={3}>
            <CarbonComparisonCard data={footprint.filteredData} />
            <EmissionsBreakdownCard
              data={footprint.filteredData}
              baseUrl={baseUrl}
            />
          </Grid>
        </CardTab>
      </TabbedCard>
    </Grid>
  </Grid>
);
