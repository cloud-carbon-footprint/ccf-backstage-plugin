/*
 * © 2022 Thoughtworks, Inc.
 */

export interface Config {
  cloudCarbonFootprint?: {
    client?: {
      /**
       * Requests usage data from the entire previous calendar year to today. 
       * If set, it will take precedence over all other configured start dates.
       * @visibility frontend
       */
      previousYearOfUsage?: boolean;
      
      /**
       * Legacy date range config - Optionally set the date range to query the data starting back in days/weeks/months/quarters/years to the current date
       * If set, these will take least precedence over all other configured start dates
       * @visibility frontend
       */
      dateRangeType?: 'days' | 'weeks' | 'months' | 'quarters' | 'years';

      /**
       * Legacy date range config - Optionally set the date range to query the data starting back in days/weeks/months/quarters/years to the current date
       * If set, these will take least precedence over all other configured start dates
       * @visibility frontend
       */
      dateRangeValue?: number;

      /**
       * Modern date range config - Optionally set the date range to query data based on custom start/end timestamps
       * If set, these will take precedence over configured date range value/type, but not previous year of usage
       * yyyy-mm-dd
       * @visibility frontend
       */
      startDate?: string;

      /**
       * Modern date range config - Optionally set the date range to query data based on custom start/end timestamps
       * If set, these will take precedence over configured date range value/type, but not previous year of usage
       * yyyy-mm-dd
       * @visibility frontend
       */
      endDate?: string;

      /**
       * Value to set how the cloud provider queries should return data (e.g. day/week/month/quarter/year). Defaults to 'day'
       * @visibility frontend
       */
      groupBy?: 'day' | 'week' | 'month' | 'quarter' | 'year';

      /**
      * The amount of days to subtract from current date as end date.
      * @visibility frontend
      */
      minimalDateAge?: number;

      /**
      * When using MongoDB as cache, large results will be paginated and split into multiple requests. Use this to set a limit for results per page/request.
      * @visibility frontend
      */
      pageLimit?: string;
      
      /**
      * Whether to disable the cache and request fresh estimates each time. Defaults to false
      * @visibility frontend
      */
      disableCache?: string;

      /**
      * Set to true to disable recommendations forecast validation. Defaults to false. (For accurate forecasts, it is recommended to keep this enabled).
      * @visibility frontend
      */
      disableForecastValidation?: boolean;

      /**
      * Optionally configure the API base URL to use a custom API endpoint
      * @visibility frontend
      */
      baseUrl?: string;

      /**
      * Starts the application in test mode. Defaults to false.
      * @visibility frontend
      */
      testMode?: boolean;
    };
  }
}
