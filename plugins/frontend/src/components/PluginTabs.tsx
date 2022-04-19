/*
 * © 2022 Thoughtworks, Inc.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { Config } from '@backstage/config';
import { InfoCard, TabbedLayout } from '@backstage/core-components';
import {
  configApiRef,
  DiscoveryApi,
  discoveryApiRef,
  useApi,
} from '@backstage/core-plugin-api';
import {
  CarbonIntensityMap,
  Methodology,
  useFootprintData,
  useRecommendationData,
} from '@cloud-carbon-footprint/client';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import { EmissionsTab } from './EmissionsTab';
import { RecommendationsTab } from './RecommendationTab';

const determineDates = (clientConfig?: Config) => {
  const endDate: moment.Moment = moment.utc();
  const defaultStartDate: moment.Moment = moment.utc().subtract(1, 'months');

  const dateRangeValue = clientConfig?.getOptionalNumber('dateRangeValue');
  const dateRangeType = clientConfig?.getOptionalString('dateRangeType');

  const startDate: moment.Moment =
    dateRangeType && dateRangeValue
      ? moment
          .utc()
          .subtract(
            dateRangeValue,
            dateRangeType as moment.unitOfTime.DurationConstructor,
          )
      : defaultStartDate;
  return { endDate, startDate };
};

export const PluginTabs = ({
  error,
  setError,
}: {
  error?: Error;
  setError: React.Dispatch<React.SetStateAction<Error | undefined>>;
}) => {
  const config = useApi(configApiRef);
  const clientConfig = useMemo(
    () => config.getOptionalConfig('cloudCarbonFootprint.client'),
    [config],
  );
  const groupBy = useMemo(() => clientConfig?.getOptionalString('groupBy') ?? 'week', [clientConfig]);
  const { endDate, startDate } = useMemo(
    () => determineDates(clientConfig),
    [clientConfig],
  );
  const [baseUrl, setUrl] = useState<string>('');
  const discovery: DiscoveryApi = useApi(discoveryApiRef);
  const footprint = useFootprintData({ baseUrl, startDate, endDate, groupBy });
  const recommendations = useRecommendationData({ baseUrl, groupBy });

  useEffect(() => {
    discovery.getBaseUrl('cloud-carbon-footprint').then(url => setUrl(url));
  }, [discovery]);

  if (!error && (footprint.error || recommendations.error)) {
    if (footprint.error) {
      setError(footprint.error);
    } else if (recommendations.error) {
      setError(recommendations.error);
    }
  }

  return (
    <TabbedLayout>
      <TabbedLayout.Route path="/emissions" title="Emissions">
        <EmissionsTab footprint={footprint} baseUrl={baseUrl} />
      </TabbedLayout.Route>
      <TabbedLayout.Route path="/recommendations" title="Recommendations">
        <RecommendationsTab recommendations={recommendations} />
      </TabbedLayout.Route>
      <TabbedLayout.Route path="/carbon-map" title="Carbon Intensity Map">
        <Grid container spacing={3} direction="column">
          <CarbonIntensityMap />
        </Grid>
      </TabbedLayout.Route>
      <TabbedLayout.Route path="/methodology" title="Methodology">
        <Grid container spacing={3} direction="column">
          <InfoCard title="How do we get our carbon estimates?">
            <Methodology />
          </InfoCard>
        </Grid>
      </TabbedLayout.Route>
    </TabbedLayout>
  );
};
