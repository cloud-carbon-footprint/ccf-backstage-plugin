/*
 * © 2022 Thoughtworks, Inc.
 */

import { cloudCarbonFootprintPlugin } from './plugin';

describe('cloud-carbon-footprint', () => {
  it('should export plugin', () => {
    expect(cloudCarbonFootprintPlugin).toBeDefined();
  });
});
