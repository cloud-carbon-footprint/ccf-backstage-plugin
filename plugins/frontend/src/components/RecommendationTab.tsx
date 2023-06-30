/*
 * © 2022 Thoughtworks, Inc.
 */

import React, { useState } from 'react';
import {
  RecommendationsFilterBar,
  RecommendationsTable,
  useRecommendationData,
  useFootprintData,
  sliceFootprintDataByLastMonth,
  checkFootprintDates,
  Co2eUnit,
} from '@cloud-carbon-footprint/client';
import { Grid } from '@material-ui/core';
import { Progress } from '@backstage/core-components';

export const RecommendationsTab = ({
  recommendations,
  footprint,
  groupBy,
}: {
  recommendations: ReturnType<typeof useRecommendationData>;
  footprint: ReturnType<typeof useFootprintData>;
  groupBy: string;
}) => {
  const [co2eUnit, setCo2eUnit] = useState(Co2eUnit.MetricTonnes)

  const slicedFootprint = sliceFootprintDataByLastMonth(footprint.data, groupBy)
  const forecastDetails = checkFootprintDates(slicedFootprint, groupBy)

  return (
    <Grid container spacing={3} direction="column">
      <Grid item>
        <RecommendationsFilterBar
          {...recommendations.filterBarProps}
          setCo2eUnit={setCo2eUnit}
        />
        {recommendations.loading && <Progress />}
      </Grid>
      <Grid item>
        <RecommendationsTable
          emissionsData={slicedFootprint}
          recommendations={recommendations.filteredRecommendationData}
          co2eUnit={co2eUnit}
          forecastDetails={forecastDetails}
        />
      </Grid>
    </Grid>
  );
};
