#!/bin/env bash

OUT_DIR="${PWD}/src"

cd ../third_party/mdining-proto || exit

bazel build //proto:mdining_proto || exit
bazel build //proto:mdiningapi_proto || exit

BAZEL_GEN_FILES_DIR="$(bazel info bazel-genfiles 2> /dev/null)"
# Use find to get all proto descriptor files (.proto.bin) and then replace newlines with :
PROTO_DESCRIPTOR_FILES=$(find "${BAZEL_GEN_FILES_DIR}" -name "*.proto.bin"|tr '\n' ':')

# Make the out directory if it doesn't exist
mkdir -p ${OUT_DIR} || exit

# Compile each proto file
for PROTO_FILE in proto/*.proto google/api/annotations.proto google/api/http.proto
do
    protoc "${PROTO_FILE}" \
        -I/usr/local/include \
        --descriptor_set_in="${PROTO_DESCRIPTOR_FILES}" \
        --js_out=import_style=commonjs:"${OUT_DIR}" \
        --grpc-web_out=import_style=commonjs,mode=grpcweb:"${OUT_DIR}" \
        || exit
    echo "Compiled ${PROTO_FILE}"
done

# Modify each generated js file to disable eslint
find "${OUT_DIR}" -name "*_pb.js" | while read -r GEN_FILE;
do
    echo "${GEN_FILE}"
    # Insert an eslint-disable comment at the top of each file otherwise eslint will complain
    printf "/* eslint-disable */\n" | cat - "${GEN_FILE}" > "${GEN_FILE}.tmp" && mv "${GEN_FILE}.tmp" "${GEN_FILE}"
done
