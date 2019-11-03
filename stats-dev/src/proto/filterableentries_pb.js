/* eslint-disable */
// source: proto/filterableentries.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.mdining.FilterableEntries', null, global);
goog.exportSymbol('proto.mdining.FilterableEntry', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mdining.FilterableEntries = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.mdining.FilterableEntries.repeatedFields_, null);
};
goog.inherits(proto.mdining.FilterableEntries, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mdining.FilterableEntries.displayName = 'proto.mdining.FilterableEntries';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mdining.FilterableEntry = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.mdining.FilterableEntry.repeatedFields_, null);
};
goog.inherits(proto.mdining.FilterableEntry, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mdining.FilterableEntry.displayName = 'proto.mdining.FilterableEntry';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.mdining.FilterableEntries.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mdining.FilterableEntries.prototype.toObject = function(opt_includeInstance) {
  return proto.mdining.FilterableEntries.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mdining.FilterableEntries} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mdining.FilterableEntries.toObject = function(includeInstance, msg) {
  var f, obj = {
    filterableentriesList: jspb.Message.toObjectList(msg.getFilterableentriesList(),
    proto.mdining.FilterableEntry.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mdining.FilterableEntries}
 */
proto.mdining.FilterableEntries.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mdining.FilterableEntries;
  return proto.mdining.FilterableEntries.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mdining.FilterableEntries} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mdining.FilterableEntries}
 */
proto.mdining.FilterableEntries.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.mdining.FilterableEntry;
      reader.readMessage(value,proto.mdining.FilterableEntry.deserializeBinaryFromReader);
      msg.addFilterableentries(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mdining.FilterableEntries.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mdining.FilterableEntries.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mdining.FilterableEntries} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mdining.FilterableEntries.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFilterableentriesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.mdining.FilterableEntry.serializeBinaryToWriter
    );
  }
};


/**
 * repeated FilterableEntry filterableEntries = 1;
 * @return {!Array<!proto.mdining.FilterableEntry>}
 */
proto.mdining.FilterableEntries.prototype.getFilterableentriesList = function() {
  return /** @type{!Array<!proto.mdining.FilterableEntry>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.mdining.FilterableEntry, 1));
};


/**
 * @param {!Array<!proto.mdining.FilterableEntry>} value
 * @return {!proto.mdining.FilterableEntries} returns this
*/
proto.mdining.FilterableEntries.prototype.setFilterableentriesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.mdining.FilterableEntry=} opt_value
 * @param {number=} opt_index
 * @return {!proto.mdining.FilterableEntry}
 */
proto.mdining.FilterableEntries.prototype.addFilterableentries = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.mdining.FilterableEntry, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.mdining.FilterableEntries} returns this
 */
proto.mdining.FilterableEntries.prototype.clearFilterableentriesList = function() {
  return this.setFilterableentriesList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.mdining.FilterableEntry.repeatedFields_ = [1,5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mdining.FilterableEntry.prototype.toObject = function(opt_includeInstance) {
  return proto.mdining.FilterableEntry.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mdining.FilterableEntry} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mdining.FilterableEntry.toObject = function(includeInstance, msg) {
  var f, obj = {
    attributesList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    date: jspb.Message.getFieldWithDefault(msg, 2, ""),
    dininghallname: jspb.Message.getFieldWithDefault(msg, 3, ""),
    itemname: jspb.Message.getFieldWithDefault(msg, 4, ""),
    mealnamesList: (f = jspb.Message.getRepeatedField(msg, 5)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mdining.FilterableEntry}
 */
proto.mdining.FilterableEntry.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mdining.FilterableEntry;
  return proto.mdining.FilterableEntry.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mdining.FilterableEntry} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mdining.FilterableEntry}
 */
proto.mdining.FilterableEntry.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.addAttributes(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setDate(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setDininghallname(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setItemname(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.addMealnames(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mdining.FilterableEntry.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mdining.FilterableEntry.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mdining.FilterableEntry} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mdining.FilterableEntry.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAttributesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      1,
      f
    );
  }
  f = message.getDate();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDininghallname();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getItemname();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getMealnamesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      5,
      f
    );
  }
};


/**
 * repeated string attributes = 1;
 * @return {!Array<string>}
 */
proto.mdining.FilterableEntry.prototype.getAttributesList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.mdining.FilterableEntry} returns this
 */
proto.mdining.FilterableEntry.prototype.setAttributesList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.mdining.FilterableEntry} returns this
 */
proto.mdining.FilterableEntry.prototype.addAttributes = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.mdining.FilterableEntry} returns this
 */
proto.mdining.FilterableEntry.prototype.clearAttributesList = function() {
  return this.setAttributesList([]);
};


/**
 * optional string date = 2;
 * @return {string}
 */
proto.mdining.FilterableEntry.prototype.getDate = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.mdining.FilterableEntry} returns this
 */
proto.mdining.FilterableEntry.prototype.setDate = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string diningHallName = 3;
 * @return {string}
 */
proto.mdining.FilterableEntry.prototype.getDininghallname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.mdining.FilterableEntry} returns this
 */
proto.mdining.FilterableEntry.prototype.setDininghallname = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string itemName = 4;
 * @return {string}
 */
proto.mdining.FilterableEntry.prototype.getItemname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.mdining.FilterableEntry} returns this
 */
proto.mdining.FilterableEntry.prototype.setItemname = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * repeated string mealNames = 5;
 * @return {!Array<string>}
 */
proto.mdining.FilterableEntry.prototype.getMealnamesList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 5));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.mdining.FilterableEntry} returns this
 */
proto.mdining.FilterableEntry.prototype.setMealnamesList = function(value) {
  return jspb.Message.setField(this, 5, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.mdining.FilterableEntry} returns this
 */
proto.mdining.FilterableEntry.prototype.addMealnames = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 5, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.mdining.FilterableEntry} returns this
 */
proto.mdining.FilterableEntry.prototype.clearMealnamesList = function() {
  return this.setMealnamesList([]);
};


goog.object.extend(exports, proto.mdining);