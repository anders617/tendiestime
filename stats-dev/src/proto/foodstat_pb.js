/* eslint-disable */
// source: proto/foodstat.proto
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

goog.exportSymbol('proto.mdining.FoodStat', null, global);
goog.exportSymbol('proto.mdining.StringToInt', null, global);
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
proto.mdining.FoodStat = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mdining.FoodStat, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mdining.FoodStat.displayName = 'proto.mdining.FoodStat';
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
proto.mdining.StringToInt = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mdining.StringToInt, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mdining.StringToInt.displayName = 'proto.mdining.StringToInt';
}



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
proto.mdining.FoodStat.prototype.toObject = function(opt_includeInstance) {
  return proto.mdining.FoodStat.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mdining.FoodStat} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mdining.FoodStat.toObject = function(includeInstance, msg) {
  var f, obj = {
    date: jspb.Message.getFieldWithDefault(msg, 1, ""),
    timesservedMap: (f = msg.getTimesservedMap()) ? f.toObject(includeInstance, undefined) : [],
    fooddininghallcountsMap: (f = msg.getFooddininghallcountsMap()) ? f.toObject(includeInstance, proto.mdining.StringToInt.toObject) : [],
    dininghallfoodcountsMap: (f = msg.getDininghallfoodcountsMap()) ? f.toObject(includeInstance, proto.mdining.StringToInt.toObject) : [],
    categorycountsMap: (f = msg.getCategorycountsMap()) ? f.toObject(includeInstance, undefined) : [],
    allergencountsMap: (f = msg.getAllergencountsMap()) ? f.toObject(includeInstance, undefined) : [],
    attributecountsMap: (f = msg.getAttributecountsMap()) ? f.toObject(includeInstance, undefined) : [],
    weekdayfoodcountsMap: (f = msg.getWeekdayfoodcountsMap()) ? f.toObject(includeInstance, proto.mdining.StringToInt.toObject) : [],
    foodweekdaycountsMap: (f = msg.getFoodweekdaycountsMap()) ? f.toObject(includeInstance, proto.mdining.StringToInt.toObject) : [],
    numuniquefoods: jspb.Message.getFieldWithDefault(msg, 10, 0),
    totalfoodmealsserved: jspb.Message.getFieldWithDefault(msg, 11, 0),
    dininghallmealsservedMap: (f = msg.getDininghallmealsservedMap()) ? f.toObject(includeInstance, undefined) : []
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
 * @return {!proto.mdining.FoodStat}
 */
proto.mdining.FoodStat.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mdining.FoodStat;
  return proto.mdining.FoodStat.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mdining.FoodStat} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mdining.FoodStat}
 */
proto.mdining.FoodStat.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setDate(value);
      break;
    case 2:
      var value = msg.getTimesservedMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readInt64, null, "", 0);
         });
      break;
    case 3:
      var value = msg.getFooddininghallcountsMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.mdining.StringToInt.deserializeBinaryFromReader, "", new proto.mdining.StringToInt());
         });
      break;
    case 4:
      var value = msg.getDininghallfoodcountsMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.mdining.StringToInt.deserializeBinaryFromReader, "", new proto.mdining.StringToInt());
         });
      break;
    case 5:
      var value = msg.getCategorycountsMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readInt64, null, "", 0);
         });
      break;
    case 6:
      var value = msg.getAllergencountsMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readInt64, null, "", 0);
         });
      break;
    case 7:
      var value = msg.getAttributecountsMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readInt64, null, "", 0);
         });
      break;
    case 8:
      var value = msg.getWeekdayfoodcountsMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.mdining.StringToInt.deserializeBinaryFromReader, "", new proto.mdining.StringToInt());
         });
      break;
    case 9:
      var value = msg.getFoodweekdaycountsMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.mdining.StringToInt.deserializeBinaryFromReader, "", new proto.mdining.StringToInt());
         });
      break;
    case 10:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setNumuniquefoods(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTotalfoodmealsserved(value);
      break;
    case 12:
      var value = msg.getDininghallmealsservedMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readInt64, null, "", 0);
         });
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
proto.mdining.FoodStat.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mdining.FoodStat.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mdining.FoodStat} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mdining.FoodStat.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDate();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTimesservedMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(2, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeInt64);
  }
  f = message.getFooddininghallcountsMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(3, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.mdining.StringToInt.serializeBinaryToWriter);
  }
  f = message.getDininghallfoodcountsMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(4, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.mdining.StringToInt.serializeBinaryToWriter);
  }
  f = message.getCategorycountsMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(5, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeInt64);
  }
  f = message.getAllergencountsMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(6, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeInt64);
  }
  f = message.getAttributecountsMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(7, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeInt64);
  }
  f = message.getWeekdayfoodcountsMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(8, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.mdining.StringToInt.serializeBinaryToWriter);
  }
  f = message.getFoodweekdaycountsMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(9, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.mdining.StringToInt.serializeBinaryToWriter);
  }
  f = message.getNumuniquefoods();
  if (f !== 0) {
    writer.writeInt64(
      10,
      f
    );
  }
  f = message.getTotalfoodmealsserved();
  if (f !== 0) {
    writer.writeInt64(
      11,
      f
    );
  }
  f = message.getDininghallmealsservedMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(12, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeInt64);
  }
};


/**
 * optional string date = 1;
 * @return {string}
 */
proto.mdining.FoodStat.prototype.getDate = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.mdining.FoodStat} returns this
 */
proto.mdining.FoodStat.prototype.setDate = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * map<string, int64> timesServed = 2;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,number>}
 */
proto.mdining.FoodStat.prototype.getTimesservedMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,number>} */ (
      jspb.Message.getMapField(this, 2, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.mdining.FoodStat} returns this
 */
proto.mdining.FoodStat.prototype.clearTimesservedMap = function() {
  this.getTimesservedMap().clear();
  return this;};


/**
 * map<string, StringToInt> foodDiningHallCounts = 3;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.mdining.StringToInt>}
 */
proto.mdining.FoodStat.prototype.getFooddininghallcountsMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.mdining.StringToInt>} */ (
      jspb.Message.getMapField(this, 3, opt_noLazyCreate,
      proto.mdining.StringToInt));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.mdining.FoodStat} returns this
 */
proto.mdining.FoodStat.prototype.clearFooddininghallcountsMap = function() {
  this.getFooddininghallcountsMap().clear();
  return this;};


/**
 * map<string, StringToInt> diningHallFoodCounts = 4;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.mdining.StringToInt>}
 */
proto.mdining.FoodStat.prototype.getDininghallfoodcountsMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.mdining.StringToInt>} */ (
      jspb.Message.getMapField(this, 4, opt_noLazyCreate,
      proto.mdining.StringToInt));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.mdining.FoodStat} returns this
 */
proto.mdining.FoodStat.prototype.clearDininghallfoodcountsMap = function() {
  this.getDininghallfoodcountsMap().clear();
  return this;};


/**
 * map<string, int64> categoryCounts = 5;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,number>}
 */
proto.mdining.FoodStat.prototype.getCategorycountsMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,number>} */ (
      jspb.Message.getMapField(this, 5, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.mdining.FoodStat} returns this
 */
proto.mdining.FoodStat.prototype.clearCategorycountsMap = function() {
  this.getCategorycountsMap().clear();
  return this;};


/**
 * map<string, int64> allergenCounts = 6;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,number>}
 */
proto.mdining.FoodStat.prototype.getAllergencountsMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,number>} */ (
      jspb.Message.getMapField(this, 6, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.mdining.FoodStat} returns this
 */
proto.mdining.FoodStat.prototype.clearAllergencountsMap = function() {
  this.getAllergencountsMap().clear();
  return this;};


/**
 * map<string, int64> attributeCounts = 7;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,number>}
 */
proto.mdining.FoodStat.prototype.getAttributecountsMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,number>} */ (
      jspb.Message.getMapField(this, 7, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.mdining.FoodStat} returns this
 */
proto.mdining.FoodStat.prototype.clearAttributecountsMap = function() {
  this.getAttributecountsMap().clear();
  return this;};


/**
 * map<string, StringToInt> weekdayFoodCounts = 8;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.mdining.StringToInt>}
 */
proto.mdining.FoodStat.prototype.getWeekdayfoodcountsMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.mdining.StringToInt>} */ (
      jspb.Message.getMapField(this, 8, opt_noLazyCreate,
      proto.mdining.StringToInt));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.mdining.FoodStat} returns this
 */
proto.mdining.FoodStat.prototype.clearWeekdayfoodcountsMap = function() {
  this.getWeekdayfoodcountsMap().clear();
  return this;};


/**
 * map<string, StringToInt> foodWeekdayCounts = 9;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.mdining.StringToInt>}
 */
proto.mdining.FoodStat.prototype.getFoodweekdaycountsMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.mdining.StringToInt>} */ (
      jspb.Message.getMapField(this, 9, opt_noLazyCreate,
      proto.mdining.StringToInt));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.mdining.FoodStat} returns this
 */
proto.mdining.FoodStat.prototype.clearFoodweekdaycountsMap = function() {
  this.getFoodweekdaycountsMap().clear();
  return this;};


/**
 * optional int64 numUniqueFoods = 10;
 * @return {number}
 */
proto.mdining.FoodStat.prototype.getNumuniquefoods = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.mdining.FoodStat} returns this
 */
proto.mdining.FoodStat.prototype.setNumuniquefoods = function(value) {
  return jspb.Message.setProto3IntField(this, 10, value);
};


/**
 * optional int64 totalFoodMealsServed = 11;
 * @return {number}
 */
proto.mdining.FoodStat.prototype.getTotalfoodmealsserved = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {number} value
 * @return {!proto.mdining.FoodStat} returns this
 */
proto.mdining.FoodStat.prototype.setTotalfoodmealsserved = function(value) {
  return jspb.Message.setProto3IntField(this, 11, value);
};


/**
 * map<string, int64> diningHallMealsServed = 12;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,number>}
 */
proto.mdining.FoodStat.prototype.getDininghallmealsservedMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,number>} */ (
      jspb.Message.getMapField(this, 12, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.mdining.FoodStat} returns this
 */
proto.mdining.FoodStat.prototype.clearDininghallmealsservedMap = function() {
  this.getDininghallmealsservedMap().clear();
  return this;};





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
proto.mdining.StringToInt.prototype.toObject = function(opt_includeInstance) {
  return proto.mdining.StringToInt.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mdining.StringToInt} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mdining.StringToInt.toObject = function(includeInstance, msg) {
  var f, obj = {
    dataMap: (f = msg.getDataMap()) ? f.toObject(includeInstance, undefined) : []
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
 * @return {!proto.mdining.StringToInt}
 */
proto.mdining.StringToInt.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mdining.StringToInt;
  return proto.mdining.StringToInt.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mdining.StringToInt} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mdining.StringToInt}
 */
proto.mdining.StringToInt.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = msg.getDataMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readInt64, null, "", 0);
         });
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
proto.mdining.StringToInt.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mdining.StringToInt.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mdining.StringToInt} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mdining.StringToInt.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDataMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(1, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeInt64);
  }
};


/**
 * map<string, int64> data = 1;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,number>}
 */
proto.mdining.StringToInt.prototype.getDataMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,number>} */ (
      jspb.Message.getMapField(this, 1, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.mdining.StringToInt} returns this
 */
proto.mdining.StringToInt.prototype.clearDataMap = function() {
  this.getDataMap().clear();
  return this;};


goog.object.extend(exports, proto.mdining);
