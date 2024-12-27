FROM foundationdb/foundationdb:7.3.56

COPY run-and-configure.sh scripts/
RUN chmod a+x scripts/run-and-configure.sh

VOLUME /var/initial-run

ENTRYPOINT ["/usr/bin/tini", "-g", "--", "scripts/run-and-configure.sh"]