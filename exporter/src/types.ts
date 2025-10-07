export type InstanceStatus = {
  blob_stats?: {
    recent?: {
      bytes_per_second?: number;
      bytes_sent?: number;
      requests_failed?: number;
      requests_successful?: number;
    };
    total?: {
      bytes_sent?: number;
      requests_failed?: number;
      requests_successful?: number;
    };
  };
  configured_workers?: number;
  id?: string;
  last_updated?: number;
  locality?: {};
  main_thread_cpu_seconds?: number;
  memory_usage?: number;
  networkAddress?: string;
  processID?: number;
  process_cpu_seconds?: number;
  resident_size?: number;
  version?: string;
};

export type MachineStatus = {
  address?: string;
  contributing_workers?: number;
  cpu?: {
    logical_core_utilization?: number;
  };
  excluded?: boolean;
  locality?: {
    instance_id?: string;
    machineid?: string;
    processid?: string;
    zoneid?: string;
  };
  machine_id?: string;
  memory?: {
    committed_bytes?: number;
    free_bytes?: number;
    total_bytes?: number;
  };
  network?: {
    megabits_received?: {
      hz?: number;
    };
    megabits_sent?: {
      hz?: number;
    };
    tcp_segments_retransmitted?: {
      hz?: number;
    };
  };
};

export type ProcessRoleStorageStatus = {
  role: 'storage';
  bytes_queried?: {
    counter?: number;
    hz?: number;
    roughness?: number;
  };
  data_lag?: {
    seconds?: number;
    versions?: number;
  };
  data_version?: number;
  durability_lag?: {
    seconds?: number;
    versions?: number;
  };
  durable_bytes?: {
    counter?: number;
    hz?: number;
    roughness?: number;
  };
  durable_version?: number;
  fetched_versions?: {
    counter?: number;
    hz?: number;
    roughness?: number;
  };
  fetches_from_logs?: {
    counter?: number;
    hz?: number;
    roughness?: number;
  };
  finished_queries?: {
    counter?: number;
    hz?: number;
    roughness?: number;
  };
  id?: string;
  input_bytes?: {
    counter?: number;
    hz?: number;
    roughness?: number;
  };
  keys_queried?: {
    counter?: number;
    hz?: number;
    roughness?: number;
  };
  kvstore_available_bytes?: number;
  kvstore_free_bytes?: number;
  kvstore_inline_keys?: number;
  kvstore_total_bytes?: number;
  kvstore_total_nodes?: number;
  kvstore_total_size?: number;
  kvstore_used_bytes?: number;
  local_rate?: number;
  low_priority_queries?: {
    counter?: number;
    hz?: number;
    roughness?: number;
  };
  mutation_bytes?: {
    counter?: number;
    hz?: number;
    roughness?: number;
  };
  mutations?: {
    counter?: number;
    hz?: number;
    roughness?: number;
  };
  query_queue_max?: number;
  read_latency_statistics?: {
    count?: number;
    max?: number;
    mean?: number;
    median?: number;
    min?: number;
    p25?: number;
    p90?: number;
    p95?: number;
    p99?: number;
    'p99.9'?: number;
  };
  storage_metadata?: {
    created_time_datetime?: string;
    created_time_timestamp?: number;
    storage_engine?: string;
  };
  stored_bytes?: number;
  total_queries?: {
    counter?: number;
    hz?: number;
    roughness?: number;
  };
  tss?: boolean;
};

export type ProcessRoleProxyStatus = {
  role: 'proxy';
  id?: string;
};

export type ProcessRoleCommitProxyStatus = {
  role: 'commit_proxy';
  id?: string;
  commit_batching_window_size?: {
    count?: number;
    max?: number;
    mean?: number;
    median?: number;
    min?: number;
    p25?: number;
    p90?: number;
    p95?: number;
    p99?: number;
    'p99.9'?: number;
  };
  commit_latency_statistics?: {
    count?: number;
    max?: number;
    mean?: number;
    median?: number;
    min?: number;
    p25?: number;
    p90?: number;
    p95?: number;
    p99?: number;
    'p99.9'?: number;
  };
};

export type ProcessRoleGrvProxyStatus = {
  role: 'grv_proxy';
  id?: string;
  grv_latency_statistics?: {
    batch?: {
      count?: number;
      max?: number;
      mean?: number;
      median?: number;
      min?: number;
      p25?: number;
      p90?: number;
      p95?: number;
      p99?: number;
      'p99.9'?: number;
    };
    default?: {
      count?: number;
      max?: number;
      mean?: number;
      median?: number;
      min?: number;
      p25?: number;
      p90?: number;
      p95?: number;
      p99?: number;
      'p99.9'?: number;
    };
  };
};

export type ProcessRoleConsistencyScanStatus = {
  role: 'consistency_scan';
  id?: string;
};

export type ProcessRoleCoordinatorStatus = {
  role: 'coordinator';
};

export type ProcessRoleClusterControllerStatus = {
  role: 'cluster_controller';
  id?: string;
};

export type ProcessRoleMasterStatus = {
  role: 'master';
  id?: string;
};

export type ProcessRoleLogStatus = {
  role: 'log';
  data_version?: number;
  durable_bytes?: {
    counter?: number;
    hz?: number;
    roughness?: number;
  };
  id?: string;
  input_bytes?: {
    counter?: number;
    hz?: number;
    roughness?: number;
  };
  kvstore_available_bytes?: number;
  kvstore_free_bytes?: number;
  kvstore_total_bytes?: number;
  kvstore_used_bytes?: number;
  queue_disk_available_bytes?: number;
  queue_disk_free_bytes?: number;
  queue_disk_total_bytes?: number;
  queue_disk_used_bytes?: number;
};

export type ProcessRoleDataDistributorStatus = {
  role: 'data_distributor';
  id?: string;
};

export type ProcessRoleRatekeeperStatus = {
  role: 'ratekeeper';
  id?: string;
};

export type ProcessRoleResolverStatus = {
  role: 'resolver';
  id?: string;
};

export type ProcessRoleStatus =
  | ProcessRoleStorageStatus
  | ProcessRoleProxyStatus
  | ProcessRoleCommitProxyStatus
  | ProcessRoleGrvProxyStatus
  | ProcessRoleConsistencyScanStatus
  | ProcessRoleCoordinatorStatus
  | ProcessRoleClusterControllerStatus
  | ProcessRoleMasterStatus
  | ProcessRoleLogStatus
  | ProcessRoleDataDistributorStatus
  | ProcessRoleRatekeeperStatus
  | ProcessRoleResolverStatus;

export type ProcessStatus = {
  address?: string;
  class_source?: string;
  class_type?: string;
  command_line?: string;
  cpu?: {
    usage_cores?: number;
  };
  degraded?: boolean;
  disk?: {
    busy?: number;
    free_bytes?: number;
    reads?: {
      counter?: number;
      hz?: number;
      sectors?: number;
    };
    total_bytes?: number;
    writes?: {
      counter?: number;
      hz?: number;
      sectors?: number;
    };
  };
  excluded?: boolean;
  fault_domain?: string;
  locality?: {
    instance_id?: string;
    machineid?: string;
    processid?: string;
    zoneid?: string;
  };
  machine_id?: string;
  memory?: {
    available_bytes?: number;
    limit_bytes?: number;
    rss_bytes?: number;
    unused_allocated_memory?: number;
    used_bytes?: number;
  };
  messages?: unknown[];
  network?: {
    connection_errors?: {
      hz?: number;
    };
    connections_closed?: {
      hz?: number;
    };
    connections_established?: {
      hz?: number;
    };
    current_connections?: number;
    megabits_received?: {
      hz?: number;
    };
    megabits_sent?: {
      hz?: number;
    };
    tls_policy_failures?: {
      hz?: number;
    }
  };
  roles?: ProcessRoleStatus[];
  run_loop_busy?: number;
  uptime_seconds?: number;
  version?: string;
};

export type FDBStatus = {
  client?: {
    cluster_file?: {
      path?: string;
      up_to_date?: boolean;
    };
    coordinators?: {
      coordinators?: {
        address?: string;
        protocol?: string;
        reachable?: boolean;
      }[];
      quorum_reachable?: boolean;
    };
    database_status?: {
      available?: boolean;
      healthy?: boolean;
    };
    messages?: unknown[];
    timestamp?: number;
  };
  cluster?: {
    clients?: {
      count?: number;
      supported_versions?: {
        client_version?: string;
        connected_clients?: {
          address?: string;
          log_group?: string;
        }[];
        count?: number;
        max_protocol_clients?: {
          address?: string;
          log_group?: string;
        }[],
        max_protocol_count?: number;
        protocol_version?: string;
        source_version?: string;
      }[];
    };
    cluster_controller_timestamp?: number;
    configuration?: {
      backup_worker_enabled?: number;
      blob_granules_enabled?: number;
      commit_proxies?: number;
      coordinators_count?: number;
      encryption_at_rest_mode?: string;
      excluded_servers?: unknown[];
      grv_proxies?: number;
      log_engine?: string;
      log_routers?: number;
      log_spill?: number;
      logs?: number;
      perpetual_storage_wiggle?: number;
      perpetual_storage_wiggle_engine?: string;
      perpetual_storage_wiggle_locality?: string;
      proxies?: number;
      redundancy_mode?: string;
      remote_logs?: number;
      resolvers?: number;
      storage_engine?: string;
      storage_migration_type?: string;
      tenant_mode?: string;
      usable_regions?: number;
    };
    configuration_database?: {
      commits?: unknown[];
      last_compacted_version?: number;
      most_recent_version?: number;
      mutations?: unknown[];
      snapshot?: {};
    };
    connection_string?: string;
    data?: {
      average_partition_size_bytes?: number;
      least_operating_space_bytes_log_server?: number;
      least_operating_space_bytes_storage_server?: number;
      moving_data?: {
        highest_priority?: number;
        in_flight_bytes?: number;
        in_queue_bytes?: number;
        total_written_bytes?: number;
      };
      partitions_count?: number;
      state?: {
        healthy?: boolean;
        min_replicas_remaining?: number;
        name?: string;
      };
      system_kv_size_bytes?: number;
      team_trackers?: {
        in_flight_bytes?: number;
        primary?: boolean;
        state?: {
          healthy?: boolean;
          min_replicas_remaining?: number;
          name?: string;
        };
        unhealthy_servers?: number;
      }[];
      total_disk_used_bytes?: number;
      total_kv_size_bytes?: number;
    };
    database_available?: boolean;
    database_lock_state?: {
      locked?: boolean;
    };
    datacenter_lag?: {
      seconds?: number;
      versions?: number;
    };
    degraded_processes?: number;
    fault_tolerance?: {
      max_zone_failures_without_losing_availability?: number;
      max_zone_failures_without_losing_data?: number;
    };
    full_replication?: boolean;
    generation?: number;
    idempotency_ids?: {
      size_bytes?: number;
    };
    incompatible_connections?: unknown[];
    latency_probe?: {
      batch_priority_transaction_start_seconds?: number;
      commit_seconds?: number;
      immediate_priority_transaction_start_seconds?: number;
      read_seconds?: number;
      transaction_start_seconds?: number;
    };
    layers?: {
      _valid?: boolean;
      _error?: string;
      backup?: {
        blob_recent_io?: {
          bytes_per_second?: number;
          bytes_sent?: number;
          requests_failed?: number;
          requests_successful?: number;
        };
        instances?: {
          [key: string]: InstanceStatus;
        };
        instances_running?: number;
        last_updated?: number;
        paused?: boolean;
        tags?: {};
        total_workers?: number;
      };
    };
    logs?: {
      begin_version?: number;
      current?: boolean;
      epoch?: number;
      log_fault_tolerance?: number;
      log_interfaces?: {
        address?: string;
        healthy?: boolean;
        id?: string;
      }[];
      log_replication_factor?: number;
      log_write_anti_quorum?: number;
      possibly_losing_data?: boolean;
    }[];
    lowest_compatible_protocol_version?: string;
    machines?: {
      [key: string]: MachineStatus;
    };
    messages?: unknown[];
    metacluster?: {
      cluster_type?: string;
    };
    newest_protocol_version?: string;
    page_cache?: {
      log_hit_rate?: number;
      storage_hit_rate?: number;
    };
    processes?: {
      [key: string]: ProcessStatus;
    };
    protocol_version?: string;
    qos?: {
      batch_performance_limited_by?: {
        description?: string;
        name?: string;
        reason_id?: number;
      };
      batch_released_transactions_per_second?: number;
      batch_transactions_per_second_limit?: number;
      limiting_data_lag_storage_server?: {
        seconds?: number;
        versions?: number;
      };
      limiting_durability_lag_storage_server?: {
        seconds?: number;
        versions?: number;
      };
      limiting_queue_bytes_storage_server?: number;
      limiting_version_lag_storage_server?: number;
      performance_limited_by?: {
        description?: string;
        name?: string;
        reason_id?: number;
      };
      released_transactions_per_second?: number;
      throttled_tags?: {
        auto?: {
          busy_read?: number;
          busy_write?: number;
          count?: number;
          recommended_only?: number;
        };
        manual?: {
          count?: number;
        };
      };
      transactions_per_second_limit?: number;
      worst_data_lag_storage_server?: {
        seconds?: number;
        versions?: number;
      };
      worst_durability_lag_storage_server?: {
        seconds?: number;
        versions?: number;
      };
      worst_queue_bytes_log_server?: number;
      worst_queue_bytes_storage_server?: number;
      worst_version_lag_storage_server?: number;
    };
    recovery_state?: {
      active_generations?: number;
      description?: string;
      name?: string;
      seconds_since_last_recovered?: number;
    };
    tenants?: {
      num_tenants?: number;
    };
    version_epoch?: {
      enabled?: boolean;
    };
    workload?: {
      bytes?: {
        read?: {
          counter?: number;
          hz?: number;
          roughness?: number;
        };
        written?: {
          counter?: number;
          hz?: number;
          roughness?: number;
        };
      };
      keys?: {
        read?: {
          counter?: number;
          hz?: number;
          roughness?: number;
        };
      };
      operations?: {
        location_requests?: {
          counter?: number;
          hz?: number;
          roughness?: number;
        };
        low_priority_reads?: {
          counter?: number;
          hz?: number;
          roughness?: number;
        };
        memory_errors?: {
          counter?: number;
          hz?: number;
          roughness?: number;
        };
        read_requests?: {
          counter?: number;
          hz?: number;
          roughness?: number;
        };
        reads?: {
          counter?: number;
          hz?: number;
          roughness?: number;
        };
        writes?: {
          counter?: number;
          hz?: number;
          roughness?: number;
        };
      };
      transactions?: {
        committed?: {
          counter?: number;
          hz?: number;
          roughness?: number;
        };
        conflicted?: {
          counter?: number;
          hz?: number;
          roughness?: number;
        };
        rejected_for_queued_too_long?: {
          counter?: number;
          hz?: number;
          roughness?: number;
        };
        started?: {
          counter?: number;
          hz?: number;
          roughness?: number;
        };
        started_batch_priority?: {
          counter?: number;
          hz?: number;
          roughness?: number;
        };
        started_default_priority?: {
          counter?: number;
          hz?: number;
          roughness?: number;
        };
        started_immediate_priority?: {
          counter?: number;
          hz?: number;
          roughness?: number;
        };
      };
    };
  };
};
