# start docker 
docker run --rm -p1113:1113 -p2113:2113 --name eventstore eventstore/eventstore --enable-atom-pub-over-http --insecure --run-projections=all