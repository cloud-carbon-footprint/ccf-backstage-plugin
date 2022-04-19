
export interface Config {
  cloudCarbonFootprint?: {
    client?: {
      /**
       * Use this to ensure the application requests usage data from the entire previous calendar year to today. Unset to make this false. Defaults to true.
       * @visibility frontend
       */
      previousYearOfUsage?: boolean;
      /**
       * Value to set how the cloud provider queries should return data (e.g. day/week/month/quarter/year). Default to 'day'
       * @visibility frontend
       */
      groupBy?: 'day' | 'week' | 'month' | 'quarter' | 'year';

      /** Use the following settings if previousYearOfUsage is set to false **/

      /**
       * The type of time period to be used.
       * @visibility frontend
       */
      dateRangeType?: 'days' | 'weeks' | 'months' | 'quarters' | 'years';
      /**
       * The quantity of dateRangeType to be used.
       * @visibility frontend
       */
      dateRangeValue?: number;
    };
  }
}
