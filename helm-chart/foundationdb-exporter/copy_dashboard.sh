#!/bin/bash

CHART_DIR=$(dirname "$0")

cp "$CHART_DIR/../../grafana/foundationdb.json" "$CHART_DIR/grafana-dashboard.json"
