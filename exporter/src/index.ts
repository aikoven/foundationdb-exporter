import * as fdb from 'foundationdb';
import Koa = require('koa');
import {renderMetric, Metric} from './utils';
import {FDBStatus} from './types';
import {metrics} from './metrics';

main().catch(err => console.error(err));

async function main() {
  fdb.setAPIVersion(600); // TODO: env

  const db = await fdb.open();

  const statusKey = Buffer.from('\xff\xff/status/json', 'ascii');

  const app = new Koa();

  app.use(async ctx => {
    if (ctx.request.path === '/metrics') {
      ctx.response.append(
        'Content-Type',
        'text/plain; version=0.0.4; charset=utf-8',
      );

      const startTime = Date.now();

      const value = await db.get(statusKey);

      if (value != null) {
        const status = JSON.parse(value.toString()) as FDBStatus;

        const exporterLatencyMetric: Metric = {
          type: 'gauge',
          name: 'fdb_exporter_latency_seconds',
          help: 'The latency of collecting metrics',
          values: [{value: (Date.now() - startTime) / 1000}],
        };

        ctx.response.body = [exporterLatencyMetric, ...metrics(status)]
          .map(renderMetric)
          .join('\n');
      } else {
        ctx.response.body = '';
      }
    }
  });

  const server = app.listen(9444);

  await new Promise(resolve => process.on('SIGTERM', resolve));

  await new Promise((resolve, reject) =>
    server.close(err => (err == null ? resolve() : reject(err))),
  );

  db.close();
}
