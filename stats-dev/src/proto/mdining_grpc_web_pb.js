/* eslint-disable */
/**
 * @fileoverview gRPC-Web generated client stub for mdining
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var google_api_annotations_pb = require('../google/api/annotations_pb.js')

var proto_dininghalls_pb = require('../proto/dininghalls_pb.js')

var proto_items_pb = require('../proto/items_pb.js')

var proto_filterableentries_pb = require('../proto/filterableentries_pb.js')

var proto_menu_pb = require('../proto/menu_pb.js')

var proto_food_pb = require('../proto/food_pb.js')

var proto_foodstat_pb = require('../proto/foodstat_pb.js')
const proto = {};
proto.mdining = require('./mdining_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.mdining.MDiningClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.mdining.MDiningPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.mdining.DiningHallsRequest,
 *   !proto.mdining.DiningHallsReply>}
 */
const methodDescriptor_MDining_GetDiningHalls = new grpc.web.MethodDescriptor(
  '/mdining.MDining/GetDiningHalls',
  grpc.web.MethodType.UNARY,
  proto.mdining.DiningHallsRequest,
  proto.mdining.DiningHallsReply,
  /** @param {!proto.mdining.DiningHallsRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.mdining.DiningHallsReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.mdining.DiningHallsRequest,
 *   !proto.mdining.DiningHallsReply>}
 */
const methodInfo_MDining_GetDiningHalls = new grpc.web.AbstractClientBase.MethodInfo(
  proto.mdining.DiningHallsReply,
  /** @param {!proto.mdining.DiningHallsRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.mdining.DiningHallsReply.deserializeBinary
);


/**
 * @param {!proto.mdining.DiningHallsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.mdining.DiningHallsReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.mdining.DiningHallsReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.mdining.MDiningClient.prototype.getDiningHalls =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/mdining.MDining/GetDiningHalls',
      request,
      metadata || {},
      methodDescriptor_MDining_GetDiningHalls,
      callback);
};


/**
 * @param {!proto.mdining.DiningHallsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.mdining.DiningHallsReply>}
 *     A native promise that resolves to the response
 */
proto.mdining.MDiningPromiseClient.prototype.getDiningHalls =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/mdining.MDining/GetDiningHalls',
      request,
      metadata || {},
      methodDescriptor_MDining_GetDiningHalls);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.mdining.ItemsRequest,
 *   !proto.mdining.ItemsReply>}
 */
const methodDescriptor_MDining_GetItems = new grpc.web.MethodDescriptor(
  '/mdining.MDining/GetItems',
  grpc.web.MethodType.UNARY,
  proto.mdining.ItemsRequest,
  proto.mdining.ItemsReply,
  /** @param {!proto.mdining.ItemsRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.mdining.ItemsReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.mdining.ItemsRequest,
 *   !proto.mdining.ItemsReply>}
 */
const methodInfo_MDining_GetItems = new grpc.web.AbstractClientBase.MethodInfo(
  proto.mdining.ItemsReply,
  /** @param {!proto.mdining.ItemsRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.mdining.ItemsReply.deserializeBinary
);


/**
 * @param {!proto.mdining.ItemsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.mdining.ItemsReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.mdining.ItemsReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.mdining.MDiningClient.prototype.getItems =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/mdining.MDining/GetItems',
      request,
      metadata || {},
      methodDescriptor_MDining_GetItems,
      callback);
};


/**
 * @param {!proto.mdining.ItemsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.mdining.ItemsReply>}
 *     A native promise that resolves to the response
 */
proto.mdining.MDiningPromiseClient.prototype.getItems =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/mdining.MDining/GetItems',
      request,
      metadata || {},
      methodDescriptor_MDining_GetItems);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.mdining.FilterableEntriesRequest,
 *   !proto.mdining.FilterableEntriesReply>}
 */
const methodDescriptor_MDining_GetFilterableEntries = new grpc.web.MethodDescriptor(
  '/mdining.MDining/GetFilterableEntries',
  grpc.web.MethodType.UNARY,
  proto.mdining.FilterableEntriesRequest,
  proto.mdining.FilterableEntriesReply,
  /** @param {!proto.mdining.FilterableEntriesRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.mdining.FilterableEntriesReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.mdining.FilterableEntriesRequest,
 *   !proto.mdining.FilterableEntriesReply>}
 */
const methodInfo_MDining_GetFilterableEntries = new grpc.web.AbstractClientBase.MethodInfo(
  proto.mdining.FilterableEntriesReply,
  /** @param {!proto.mdining.FilterableEntriesRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.mdining.FilterableEntriesReply.deserializeBinary
);


/**
 * @param {!proto.mdining.FilterableEntriesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.mdining.FilterableEntriesReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.mdining.FilterableEntriesReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.mdining.MDiningClient.prototype.getFilterableEntries =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/mdining.MDining/GetFilterableEntries',
      request,
      metadata || {},
      methodDescriptor_MDining_GetFilterableEntries,
      callback);
};


/**
 * @param {!proto.mdining.FilterableEntriesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.mdining.FilterableEntriesReply>}
 *     A native promise that resolves to the response
 */
proto.mdining.MDiningPromiseClient.prototype.getFilterableEntries =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/mdining.MDining/GetFilterableEntries',
      request,
      metadata || {},
      methodDescriptor_MDining_GetFilterableEntries);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.mdining.AllRequest,
 *   !proto.mdining.AllReply>}
 */
const methodDescriptor_MDining_GetAll = new grpc.web.MethodDescriptor(
  '/mdining.MDining/GetAll',
  grpc.web.MethodType.UNARY,
  proto.mdining.AllRequest,
  proto.mdining.AllReply,
  /** @param {!proto.mdining.AllRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.mdining.AllReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.mdining.AllRequest,
 *   !proto.mdining.AllReply>}
 */
const methodInfo_MDining_GetAll = new grpc.web.AbstractClientBase.MethodInfo(
  proto.mdining.AllReply,
  /** @param {!proto.mdining.AllRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.mdining.AllReply.deserializeBinary
);


/**
 * @param {!proto.mdining.AllRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.mdining.AllReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.mdining.AllReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.mdining.MDiningClient.prototype.getAll =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/mdining.MDining/GetAll',
      request,
      metadata || {},
      methodDescriptor_MDining_GetAll,
      callback);
};


/**
 * @param {!proto.mdining.AllRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.mdining.AllReply>}
 *     A native promise that resolves to the response
 */
proto.mdining.MDiningPromiseClient.prototype.getAll =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/mdining.MDining/GetAll',
      request,
      metadata || {},
      methodDescriptor_MDining_GetAll);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.mdining.MenuRequest,
 *   !proto.mdining.MenuReply>}
 */
const methodDescriptor_MDining_GetMenu = new grpc.web.MethodDescriptor(
  '/mdining.MDining/GetMenu',
  grpc.web.MethodType.UNARY,
  proto.mdining.MenuRequest,
  proto.mdining.MenuReply,
  /** @param {!proto.mdining.MenuRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.mdining.MenuReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.mdining.MenuRequest,
 *   !proto.mdining.MenuReply>}
 */
const methodInfo_MDining_GetMenu = new grpc.web.AbstractClientBase.MethodInfo(
  proto.mdining.MenuReply,
  /** @param {!proto.mdining.MenuRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.mdining.MenuReply.deserializeBinary
);


/**
 * @param {!proto.mdining.MenuRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.mdining.MenuReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.mdining.MenuReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.mdining.MDiningClient.prototype.getMenu =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/mdining.MDining/GetMenu',
      request,
      metadata || {},
      methodDescriptor_MDining_GetMenu,
      callback);
};


/**
 * @param {!proto.mdining.MenuRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.mdining.MenuReply>}
 *     A native promise that resolves to the response
 */
proto.mdining.MDiningPromiseClient.prototype.getMenu =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/mdining.MDining/GetMenu',
      request,
      metadata || {},
      methodDescriptor_MDining_GetMenu);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.mdining.FoodRequest,
 *   !proto.mdining.FoodReply>}
 */
const methodDescriptor_MDining_GetFood = new grpc.web.MethodDescriptor(
  '/mdining.MDining/GetFood',
  grpc.web.MethodType.UNARY,
  proto.mdining.FoodRequest,
  proto.mdining.FoodReply,
  /** @param {!proto.mdining.FoodRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.mdining.FoodReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.mdining.FoodRequest,
 *   !proto.mdining.FoodReply>}
 */
const methodInfo_MDining_GetFood = new grpc.web.AbstractClientBase.MethodInfo(
  proto.mdining.FoodReply,
  /** @param {!proto.mdining.FoodRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.mdining.FoodReply.deserializeBinary
);


/**
 * @param {!proto.mdining.FoodRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.mdining.FoodReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.mdining.FoodReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.mdining.MDiningClient.prototype.getFood =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/mdining.MDining/GetFood',
      request,
      metadata || {},
      methodDescriptor_MDining_GetFood,
      callback);
};


/**
 * @param {!proto.mdining.FoodRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.mdining.FoodReply>}
 *     A native promise that resolves to the response
 */
proto.mdining.MDiningPromiseClient.prototype.getFood =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/mdining.MDining/GetFood',
      request,
      metadata || {},
      methodDescriptor_MDining_GetFood);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.mdining.FoodStatsRequest,
 *   !proto.mdining.FoodStatsReply>}
 */
const methodDescriptor_MDining_GetFoodStats = new grpc.web.MethodDescriptor(
  '/mdining.MDining/GetFoodStats',
  grpc.web.MethodType.UNARY,
  proto.mdining.FoodStatsRequest,
  proto.mdining.FoodStatsReply,
  /** @param {!proto.mdining.FoodStatsRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.mdining.FoodStatsReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.mdining.FoodStatsRequest,
 *   !proto.mdining.FoodStatsReply>}
 */
const methodInfo_MDining_GetFoodStats = new grpc.web.AbstractClientBase.MethodInfo(
  proto.mdining.FoodStatsReply,
  /** @param {!proto.mdining.FoodStatsRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.mdining.FoodStatsReply.deserializeBinary
);


/**
 * @param {!proto.mdining.FoodStatsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.mdining.FoodStatsReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.mdining.FoodStatsReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.mdining.MDiningClient.prototype.getFoodStats =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/mdining.MDining/GetFoodStats',
      request,
      metadata || {},
      methodDescriptor_MDining_GetFoodStats,
      callback);
};


/**
 * @param {!proto.mdining.FoodStatsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.mdining.FoodStatsReply>}
 *     A native promise that resolves to the response
 */
proto.mdining.MDiningPromiseClient.prototype.getFoodStats =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/mdining.MDining/GetFoodStats',
      request,
      metadata || {},
      methodDescriptor_MDining_GetFoodStats);
};


module.exports = proto.mdining;

