# FoundationDB Exporter

Prometheus exporter for FoundationDB. Exports values from FoundationDB
[Machine-Readable Status](https://apple.github.io/foundationdb/mr-status.html).

## Usage

Run Docker container from image
[`aikoven/foundationdb-exporter`](https://hub.docker.com/r/aikoven/foundationdb-exporter).

Metrics are exposed on `:9444/metrics` endpoint.

## Supported Metrics

See the [source code](/exporter/src/metrics.ts).

## Grafana Dashboard

This repository includes [Grafana dashboard](/grafana/foundationdb.json).

![Grafana Dashboard](/docs/grafana.png)
