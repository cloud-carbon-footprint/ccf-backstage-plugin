# cloud-carbon-footprint-frontend

### Configuration

Optionally, add config to `app-config.local.yaml`. See the [client config schema](./plugins/frontend/config.d.ts) for more details. Note that long date ranges and/or granular groupings can result in long load times. The default values are:
```yaml
cloudCarbonFootprint:
  client:
    dateRangeType: months
    dateRangeValue: 1
    groupBy: week
```

