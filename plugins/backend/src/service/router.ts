/*
 * © 2022 Thoughtworks, Inc.
 */

import { errorHandler } from '@backstage/backend-common';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';
// @ts-ignore
import { createRouter as CCFRouter } from '@cloud-carbon-footprint/api/dist/api';
import { Config as BackstageConfig } from '@backstage/config';
import { convertConfig } from './convertConfig';

export interface RouterOptions {
  logger: Logger;
  config?: BackstageConfig;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;

  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.send({ status: 'ok' });
  });

  const ccfConfig = convertConfig(options.config);
  const ccfRouter = CCFRouter(ccfConfig);

  router.use(ccfRouter);
  router.use(errorHandler());
  return router;
}
