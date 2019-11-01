export type Metric = {
  type: 'counter' | 'gauge';
  name: string;
  help: string;
  values: Array<{
    labels?: {[key: string]: string};
    value: number;
  }>;
};

export function renderMetric(metric: Metric): string {
  const name = escapeString(metric.name);
  const help = `# HELP ${name} ${escapeString(metric.help)}`;
  const type = `# TYPE ${name} ${metric.type}`;

  let values = '';
  for (const val of metric.values || []) {
    let labels = '';

    if (val.labels) {
      for (const key of Object.keys(val.labels)) {
        labels += `${key}="${escapeLabelValue(val.labels[key])}",`;
      }
    }

    let metricName = metric.name;
    if (labels) {
      metricName += `{${labels.substring(0, labels.length - 1)}}`;
    }

    let line = `${metricName} ${getValueAsString(val.value)}`;
    values += `${line.trim()}\n`;
  }

  return `${help}\n${type}\n${values}`;
}

function escapeString(str: string) {
  return str.replace(/\n/g, '\\n').replace(/\\(?!n)/g, '\\\\');
}

function escapeLabelValue(str: string) {
  if (typeof str !== 'string') {
    return str;
  }
  return escapeString(str).replace(/"/g, '\\"');
}

function getValueAsString(value: number) {
  if (Number.isNaN(value)) {
    return 'Nan';
  } else if (!Number.isFinite(value)) {
    if (value < 0) {
      return '-Inf';
    } else {
      return '+Inf';
    }
  } else {
    return `${value}`;
  }
}
