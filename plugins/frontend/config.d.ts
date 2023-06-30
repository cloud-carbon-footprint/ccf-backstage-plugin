/*
 * © 2022 Thoughtworks, Inc.
 */

export interface Config {
  cloudCarbonFootprint?: {
    client?: {
      
      /**
       * The type of time period to be used. Defaults to 'months'
       * @visibility frontend
       */
      dateRangeType?: 'days' | 'weeks' | 'months' | 'quarters' | 'years';

      /**
       * The quantity of dateRangeType to be used. Defaults to 1
       * @visibility frontend
       */
      dateRangeValue?: number;

      /**
       * Value to set how the cloud provider queries should return data (e.g. day/week/month/quarter/year). Defaults to 'day'
       * @visibility frontend
       */
      groupBy?: 'day' | 'week' | 'month' | 'quarter' | 'year';

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
    };
  }
}
