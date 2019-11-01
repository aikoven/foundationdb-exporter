FROM foundationdb/foundationdb:6.2.7

COPY run-and-configure.sh scripts/
RUN chmod a+x scripts/run-and-configure.sh

VOLUME /var/initial-run

CMD ["scripts/run-and-configure.sh"]
