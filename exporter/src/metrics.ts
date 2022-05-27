import {FDBStatus, ProcessRoleStatus} from './types';
import {Metric} from './utils';

export function* metrics(status: FDBStatus): IterableIterator<Metric> {
  yield {
    type: 'gauge',
    name: 'fdb_database_available',
    help: 'Whether or not database is available. 1 if is, 0 otherwise',
    values: [{value: status.cluster?.database_available ? 1 : 0}],
  };
  yield {
    type: 'gauge',
    name: 'fdb_database_locked',
    help: 'Whether or not database is locked. 1 if is, 0 otherwise',
    values: [{value: status.cluster?.database_locked ? 1 : 0}],
  };

  yield {
    type: 'gauge',
    name: 'fdb_clients_total',
    help: 'Count of clients',
    values: [{value: status.cluster?.clients?.count}],
  };

  yield {
    type: 'gauge',
    name: 'fdb_datacenter_lag_seconds',
    help: 'Datacenter lag in seconds',
    values: [{value: status.cluster?.datacenter_lag?.seconds}],
  };

  yield* latencyProbeMetrics(status.cluster?.latency_probe);
  yield* workloadMetrics(status.cluster?.workload);
  yield* dataMetrics(status.cluster?.data);
  yield* qosMetrics(status.cluster?.qos);
  yield* recoveryStateMetrics(status.cluster?.recovery_state);
  yield* processesMetrics(status.cluster?.processes);
}

function* latencyProbeMetrics(
  latencyProbe: NonNullable<FDBStatus['cluster']>['latency_probe'],
): IterableIterator<Metric> {
  if (!latencyProbe) {
    return;
  }

  yield {
    type: 'gauge',
    name: 'fdb_latency_probe_read_seconds',
    help: 'Time to perform a single read',
    values: [{value: latencyProbe.read_seconds}],
  };
  yield {
    type: 'gauge',
    name: 'fdb_latency_probe_commit_seconds',
    help: 'Time to commit a sample transaction',
    values: [{value: latencyProbe.commit_seconds}],
  };
  yield {
    type: 'gauge',
    name: 'fdb_latency_probe_transaction_start_seconds',
    help: 'Time to start a sample transaction at normal priority',
    values: [{value: latencyProbe.transaction_start_seconds}],
  };
  yield {
    type: 'gauge',
    name: 'fdb_latency_probe_immediate_priority_transaction_start_seconds',
    help: 'Time to start a sample transaction at system immediate priority',
    values: [
      {value: latencyProbe.immediate_priority_transaction_start_seconds},
    ],
  };
  yield {
    type: 'gauge',
    name: 'fdb_latency_probe_batch_priority_transaction_start_seconds',
    help: 'Time to start a sample transaction at batch priority',
    values: [{value: latencyProbe.batch_priority_transaction_start_seconds}],
  };
}

function* workloadMetrics(
  workload: NonNullable<FDBStatus['cluster']>['workload'],
): IterableIterator<Metric> {
  if (!workload) {
    return;
  }

  yield {
    type: 'counter',
    name: 'fdb_workload_operations_read_requests_total',
    help: 'Count of workload read request operations',
    values: [{value: workload.operations?.read_requests?.counter}],
  };
  yield {
    type: 'counter',
    name: 'fdb_workload_operations_reads_total',
    help: 'Count of workload read operations',
    values: [{value: workload.operations?.reads?.counter}],
  };
  yield {
    type: 'counter',
    name: 'fdb_workload_operations_writes_total',
    help: 'Count of workload write operations',
    values: [{value: workload.operations?.writes?.counter}],
  };

  yield {
    type: 'counter',
    name: 'fdb_workload_transactions_started_total',
    help: 'Count of workload started transactions',
    values: [{value: workload.transactions?.started?.counter}],
  };
  yield {
    type: 'counter',
    name: 'fdb_workload_transactions_committed_total',
    help: 'Count of workload committed transactions',
    values: [{value: workload.transactions?.committed?.counter}],
  };
  yield {
    type: 'counter',
    name: 'fdb_workload_transactions_conflicted_total',
    help: 'Count of workload conflicted transactions',
    values: [{value: workload.transactions?.conflicted?.counter}],
  };

  yield {
    type: 'counter',
    name: 'fdb_workload_keys_read_total',
    help: 'Count of workload keys read',
    values: [{value: workload.keys?.read?.counter}],
  };

  yield {
    type: 'counter',
    name: 'fdb_workload_bytes_read_total',
    help: 'Count of workload bytes read',
    values: [{value: workload.bytes?.read?.counter}],
  };
  yield {
    type: 'counter',
    name: 'fdb_workload_bytes_written_total',
    help: 'Count of workload bytes written',
    values: [{value: workload.bytes?.written?.counter}],
  };
}

function* dataMetrics(
  data: NonNullable<FDBStatus['cluster']>['data'],
): IterableIterator<Metric> {
  if (!data) {
    return;
  }

  if (data.state?.name != null) {
    yield {
      type: 'gauge',
      name: 'fdb_data_state',
      help: 'Indicates data state',
      values: [
        {
          labels: {state: data.state.name},
          value: 1,
        },
      ],
    };
  }

  yield {
    type: 'gauge',
    name: 'fdb_data_least_operating_space_log_server_bytes',
    help: 'Operating space on most full log server',
    values: [{value: data.least_operating_space_bytes_log_server}],
  };
  yield {
    type: 'gauge',
    name: 'fdb_data_least_operating_space_storage_server_bytes',
    help: 'Operating space on most full storage server',
    values: [{value: data.least_operating_space_bytes_storage_server}],
  };

  yield {
    type: 'gauge',
    name: 'fdb_data_average_partition_size_bytes',
    help: 'Average partition size',
    values: [{value: data.average_partition_size_bytes}],
  };
  yield {
    type: 'gauge',
    name: 'fdb_data_partitions_total',
    help: 'Partitions count',
    values: [{value: data.partitions_count}],
  };

  yield {
    type: 'gauge',
    name: 'fdb_data_total_disk_used_bytes',
    help: 'Total disk used',
    values: [{value: data.total_disk_used_bytes}],
  };
  yield {
    type: 'gauge',
    name: 'fdb_data_total_kv_size_bytes',
    help: 'Total KV size',
    values: [{value: data.total_kv_size_bytes}],
  };
  yield {
    type: 'gauge',
    name: 'fdb_data_system_kv_size_bytes',
    help: 'System KV size',
    values: [{value: data.system_kv_size_bytes}],
  };

  if (data.moving_data) {
    yield {
      type: 'gauge',
      name: 'fdb_data_moving_in_flight_bytes',
      help: 'Moving data in-flight bytes',
      values: [{value: data.moving_data.in_flight_bytes}],
    };
    yield {
      type: 'gauge',
      name: 'fdb_data_moving_in_queue_bytes',
      help: 'Moving data in-queue bytes',
      values: [{value: data.moving_data.in_queue_bytes}],
    };
    yield {
      type: 'counter',
      name: 'fdb_data_moving_total_written_bytes',
      help: 'Moving data total written bytes',
      values: [{value: data.moving_data.total_written_bytes}],
    };
  }
}

function* qosMetrics(
  qos: NonNullable<FDBStatus['cluster']>['qos'],
): IterableIterator<Metric> {
  if (!qos) {
    return;
  }

  yield {
    type: 'gauge',
    name: 'fdb_qos_limiting_storage_server_data_lag_seconds',
    help: 'QoS limiting data lag among storage servers',
    values: [{value: qos.limiting_data_lag_storage_server?.seconds}],
  };
  yield {
    type: 'gauge',
    name: 'fdb_qos_limiting_storage_server_durability_lag_seconds',
    help: 'QoS limiting durability lag among storage servers',
    values: [{value: qos.limiting_durability_lag_storage_server?.seconds}],
  };
  yield {
    type: 'gauge',
    name: 'fdb_qos_limiting_storage_server_queue_bytes',
    help: 'QoS limiting queue bytes among storage servers',
    values: [{value: qos.limiting_queue_bytes_storage_server}],
  };

  yield {
    type: 'gauge',
    name: 'fdb_qos_worst_storage_server_data_lag_seconds',
    help: 'QoS worst data lag among storage servers',
    values: [{value: qos.worst_data_lag_storage_server?.seconds}],
  };
  yield {
    type: 'gauge',
    name: 'fdb_qos_worst_storage_server_durability_lag_seconds',
    help: 'QoS worst durability lag among storage servers',
    values: [{value: qos.worst_durability_lag_storage_server?.seconds}],
  };
  yield {
    type: 'gauge',
    name: 'fdb_qos_worst_storage_server_queue_bytes',
    help: 'QoS worst queue bytes among storage servers',
    values: [{value: qos.worst_queue_bytes_storage_server}],
  };

  yield {
    type: 'gauge',
    name: 'fdb_qos_worst_log_server_queue_bytes',
    help: 'QoS worst queue bytes among log servers',
    values: [{value: qos.worst_queue_bytes_log_server}],
  };

  yield {
    type: 'gauge',
    name: 'fdb_qos_released_transactions_per_second',
    help: 'QoS released transactions per second',
    values: [{value: qos.released_transactions_per_second}],
  };
  yield {
    type: 'gauge',
    name: 'fdb_qos_transactions_per_second_limit',
    help: 'QoS transactions per second limit',
    values: [{value: qos.transactions_per_second_limit}],
  };

  if (qos.performance_limited_by) {
    yield {
      type: 'gauge',
      name: 'fdb_qos_performance_limited_by',
      help: 'Indicates the reason for limited performance',
      values: [
        {
          labels: {
            name: qos.performance_limited_by.name,
            description: qos.performance_limited_by.description,
          },
          value: 1,
        },
      ],
    };
  }

  yield {
    type: 'gauge',
    name: 'fdb_qos_batch_released_transactions_per_second',
    help: 'QoS released transactions per second',
    values: [{value: qos.batch_released_transactions_per_second}],
  };
  yield {
    type: 'gauge',
    name: 'fdb_qos_batch_transactions_per_second_limit',
    help: 'QoS transactions per second limit',
    values: [{value: qos.batch_transactions_per_second_limit}],
  };

  if (qos.batch_performance_limited_by) {
    yield {
      type: 'gauge',
      name: 'fdb_qos_batch_performance_limited_by',
      help: 'Indicates the reason for limited performance',
      values: [
        {
          labels: {
            name: qos.batch_performance_limited_by.name,
            description: qos.batch_performance_limited_by.description,
          },
          value: 1,
        },
      ],
    };
  }
}

function* recoveryStateMetrics(
  recoveryState: NonNullable<FDBStatus['cluster']>['recovery_state'],
): IterableIterator<Metric> {
  if (!recoveryState) {
    return;
  }

  yield {
    type: 'gauge',
    name: 'fdb_recovery_state',
    help: 'Recovery state info',
    values: [
      {
        labels: {
          name: recoveryState.name,
          description: recoveryState.description,
        },
        value: 1,
      },
    ],
  };

  yield {
    type: 'gauge',
    name: 'fdb_recovery_state_active_generations',
    help: 'Recovery state active generations count',
    values: [{value: recoveryState.active_generations}],
  };
}

function* processesMetrics(
  processes: NonNullable<FDBStatus['cluster']>['processes'],
): IterableIterator<Metric> {
  if (!processes) {
    return;
  }

  yield {
    type: 'gauge',
    name: 'fdb_process_uptime_seconds',
    help: 'Process uptime',
    values: Object.entries(processes).map(([processId, status]) => ({
      labels: {processId, address: status.address},
      value: status.uptime_seconds,
    })),
  };
  yield {
    type: 'gauge',
    name: 'fdb_process_class',
    help: 'Indicates process class',
    values: Object.entries(processes).map(([processId, status]) => ({
      labels: {
        processId,
        address: status.address,
        classType: status.class_type,
      },
      value: 1,
    })),
  };
  yield {
    type: 'gauge',
    name: 'fdb_process_degraded',
    help: 'Whether or not process is degraded. 1 if is, 0 otherwise',
    values: Object.entries(processes).map(([processId, status]) => ({
      labels: {processId, address: status.address},
      value: status.degraded ? 1 : 0,
    })),
  };
  yield {
    type: 'gauge',
    name: 'fdb_process_run_loop_busy_ratio',
    help: 'Fraction of time the run loop was busy',
    values: Object.entries(processes).map(([processId, status]) => ({
      labels: {processId, address: status.address},
      value: status.run_loop_busy,
    })),
  };

  yield {
    type: 'gauge',
    name: 'fdb_process_cpu_usage_cores',
    help: 'Amount of CPU cores used by process',
    values: Object.entries(processes).map(([processId, status]) => ({
      labels: {processId, address: status.address},
      value: status.cpu?.usage_cores,
    })),
  };

  yield* processesMemoryMetrics(processes);
  yield* processesDiskMetrics(processes);
  yield* processesNetworkMetrics(processes);
  yield* processesRolesMetrics(processes);
}

function* processesMemoryMetrics(
  processes: NonNullable<FDBStatus['cluster']>['processes'],
): IterableIterator<Metric> {
  if (!processes) {
    return;
  }

  yield {
    type: 'gauge',
    name: 'fdb_process_memory_available_bytes',
    help: 'Memory in bytes available to process',
    values: Object.entries(processes).map(([processId, status]) => ({
      labels: {processId, address: status.address},
      value: status.memory?.available_bytes,
    })),
  };
  yield {
    type: 'gauge',
    name: 'fdb_process_memory_used_bytes',
    help: 'Memory in bytes used by process',
    values: Object.entries(processes).map(([processId, status]) => ({
      labels: {processId, address: status.address},
      value: status.memory?.used_bytes,
    })),
  };
  yield {
    type: 'gauge',
    name: 'fdb_process_memory_limit_bytes',
    help: 'Memory limit in bytes for process',
    values: Object.entries(processes).map(([processId, status]) => ({
      labels: {processId, address: status.address},
      value: status.memory?.limit_bytes,
    })),
  };
  yield {
    type: 'gauge',
    name: 'fdb_process_memory_unused_allocated_memory',
    help: 'Unused memory in bytes allocated by process',
    values: Object.entries(processes).map(([processId, status]) => ({
      labels: {processId, address: status.address},
      value: status.memory?.unused_allocated_memory,
    })),
  };
}

function* processesDiskMetrics(
  processes: NonNullable<FDBStatus['cluster']>['processes'],
): IterableIterator<Metric> {
  if (!processes) {
    return;
  }

  yield {
    type: 'gauge',
    name: 'fdb_process_disk_usage_ratio',
    help: 'Disk usage from 0.0 (idle) to 1.0 (fully busy)',
    values: Object.entries(processes).map(([processId, status]) => ({
      labels: {processId, address: status.address},
      value: status.disk?.busy,
    })),
  };
  yield {
    type: 'gauge',
    name: 'fdb_process_disk_free_bytes',
    help: 'Amount of free disk space in bytes',
    values: Object.entries(processes).map(([processId, status]) => ({
      labels: {processId, address: status.address},
      value: status.disk?.free_bytes,
    })),
  };
  yield {
    type: 'gauge',
    name: 'fdb_process_disk_total_bytes',
    help: 'Total amount of disk space in bytes',
    values: Object.entries(processes).map(([processId, status]) => ({
      labels: {processId, address: status.address},
      value: status.disk?.total_bytes,
    })),
  };
  yield {
    type: 'counter',
    name: 'fdb_process_disk_reads_total',
    help: 'Count of disk read operations',
    values: Object.entries(processes).map(([processId, status]) => ({
      labels: {processId, address: status.address},
      value: status.disk?.reads?.counter,
    })),
  };
  yield {
    type: 'counter',
    name: 'fdb_process_disk_writes_total',
    help: 'Count of disk write operations',
    values: Object.entries(processes).map(([processId, status]) => ({
      labels: {processId, address: status.address},
      value: status.disk?.writes?.counter,
    })),
  };
}

function* processesNetworkMetrics(
  processes: NonNullable<FDBStatus['cluster']>['processes'],
): IterableIterator<Metric> {
  if (!processes) {
    return;
  }

  yield {
    type: 'gauge',
    name: 'fdb_process_network_current_connections_total',
    help: 'Number of current connections to process',
    values: Object.entries(processes).map(([processId, status]) => ({
      labels: {processId, address: status.address},
      value: status.network?.current_connections,
    })),
  };
  yield {
    type: 'gauge',
    name: 'fdb_process_network_connection_errors_rate',
    help: 'Connection errors per second',
    values: Object.entries(processes).map(([processId, status]) => ({
      labels: {processId, address: status.address},
      value: status.network?.connection_errors?.hz,
    })),
  };
  yield {
    type: 'gauge',
    name: 'fdb_process_network_connections_closed_rate',
    help: 'Connections closed per second',
    values: Object.entries(processes).map(([processId, status]) => ({
      labels: {processId, address: status.address},
      value: status.network?.connections_closed?.hz,
    })),
  };
  yield {
    type: 'gauge',
    name: 'fdb_process_network_connections_established_rate',
    help: 'Connections established per second',
    values: Object.entries(processes).map(([processId, status]) => ({
      labels: {processId, address: status.address},
      value: status.network?.connections_established?.hz,
    })),
  };
  yield {
    type: 'gauge',
    name: 'fdb_process_network_megabits_received_rate',
    help: 'Received data rate in megabits per second',
    values: Object.entries(processes).map(([processId, status]) => ({
      labels: {processId, address: status.address},
      value: status.network?.megabits_received?.hz,
    })),
  };
  yield {
    type: 'gauge',
    name: 'fdb_process_network_megabits_sent_rate',
    help: 'Sent data rate in megabits per second',
    values: Object.entries(processes).map(([processId, status]) => ({
      labels: {processId, address: status.address},
      value: status.network?.megabits_sent?.hz,
    })),
  };
}

function* processesRolesMetrics(
  processes: NonNullable<FDBStatus['cluster']>['processes'],
): IterableIterator<Metric> {
  if (!processes) {
    return;
  }

  yield {
    type: 'gauge',
    name: 'fdb_process_role',
    help: 'Indicates process roles',
    values: Object.entries(processes).flatMap(([processId, processStatus]) =>
      (processStatus.roles ?? []).map((status) => ({
        labels: {processId, address: processStatus.address, role: status.role},
        value: 1,
      })),
    ),
  };

  yield* storageProcessesMetrics(processes);
  yield* logProcessesMetrics(processes);
}

function* storageProcessesMetrics(
  processes: NonNullable<FDBStatus['cluster']>['processes'],
): IterableIterator<Metric> {
  if (!processes) {
    return;
  }

  yield {
    type: 'gauge',
    name: 'fdb_process_storage_data_lag_seconds',
    help: 'Storage process data lag',
    values: Object.entries(processes).flatMap(([processId, processStatus]) =>
      (processStatus.roles ?? []).filter(isRole('storage')).map((status) => ({
        labels: {processId, address: processStatus.address},
        value: status.data_lag?.seconds,
      })),
    ),
  };
  yield {
    type: 'gauge',
    name: 'fdb_process_storage_durability_lag_seconds',
    help: 'Storage process durability lag',
    values: Object.entries(processes).flatMap(([processId, processStatus]) =>
      (processStatus.roles ?? []).filter(isRole('storage')).map((status) => ({
        labels: {processId, address: processStatus.address},
        value: status.durability_lag?.seconds,
      })),
    ),
  };

  yield {
    type: 'counter',
    name: 'fdb_process_storage_input_bytes_total',
    help: 'Storage process input bytes',
    values: Object.entries(processes).flatMap(([processId, processStatus]) =>
      (processStatus.roles ?? []).filter(isRole('storage')).map((status) => ({
        labels: {processId, address: processStatus.address},
        value: status.input_bytes?.counter,
      })),
    ),
  };
  yield {
    type: 'counter',
    name: 'fdb_process_storage_durable_bytes_total',
    help: 'Storage process durable bytes',
    values: Object.entries(processes).flatMap(([processId, processStatus]) =>
      (processStatus.roles ?? []).filter(isRole('storage')).map((status) => ({
        labels: {processId, address: processStatus.address},
        value: status.durable_bytes?.counter,
      })),
    ),
  };

  yield {
    type: 'gauge',
    name: 'fdb_process_storage_stored_bytes',
    help: 'Storage process stored bytes',
    values: Object.entries(processes).flatMap(([processId, processStatus]) =>
      (processStatus.roles ?? []).filter(isRole('storage')).map((status) => ({
        labels: {processId, address: processStatus.address},
        value: status.stored_bytes,
      })),
    ),
  };

  yield {
    type: 'gauge',
    name: 'fdb_process_storage_kvstore_available_bytes',
    help: 'Storage process KV store available bytes',
    values: Object.entries(processes).flatMap(([processId, processStatus]) =>
      (processStatus.roles ?? []).filter(isRole('storage')).map((status) => ({
        labels: {processId, address: processStatus.address},
        value: status.kvstore_available_bytes,
      })),
    ),
  };
  yield {
    type: 'gauge',
    name: 'fdb_process_storage_kvstore_free_bytes',
    help: 'Storage process KV store free bytes',
    values: Object.entries(processes).flatMap(([processId, processStatus]) =>
      (processStatus.roles ?? []).filter(isRole('storage')).map((status) => ({
        labels: {processId, address: processStatus.address},
        value: status.kvstore_free_bytes,
      })),
    ),
  };
  yield {
    type: 'gauge',
    name: 'fdb_process_storage_kvstore_total_bytes',
    help: 'Storage process KV store total bytes',
    values: Object.entries(processes).flatMap(([processId, processStatus]) =>
      (processStatus.roles ?? []).filter(isRole('storage')).map((status) => ({
        labels: {processId, address: processStatus.address},
        value: status.kvstore_total_bytes,
      })),
    ),
  };
  yield {
    type: 'gauge',
    name: 'fdb_process_storage_kvstore_used_bytes',
    help: 'Storage process KV store used bytes',
    values: Object.entries(processes).flatMap(([processId, processStatus]) =>
      (processStatus.roles ?? []).filter(isRole('storage')).map((status) => ({
        labels: {processId, address: processStatus.address},
        value: status.kvstore_used_bytes,
      })),
    ),
  };
}

function* logProcessesMetrics(
  processes: NonNullable<FDBStatus['cluster']>['processes'],
): IterableIterator<Metric> {
  if (!processes) {
    return;
  }

  yield {
    type: 'gauge',
    name: 'fdb_process_log_queue_disk_available_bytes',
    help: 'Log process queue disk available bytes',
    values: Object.entries(processes).flatMap(([processId, processStatus]) =>
      (processStatus.roles ?? []).filter(isRole('log')).map((status) => ({
        labels: {processId, address: processStatus.address},
        value: status.queue_disk_available_bytes,
      })),
    ),
  };
  yield {
    type: 'gauge',
    name: 'fdb_process_log_queue_disk_free_bytes',
    help: 'Log process queue disk free bytes',
    values: Object.entries(processes).flatMap(([processId, processStatus]) =>
      (processStatus.roles ?? []).filter(isRole('log')).map((status) => ({
        labels: {processId, address: processStatus.address},
        value: status.queue_disk_free_bytes,
      })),
    ),
  };
  yield {
    type: 'gauge',
    name: 'fdb_process_log_queue_disk_total_bytes',
    help: 'Log process queue disk total bytes',
    values: Object.entries(processes).flatMap(([processId, processStatus]) =>
      (processStatus.roles ?? []).filter(isRole('log')).map((status) => ({
        labels: {processId, address: processStatus.address},
        value: status.queue_disk_total_bytes,
      })),
    ),
  };
  yield {
    type: 'gauge',
    name: 'fdb_process_log_queue_disk_used_bytes',
    help: 'Log process queue disk used bytes',
    values: Object.entries(processes).flatMap(([processId, processStatus]) =>
      (processStatus.roles ?? []).filter(isRole('log')).map((status) => ({
        labels: {processId, address: processStatus.address},
        value: status.queue_disk_used_bytes,
      })),
    ),
  };

  yield {
    type: 'counter',
    name: 'fdb_process_log_input_bytes_total',
    help: 'Log process input bytes',
    values: Object.entries(processes).flatMap(([processId, processStatus]) =>
      (processStatus.roles ?? []).filter(isRole('log')).map((status) => ({
        labels: {processId, address: processStatus.address},
        value: status.input_bytes?.counter,
      })),
    ),
  };
  yield {
    type: 'counter',
    name: 'fdb_process_log_durable_bytes_total',
    help: 'Log process durable bytes',
    values: Object.entries(processes).flatMap(([processId, processStatus]) =>
      (processStatus.roles ?? []).filter(isRole('log')).map((status) => ({
        labels: {processId, address: processStatus.address},
        value: status.durable_bytes?.counter,
      })),
    ),
  };
}

function isRole<Role extends ProcessRoleStatus['role']>(role: Role) {
  return (
    status: ProcessRoleStatus,
  ): status is Extract<ProcessRoleStatus, {role: Role}> => status.role === role;
}
