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

Pin webpack version in root `package.json`:
```json
{
  "resolutions": {
    "webpack": "5.70.0"
  }
}
```

Then access the plugin at `localhost:3000/cloud-carbon-footprint`. To see data populated in the UI, you must set up the backend plugin.

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

async funtion main() {
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

Create a file `app-config.local.yaml` with configuration for your cloud providers. See the [backend README](./plugins/backend/README.md) for more details.
```yaml
cloudCarbonFootprint:
  gcp:
    useBillingData: true
    billingProjectId: my-project
    billingProjectName: My Project
    bigQueryTable: billing_export_dataset.gcp_billing_export_v1_01B22A_05AA4C_87BDAC
```

Once the backend plugin is configured, usage data for the given cloud providers will be displayed in the UI.

