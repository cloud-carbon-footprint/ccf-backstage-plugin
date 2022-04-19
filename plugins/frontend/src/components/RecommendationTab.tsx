/*
 * © 2022 Thoughtworks, Inc.
 */

import React, { useState } from 'react';
import {
  RecommendationsFilterBar,
  RecommendationsTable,
  useRecommendationData,
} from '@cloud-carbon-footprint/client';
import { Grid } from '@material-ui/core';
import { Progress } from '@backstage/core-components';

export const RecommendationsTab = ({
  recommendations,
}: {
  recommendations: ReturnType<typeof useRecommendationData>;
}) => {
  const [useKilograms, setUseKilograms] = useState(false);

  return (
    <Grid container spacing={3} direction="column">
      <Grid item>
        <RecommendationsFilterBar
          {...recommendations.filterBarProps}
          setUseKilograms={setUseKilograms}
        />
        {recommendations.loading && <Progress />}
      </Grid>
      <Grid item>
        <RecommendationsTable
          emissionsData={recommendations.filteredEmissionsData}
          recommendations={recommendations.filteredRecommendationData}
          useKilograms={useKilograms}
        />
      </Grid>
    </Grid>
  );
};
