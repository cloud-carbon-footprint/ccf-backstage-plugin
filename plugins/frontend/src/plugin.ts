/*
 * © 2022 Thoughtworks, Inc.
 */

import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const cloudCarbonFootprintPlugin = createPlugin({
  id: 'cloud-carbon-footprint',
  routes: {
    root: rootRouteRef,
  },
});

export const CloudCarbonFootprintPage = cloudCarbonFootprintPlugin.provide(
  createRoutableExtension({
    name: 'CloudCarbonFootprintPage',
    component: () => import('./components/Plugin').then(m => m.Plugin),
    mountPoint: rootRouteRef,
  }),
);
