#!/bin/bash

set -e

trap 'kill -TERM $childPid' TERM

# fork fdb process
/var/fdb/scripts/fdb.bash "$@" &

childPid=$!

if [ ! -f /var/initial-run/configured ]; then
  # configure database
  sleep 1

  attempts=5
  while true; do
    if fdbcli --exec 'configure new single ssd; status'; then
      touch /var/initial-run/configured
      break
    fi
    (( attempts-- ))
    if [ "$attempts" -le 0 ]; then
      echo >&2
      echo >&2 "Failed to configure database"
      echo >&2
      exit 1
    fi
    sleep 1
  done
else
  fdbcli --exec 'status'
fi

# join forked job
wait $childPid
