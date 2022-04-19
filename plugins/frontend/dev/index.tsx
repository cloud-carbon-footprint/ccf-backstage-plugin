/*
 * © 2022 Thoughtworks, Inc.
 */

import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import {
  cloudCarbonFootprintPlugin,
  CloudCarbonFootprintPage,
} from '../src/plugin';

createDevApp()
  .registerPlugin(cloudCarbonFootprintPlugin)
  .addPage({
    element: <CloudCarbonFootprintPage />,
    title: 'Root Page',
    path: '/cloud-carbon-footprint',
  })
  .render();
