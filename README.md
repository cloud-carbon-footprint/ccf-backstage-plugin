# CCF Backstage Plugin

Understand how your cloud usage impacts our environment and what you can do about it.

This plugin brings the functionallity of the open source project [Cloud Carbon Footprint](https://www.cloudcarbonfootprint.org/) into Backstage. See [the CCF demo](https://demo.cloudcarbonfootprint.org/) and [the CCF docs](https://www.cloudcarbonfootprint.org/docs/overview) for more details.

For more visibility into the work planned and happening, please visit the [project board](https://github.com/cloud-carbon-footprint/cloud-carbon-footprint/projects/1) or [create an issue.](https://github.com/cloud-carbon-footprint/cloud-carbon-footprint/issues/new/choose)
For feedback, questions, or if you’d like to collaborate on shaping the product direction, please reach out to [green-cloud@thoughtworks.com](mailto:green-cloud@thoughtworks.com).

|Estimates | Forecast |
|---|---|
| ![Screenshot 2022-04-01 at 17 07 07](https://user-images.githubusercontent.com/8904624/161291252-c771f806-8ddf-4121-abf7-429217e64664.png) | ![Screenshot 2022-04-01 at 17 07 24](https://user-images.githubusercontent.com/8904624/161292172-e18d2894-45f1-4231-a353-035d821a9312.png) |

| Recommendations | Carbon Intensity Map |
|---|---|
| ![Screenshot 2022-04-01 at 17 07 35](https://user-images.githubusercontent.com/8904624/161291044-309b7b62-106a-4254-bdd9-5b432cf35232.png) | ![Screenshot 2022-04-01 at 17 07 45](https://user-images.githubusercontent.com/8904624/161291047-1d093d5a-4883-448a-8d08-5180c8d867d7.png) |

## Getting started

If you haven't already, check out the [Backstage docs](https://backstage.io/docs/getting-started/) and create a Backstage application with
```
npx @backstage/create-app
```

Then, you will need to install and configure the CCF plugins for the frontend and the backend.

### Frontend plugin

Install:
```bash
cd packages/app
yarn add @cloud-carbon-footprint/backstage-plugin-frontend
```

Add the plugin to `packages/app/src/App.tsx`:
```jsx
// import:
import { CloudCarbonFootprintPage } from '@cloud-carbon-footprint/backstage-plugin-frontend'

// add to routes:
const routes = (
  <FlatRoutes ...>
  ...
    <Route path="/cloud-carbon-footprint" element={<CloudCarbonFootprintPage />} />
  </FlatRoutes>
)
```

In the recent v4 release of `@cloud-carbon-footprint/client` package, we introduced React 18. Until [official support for React 18]([url](https://github.com/backstage/backstage/milestone/41)) is added to Backstage, there is a low-lift solution to help solve [this issue]([url](https://github.com/cloud-carbon-footprint/ccf-backstage-plugin/issues/75)):

In the root `package.json` of your new Backstage application, you will need to add the following to the resolutions object and do a fresh `yarn install`:

```diff
  "resolutions": {
    "@types/react": "^17",
    "@types/react-dom": "^17",
+   "react": "^17",
    }
```

Optionally, add config to `app-config.local.yaml`. See the [client config schema](./plugins/frontend/config.d.ts) for more details. Note that long date ranges and/or granular groupings can result in long load times. The default values are:
```yaml
cloudCarbonFootprint:
  client:
    dateRangeType: months
    dateRangeValue: 1
    groupBy: week
```

Then, run `yarn dev` and access the plugin at `localhost:3000/cloud-carbon-footprint`. To see data populated in the UI, you must set up the backend plugin.

### Backend plugin

Install:
```bash
cd packages/backend
yarn add @cloud-carbon-footprint/backstage-plugin-backend
```

Create a file `packages/backend/src/plugins/ccf.ts`:
```typescript
import { createRouter } from '@cloud-carbon-footprint/backstage-plugin-backend';
import { PluginEnvironment } from '../types';

export default async function createPlugin({
  logger,
  config,
}: PluginEnvironment) {
  return await createRouter({
    config,
    logger,
  });
}
```

Add the plugin to `packages/backend/src/index.ts`:
```typescript
// import:
import ccf from './plugins/ccf';
...

async function main() {
  ...
  // add env
  const ccfEnv = useHotMemoize(module, () =>
    createEnv('cloud-carbon-footprint'),
  );

  ...
  // add to router
  apiRouter.use('/cloud-carbon-footprint', await ccf(ccfEnv));
  ...
}
```

Add configuration for your cloud providers to `app-config.local.yaml`. See the [backend README](./plugins/backend/README.md) for more details.
```yaml
cloudCarbonFootprint:
  gcp:
    useBillingData: true
    billingProjectId: my-project
    billingProjectName: My Project
    bigQueryTable: billing_export_dataset.gcp_billing_export_v1_01B22A_05AA4C_87BDAC
```

Once the backend plugin is configured, usage data for the given cloud providers will be displayed in the UI.

## Join Us!

To begin as a contributor, please see the [contributing page](CONTRIBUTING.md).
Please read through our [code of conduct](CODE_OF_CONDUCT.md) for our expectations around this community.

⭐️Give us a star if you like the project or find this work interesting!


### Don’t be shy!
Reach out with any questions, support requests, and further discussions in our **[discussion google group](https://groups.google.com/g/cloud-carbon-footprint)**.


## License

Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0

---

© 2022 Thoughtworks, Inc.
