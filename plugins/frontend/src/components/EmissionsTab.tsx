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
  useFilters,
  buildFilters,
  useFilterDataFromEstimates,
  FilterResultResponse,
  FilterOptions,
} from '@cloud-carbon-footprint/client';
import { EstimationResult } from '@cloud-carbon-footprint/common';
import { Grid } from '@material-ui/core';

export const EmissionsTab = ({
  footprint,
  baseUrl,
}: {
  footprint: ReturnType<typeof useFootprintData>;
  baseUrl: string;
}) => {

  const filterOptions: FilterResultResponse = useFilterDataFromEstimates(
    footprint.data,
  )

  const { filteredData, filters, setFilters } = useFilters(
    footprint.data,
    buildFilters,
    filterOptions,
  )

const filterBarProps = {
    filterOptions: filterOptions as unknown as FilterOptions,
    filters,
    setFilters,
    filteredData: filteredData as EstimationResult[],
  }

  return (
  <Grid container spacing={3} direction="column">
    <Grid item>
      <EmissionsFilterBar {...filterBarProps} />
      {footprint.loading && <Progress />}
    </Grid>
    <Grid item>
      <TabbedCard title="Estimated Emissions">
        <CardTab label="Cloud Usage">
          <EmissionsOverTimeCard data={filterBarProps.filteredData} />
        </CardTab>
        <CardTab label="Breakdown">
          <Grid container direction="row" spacing={3}>
            <CarbonComparisonCard data={filterBarProps.filteredData} />
            <EmissionsBreakdownCard
              data={filterBarProps.filteredData}
              baseUrl={baseUrl}
            />
          </Grid>
        </CardTab>
      </TabbedCard>
    </Grid>
  </Grid>
)};
