# cloud-carbon-footprint-backend

## Configuration

CCF requires separate configuration for each cloud provider. It also requires specific permissions and billing exports to be configured.

The [CCF docs](https://www.cloudcarbonfootprint.org/docs/introduction) are the source of truth for CCF configuration. This readme aims to guide users how to inject relevant configuration into Backstage using its [static configuration mechanism](https://backstage.io/docs/conf/).

To see data, set follow the setup for one or more of the cloud providers.

### GCP

Follow the first three steps given [here](https://www.cloudcarbonfootprint.org/docs/gcp).

Then, put relevant values into the Backstage config (see the schema in `./config.d.ts`). They will be injected into to CCF config.

Here is an example of the recommended billing-based approach with GCP:

```yaml
# app-config.local.yaml
cloudCarbonFootprint:
  gcp:
    useBillingData: true
    billingProjectId: my-project
    billingProjectName: My Project
    bigQueryTable: billing_export_dataset.gcp_billing_export_v1_01B22A_05AA4C_87BDAC
```

### AWS

Follow the first four steps given [here](https://www.cloudcarbonfootprint.org/docs/aws/)

Then, put relevant values into the Backstage config (see the schema in `./config.d.ts`). They will be injected into to CCF config.

Here is an example of the recommended billing-based approach with AWS:

```yaml
# app-config.local.yaml
cloudCarbonFootprint:
  aws:
    useBillingData: true
    athenaDbName: athena-db
    athenaDbTable: billing export table
    athenaRegion: us-east-1
    athenaQueryResultLocation: s3://bucket
    billingAccountId: cool-account
    billingAccountName: Cool account, low emissions
```

### Azure

Follow the first three steps given [here](https://www.cloudcarbonfootprint.org/docs/azure/)

Then, put relevant values into the Backstage config (see the schema in `./config.d.ts`). They will be injected into to CCF config.

Here is an example of the recommended billing-based approach with Azure:

```yaml
# app-config.local.yaml
cloudCarbonFootprint:
  azure:
    useBillingData: true,
    clientId: client id,
    clientSecret: shhh,
    tenantId: tenant id,
```
