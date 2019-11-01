require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/config/index.js":
/*!*****************************!*\
  !*** ./src/config/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/* harmony default export */ __webpack_exports__["default"] = ({
  server: {
    port: 3030
  },
  static_dir: {
    root: './static'
  }
});

/***/ }),

/***/ "./src/config/rethinkdb.js":
/*!*********************************!*\
  !*** ./src/config/rethinkdb.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


const database = {
  host: 'localhost',
  port: 28015,
  dbname:  false ? undefined : 'mydb'
};
/* harmony default export */ __webpack_exports__["default"] = ({
  host: database.host,
  port: database.port,
  dbname: database.dbname
});

/***/ }),

/***/ "./src/core/database/rethinkdb/changefeeds.js":
/*!****************************************************!*\
  !*** ./src/core/database/rethinkdb/changefeeds.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb */ "rethinkdb");
/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_database_rethinkdb_connection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/database/rethinkdb/connection */ "./src/core/database/rethinkdb/connection.js");




/* harmony default export */ __webpack_exports__["default"] = (async io => {
  try {
    // Get the db connection.
    const connection = await Object(core_database_rethinkdb_connection__WEBPACK_IMPORTED_MODULE_1__["default"])(); // Subscribe to user table's changefeed.

    var cursor = await rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.table('users').changes().run(connection);
    cursor.each(function (err, row) {
      if (err) {
        throw err;
      }

      console.log(JSON.stringify(row, null, 2));
      io.emit('users.changefeeds', row);
    });
  } catch (err) {
    console.error(err);
  }
});

/***/ }),

/***/ "./src/core/database/rethinkdb/connection.js":
/*!***************************************************!*\
  !*** ./src/core/database/rethinkdb/connection.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var config_rethinkdb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! config/rethinkdb */ "./src/config/rethinkdb.js");
/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rethinkdb */ "rethinkdb");
/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rethinkdb__WEBPACK_IMPORTED_MODULE_1__);





const c = async () => {
  // https://rethinkdb.com/api/javascript/connect/
  const connection = await rethinkdb__WEBPACK_IMPORTED_MODULE_1___default.a.connect({
    host: config_rethinkdb__WEBPACK_IMPORTED_MODULE_0__["default"].host,
    port: config_rethinkdb__WEBPACK_IMPORTED_MODULE_0__["default"].port,
    db: config_rethinkdb__WEBPACK_IMPORTED_MODULE_0__["default"].dbname
  });
  return connection;
};

/* harmony default export */ __webpack_exports__["default"] = (c);

/***/ }),

/***/ "./src/core/model/Schema.js":
/*!**********************************!*\
  !*** ./src/core/model/Schema.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Schema; });
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @hapi/joi */ "@hapi/joi");
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hapi_joi__WEBPACK_IMPORTED_MODULE_0__);



class Schema {
  constructor(options) {
    return _hapi_joi__WEBPACK_IMPORTED_MODULE_0___default.a.object(options);
  }

}

/***/ }),

/***/ "./src/core/model/rethinkdb/index.js":
/*!*******************************************!*\
  !*** ./src/core/model/rethinkdb/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Model; });
/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb */ "rethinkdb");
/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb__WEBPACK_IMPORTED_MODULE_0__);



class Model {
  constructor(connection, options) {
    this.data = {};
    this.connection = connection;
  }

}

/***/ }),

/***/ "./src/core/model/utils.js":
/*!*********************************!*\
  !*** ./src/core/model/utils.js ***!
  \*********************************/
/*! exports provided: sanitise, objectifySchema */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sanitise", function() { return sanitise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "objectifySchema", function() { return objectifySchema; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);




function sanitise(options, schema) {
  let data = options || {};

  if (schema === undefined) {
    // ctx is not passed into this level so can't do:
    // ctx.throw(400, '_id is required.')
    // So use a native error and throw it.
    const err = new Error('Schema is required.');
    err.status = 400;
    err.expose = true;
    throw err;
  } // Get the keys from the object.
  // https://lodash.com/docs/4.17.4#keys


  let keys = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.keys(schema); // Source objects are applied from left to right. Once a property is set,
  // additional values of the same property are ignored.
  // https://lodash.com/docs/4.17.4#defaults

  let defaults = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.defaults(data, schema); // Creates an object composed of the picked object properties.
  // https://lodash.com/docs/4.17.4#pick
  // let picked = lodash.pick(data, keys)

  let picked = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.pick(defaults, keys);
  return picked;
}

function objectifySchema(Schema) {
  let object = {};
  let keys = Schema._ids._byKey; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach

  new Map(keys).forEach(function (value, key, map) {
    object[key] = null;
  });
  return object;
}

function arrayifySchema(Schema) {
  let array = [];
  let keys = Schema._ids._byKey; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach

  new Map(keys).forEach(function (value, key, map) {
    array.push(key);
  });
  let object = {};

  for (let i = 0; i < array.length; i++) {
    object[array[i]] = null;
  }

  return object;
}



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa */ "koa");
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! socket.io */ "socket.io");
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ "./src/config/index.js");
/* harmony import */ var _middlewares__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./middlewares */ "./src/middlewares.js");
/* harmony import */ var core_database_rethinkdb_changefeeds__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core/database/rethinkdb/changefeeds */ "./src/core/database/rethinkdb/changefeeds.js");








const app = new koa__WEBPACK_IMPORTED_MODULE_0___default.a();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || _config__WEBPACK_IMPORTED_MODULE_3__["default"].server.port; // Middlewares are imported here.

Object(_middlewares__WEBPACK_IMPORTED_MODULE_4__["default"])(app); // Hook socket.io up.

const server = http__WEBPACK_IMPORTED_MODULE_2___default.a.createServer(app.callback());
const io = socket_io__WEBPACK_IMPORTED_MODULE_1___default()(server);
io.sockets.on('connection', function (socket) {
  console.log('a user connected: ' + socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected: ' + socket.id);
  });
}); // Integrate socket and rethinkdb.
// It should be done only once globally.

Object(core_database_rethinkdb_changefeeds__WEBPACK_IMPORTED_MODULE_5__["default"])(io); // app.listen(port, host)

server.listen(port, host);

/***/ }),

/***/ "./src/middlewares.js":
/*!****************************!*\
  !*** ./src/middlewares.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-static */ "koa-static");
/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_static__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var koa_bodyparser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! koa-bodyparser */ "koa-bodyparser");
/* harmony import */ var koa_bodyparser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(koa_bodyparser__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ "./src/config/index.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes */ "./src/routes.js");
/* harmony import */ var _middlewares_sample__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./middlewares/sample */ "./src/middlewares/sample.js");
/* harmony import */ var _middlewares_errorHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./middlewares/errorHandler */ "./src/middlewares/errorHandler.js");
/* harmony import */ var _middlewares_notFound__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./middlewares/notFound */ "./src/middlewares/notFound.js");
/* harmony import */ var _middlewares_okOutput__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./middlewares/okOutput */ "./src/middlewares/okOutput.js");
/* harmony import */ var _middlewares_database_rdb_connection_open__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./middlewares/database/rdb/connection/open */ "./src/middlewares/database/rdb/connection/open.js");
/* harmony import */ var _middlewares_database_rdb_connection_close__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./middlewares/database/rdb/connection/close */ "./src/middlewares/database/rdb/connection/close.js");
 // Import node_modules middlewares.
// Check other Koa official middlewares: https://github.com/koajs


 // Import custom local middlewares.









/* harmony default export */ __webpack_exports__["default"] = (app => {
  // Catch and format the error in the upstream.
  // https://github.com/koajs/koa/wiki/Error-Handling
  app.use(_middlewares_errorHandler__WEBPACK_IMPORTED_MODULE_5__["default"]);
  app.use(_middlewares_notFound__WEBPACK_IMPORTED_MODULE_6__["default"]);
  app.use(_middlewares_okOutput__WEBPACK_IMPORTED_MODULE_7__["default"]); // Static files are files that clients download as they are from the server.
  // Create a new directory, public. Koa, by default doesn't allow you to
  // serve static files.
  // https://github.com/koajs/static
  // https://www.tutorialspoint.com/koajs/koajs_static_files.htm

  app.use(koa_static__WEBPACK_IMPORTED_MODULE_0___default()(_config__WEBPACK_IMPORTED_MODULE_2__["default"].static_dir.root)); // The parsed body will store in ctx.request.body
  // If nothing was parsed, body will be an empty object {}
  // https://github.com/koajs/bodyparser
  // https://github.com/koajs/koa/issues/719

  app.use(koa_bodyparser__WEBPACK_IMPORTED_MODULE_1___default()()); // A sample middleware in a separate file.

  app.use(_middlewares_sample__WEBPACK_IMPORTED_MODULE_4__["default"]); // Middleware that will create a connection to the database.

  app.use(_middlewares_database_rdb_connection_open__WEBPACK_IMPORTED_MODULE_8__["default"]); // Add routes.

  app.use(_routes__WEBPACK_IMPORTED_MODULE_3__["default"].routes(), _routes__WEBPACK_IMPORTED_MODULE_3__["default"].allowedMethods()); // Middleware to close a connection to the database.

  app.use(_middlewares_database_rdb_connection_close__WEBPACK_IMPORTED_MODULE_9__["default"]);
});

/***/ }),

/***/ "./src/middlewares/database/rdb/connection/close.js":
/*!**********************************************************!*\
  !*** ./src/middlewares/database/rdb/connection/close.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var config_rethinkdb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! config/rethinkdb */ "./src/config/rethinkdb.js");
/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rethinkdb */ "rethinkdb");
/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rethinkdb__WEBPACK_IMPORTED_MODULE_1__);




/**
 * Close the RethinkDB connection.
 * @param  {[type]}   ctx
 * @param  {Function} next
 */

/* harmony default export */ __webpack_exports__["default"] = (async (ctx, next) => {
  ctx._rdbConn.close();

  await next(); // console.log('last middleware')
});

/***/ }),

/***/ "./src/middlewares/database/rdb/connection/open.js":
/*!*********************************************************!*\
  !*** ./src/middlewares/database/rdb/connection/open.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var config_rethinkdb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! config/rethinkdb */ "./src/config/rethinkdb.js");
/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rethinkdb */ "rethinkdb");
/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rethinkdb__WEBPACK_IMPORTED_MODULE_1__);




/**
 * Create a RethinkDB connection, and save it in ctx._rdbConn
 * @param  {[type]}   ctx
 * @param  {Function} next
 */

/* harmony default export */ __webpack_exports__["default"] = (async (ctx, next) => {
  ctx._rdbConn = await rethinkdb__WEBPACK_IMPORTED_MODULE_1___default.a.connect({
    host: config_rethinkdb__WEBPACK_IMPORTED_MODULE_0__["default"].host,
    port: config_rethinkdb__WEBPACK_IMPORTED_MODULE_0__["default"].port,
    db: config_rethinkdb__WEBPACK_IMPORTED_MODULE_0__["default"].dbname
  });
  await next();
});

/***/ }),

/***/ "./src/middlewares/errorHandler.js":
/*!*****************************************!*\
  !*** ./src/middlewares/errorHandler.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
 // https://github.com/koajs/koa/wiki/Error-Handling

/* harmony default export */ __webpack_exports__["default"] = (async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500; // Decorate the error output.

    ctx.type = 'json';
    ctx.body = {
      status: ctx.status,
      message: err.message
    };
    ctx.app.emit('error', err, ctx);
  }
});

/***/ }),

/***/ "./src/middlewares/notFound.js":
/*!*************************************!*\
  !*** ./src/middlewares/notFound.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
 // https://github.com/koajs/koa/wiki/Error-Handling

/* harmony default export */ __webpack_exports__["default"] = (async (ctx, next) => {
  await next(); // Handle 404 - throw it as an error.

  if (ctx.status === 404) {
    ctx.throw(404, 'Page not found');
  }
});

/***/ }),

/***/ "./src/middlewares/okOutput.js":
/*!*************************************!*\
  !*** ./src/middlewares/okOutput.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
 // https://github.com/koajs/koa/wiki/Error-Handling

/* harmony default export */ __webpack_exports__["default"] = (async (ctx, next) => {
  await next(); // Use this when you want to format the 200 res further.
  // e.g. {"status":200,"data":{"message":"Hello home sample!"}}
  // else, you get, e.g. {"message":"Hello home sample!"}

  if (ctx.status === 200) {
    ctx.body = {
      status: 200,
      data: ctx.body
    };
  }
});

/***/ }),

/***/ "./src/middlewares/sample.js":
/*!***********************************!*\
  !*** ./src/middlewares/sample.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/* harmony default export */ __webpack_exports__["default"] = (async (ctx, next) => {
  console.log('sample middleware');
  await next();
});

/***/ }),

/***/ "./src/modules/home/index.js":
/*!***********************************!*\
  !*** ./src/modules/home/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes */ "./src/modules/home/routes/index.js");



 // Better with prefix
// https://www.npmjs.com/package/koa-router#router-prefixes

const router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a();
const routes = [_routes__WEBPACK_IMPORTED_MODULE_1__["default"]];

for (var route of routes) {
  router.use(route.routes(), route.allowedMethods());
}

/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/modules/home/routes/index.js":
/*!******************************************!*\
  !*** ./src/modules/home/routes/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);



const router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a();

const middleware3 = async (ctx, next) => {
  console.log('Time started at: ', Date.now());
  await next();
};

const middleware1 = async (ctx, next) => {
  console.log('I am the first. ');
  await next();
  console.log('I am the last. ');
};

const middleware2 = async (ctx, next) => {
  console.log('I am the second. ');
  await next();
  console.log('I am the third. ');
}; // Display hello world.


router.get('/', middleware1, middleware2, middleware3, async (ctx, next) => {
  ctx.type = 'json';
  ctx.body = {
    message: 'Hello World!'
  };
});
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/modules/user/controllers/create-user.js":
/*!*****************************************************!*\
  !*** ./src/modules/user/controllers/create-user.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_create_User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/create/User */ "./src/modules/user/models/create/User.js");



/* harmony default export */ __webpack_exports__["default"] = (async ctx => {
  // Get the parsed data.
  let body = ctx.request.body || {};

  if (body.name === undefined) {
    ctx.throw(400, 'name is undefined');
  }

  if (body.slug === undefined) {
    ctx.throw(400, 'slug is undefined');
  }

  if (body.name === '') {
    ctx.throw(400, 'name is required');
  }

  if (body.slug === '') {
    ctx.throw(400, 'slug is required');
  } // Create a user instance.


  let user = new _models_create_User__WEBPACK_IMPORTED_MODULE_0__["default"](ctx._rdbConn, {
    // example fields that won't be injected into the document:
    uuid: '1',
    name: 'dummy',
    password: '1234'
  }); // Throw the error if the table does not exist.

  let tableFound = await user.findTable('users');

  if (tableFound === false) {
    ctx.throw(500, 'users table does not exist');
  } // Check if the provided slug is taken.


  let slugFound = await user.getDocBySlug(body.slug);

  if (slugFound) {
    ctx.throw(404, 'slug has been taken');
  } // Insert a doc.
  // Current timestamp.


  let timestamp = Date.now();
  let options = {
    name: body.name,
    slug: body.slug,
    createdAt: timestamp // example fields that won't be injected into the document:
    // username: 'marymoe',
    // password: '123123'

  };
  let result = await user.insert(options);

  if (result.inserted !== 1) {
    ctx.throw(404, 'insert user failed');
  }

  return result;
});

/***/ }),

/***/ "./src/modules/user/controllers/delete-user.js":
/*!*****************************************************!*\
  !*** ./src/modules/user/controllers/delete-user.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_delete_User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/delete/User */ "./src/modules/user/models/delete/User.js");



/* harmony default export */ __webpack_exports__["default"] = (async ctx => {
  // Get the parsed data.
  let body = ctx.request.body || {};

  if (body.id === undefined) {
    ctx.throw(400, 'id is undefined');
  }

  if (body.id === '') {
    ctx.throw(400, 'id is required');
  }

  let objectId = body.id; // Create a user instance.

  let user = new _models_delete_User__WEBPACK_IMPORTED_MODULE_0__["default"](ctx._rdbConn); // Throw the error if the table does not exist.

  let tableFound = await user.findTable('users');

  if (tableFound === false) {
    ctx.throw(500, 'users table does not exist');
  } // Find one doc.


  const found = await user.getDocById(objectId);

  if (!found) {
    ctx.throw(404, 'user does not exist');
  }

  let result = await user.delete(objectId);

  if (result.deleted !== 1) {
    ctx.throw(404, 'delete user failed');
  }

  return result;
});

/***/ }),

/***/ "./src/modules/user/controllers/fetch-user.js":
/*!****************************************************!*\
  !*** ./src/modules/user/controllers/fetch-user.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_read_User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/read/User */ "./src/modules/user/models/read/User.js");



/* harmony default export */ __webpack_exports__["default"] = (async ctx => {
  const slug = ctx.params.slug;
  let searchQuery = {
    slug: slug // Create a user instance.

  };
  let user = new _models_read_User__WEBPACK_IMPORTED_MODULE_0__["default"](ctx._rdbConn); // Throw the error if the table does not exist.

  let tableFound = await user.findTable('users');

  if (tableFound === false) {
    ctx.throw(500, 'users table does not exist');
  }

  let result = await user.fetch(searchQuery);

  if (!result) {
    ctx.throw(404, 'user not found');
  }

  return result;
});

/***/ }),

/***/ "./src/modules/user/controllers/index.js":
/*!***********************************************!*\
  !*** ./src/modules/user/controllers/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_read_Users__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/read/Users */ "./src/modules/user/models/read/Users.js");



/* harmony default export */ __webpack_exports__["default"] = (async ctx => {
  // Create a user instance.
  let users = new _models_read_Users__WEBPACK_IMPORTED_MODULE_0__["default"](ctx._rdbConn); // Throw the error if the table does not exist.

  let tableFound = await users.findTable('users');

  if (tableFound === false) {
    ctx.throw(500, 'users table does not exist');
  }

  let result = await users.fetch();
  return result;
});

/***/ }),

/***/ "./src/modules/user/controllers/update-user.js":
/*!*****************************************************!*\
  !*** ./src/modules/user/controllers/update-user.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_update_User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/update/User */ "./src/modules/user/models/update/User.js");


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/* harmony default export */ __webpack_exports__["default"] = (async ctx => {
  // Get the parsed data.
  let body = ctx.request.body || {};

  if (body.id === undefined) {
    ctx.throw(400, 'id is undefined');
  }

  if (body.name === undefined) {
    ctx.throw(400, 'name is undefined');
  }

  if (body.slug === undefined) {
    ctx.throw(400, 'slug is undefined');
  }

  if (body.id === '') {
    ctx.throw(400, 'id is required');
  }

  if (body.name === '') {
    ctx.throw(400, 'name is required');
  }

  if (body.slug === '') {
    ctx.throw(400, 'slug is required');
  }

  let objectId = body.id; // Create a user instance.

  let user = new _models_update_User__WEBPACK_IMPORTED_MODULE_0__["default"](ctx._rdbConn); // Throw the error if the table does not exist.

  let tableFound = await user.findTable('users');

  if (tableFound === false) {
    ctx.throw(500, 'users table does not exist');
  } // Check if the provided slug is taken.
  // Find one doc except itself.


  let slugFound = await user.getDocBySlugExcludeId(body.slug, objectId);

  if (slugFound) {
    ctx.throw(404, 'slug has been taken');
  } // Get the current doc.


  let currentDocument = await user.getDocById(objectId); // Prepare the update query.

  let timestamp = Date.now();
  let updateQuery = {
    name: body.name,
    slug: body.slug,
    updatedAt: timestamp // example fields that won't be injected into the document:
    // username: 'marymoe',
    // password: '123123'
    // Merge two objects.

  };

  let options = _objectSpread({}, currentDocument, updateQuery); // Update document by id.


  let result = await user.updateById(options, objectId);

  if (result.replaced !== 1) {
    ctx.throw(404, 'update user failed');
  }

  return result;
});

/***/ }),

/***/ "./src/modules/user/index.js":
/*!***********************************!*\
  !*** ./src/modules/user/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes */ "./src/modules/user/routes/index.js");
/* harmony import */ var _routes_fetch_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes/fetch-user */ "./src/modules/user/routes/fetch-user.js");
/* harmony import */ var _routes_create_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes/create-user */ "./src/modules/user/routes/create-user.js");
/* harmony import */ var _routes_update_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes/update-user */ "./src/modules/user/routes/update-user.js");
/* harmony import */ var _routes_delete_user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/delete-user */ "./src/modules/user/routes/delete-user.js");







 // Better with prefix
// https://www.npmjs.com/package/koa-router#router-prefixes

const router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a({
  prefix: '/users'
});
const routes = [_routes__WEBPACK_IMPORTED_MODULE_1__["default"], _routes_fetch_user__WEBPACK_IMPORTED_MODULE_2__["default"], _routes_create_user__WEBPACK_IMPORTED_MODULE_3__["default"], _routes_update_user__WEBPACK_IMPORTED_MODULE_4__["default"], _routes_delete_user__WEBPACK_IMPORTED_MODULE_5__["default"]];

for (var route of routes) {
  router.use(route.routes(), route.allowedMethods());
}

/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/modules/user/models/Model.js":
/*!******************************************!*\
  !*** ./src/modules/user/models/Model.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Model; });
/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb */ "rethinkdb");
/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var model_rethinkdb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! model/rethinkdb */ "./src/core/model/rethinkdb/index.js");
/* harmony import */ var model_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! model/utils */ "./src/core/model/utils.js");
/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./schema */ "./src/modules/user/models/schema.js");






class Model extends model_rethinkdb__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(options) {
    // The rules for ES2015 (ES6) classes basically come down to: // 1. In a child
    // class constructor, this cannot be used until super is called. // 2. ES6 class
    // constructors MUST call super if they are subclasses, or they must explicitly
    // return some object to take the place of the one that was not initialized. //
    // https://scotch.io/tutorials/better-javascript-with-es6-pt-ii-a-deep-dive-into-classes#toc-creating-subclasses-with-extends-calling-with-super //
    // https://stackoverflow.com/questions/31067368/javascript-es6-class-extend-without-super
    super(options);
    this.data = Object(model_utils__WEBPACK_IMPORTED_MODULE_2__["sanitise"])(options, _schema__WEBPACK_IMPORTED_MODULE_3__["default"]);
  }

  async findTable(tableName) {
    let exists = await rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.tableList().contains(tableName).run(this.connection);
    return exists;
  }

  async getDocBySlug(slug) {
    let searchQuery = {
      slug: slug
    };
    let result = await rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.table('users').filter(searchQuery).nth(0) // query for a stream/array element by its position
    .default(null) // will return null if no user found.
    .run(this.connection);
    return result;
  }

  async getDocBySlugExcludeId(slugName, objectId) {
    // Find one doc except itself.
    // https://rethinkdb.com/api/javascript/filter
    // https://rethinkdb.com/api/javascript/ne
    let result = await rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.table('users').filter(rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.row('slug').eq(slugName) // equal
    ).filter(rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.row('id').ne(objectId) // but not equal itself
    ).nth(0) // query for a stream/array element by its position
    .default(null) // will return null if no user found.
    .run(this.connection);
    return result;
  }

  async getDocById(objectId) {
    let result = await rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.table('users').get(objectId).run(this.connection);
    return result;
  }

}

/***/ }),

/***/ "./src/modules/user/models/create/User.js":
/*!************************************************!*\
  !*** ./src/modules/user/models/create/User.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return User; });
/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb */ "rethinkdb");
/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../schema */ "./src/modules/user/models/schema.js");
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Model */ "./src/modules/user/models/Model.js");





class User extends _Model__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(options) {
    super(options);
    this.data = _schema__WEBPACK_IMPORTED_MODULE_1__["default"].validate(options);
  }

  async insert(options) {
    // Enforce the schema.
    let data = options || this.data;
    let document = await _schema__WEBPACK_IMPORTED_MODULE_1__["default"].validateAsync(data); // Insert a doc.
    // https://rethinkdb.com/api/javascript/insert

    let result = await rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.table('users').insert(document, {
      returnChanges: true
    }).run(this.connection);
    return result;
  }

}

/***/ }),

/***/ "./src/modules/user/models/delete/User.js":
/*!************************************************!*\
  !*** ./src/modules/user/models/delete/User.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return User; });
/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb */ "rethinkdb");
/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Model */ "./src/modules/user/models/Model.js");




class User extends _Model__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(options) {
    super(options);
  }

  async delete(objectId) {
    // Delete a single document by id.
    // https://rethinkdb.com/api/javascript/delete/
    let result = await rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.table('users').get(objectId).delete().run(this.connection);
    return result;
  }

}

/***/ }),

/***/ "./src/modules/user/models/read/User.js":
/*!**********************************************!*\
  !*** ./src/modules/user/models/read/User.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return User; });
/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb */ "rethinkdb");
/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Model */ "./src/modules/user/models/Model.js");




class User extends _Model__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(options) {
    super(options);
  }

  async fetch(searchQuery) {
    // Retrieve documents by filter.
    // https://rethinkdb.com/api/javascript/filter/
    let result = await rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.table('users').filter(searchQuery).nth(0) // query for a stream/array element by its position
    .default(null) // will return null if no user found.
    .run(this.connection);
    return result;
  }

}

/***/ }),

/***/ "./src/modules/user/models/read/Users.js":
/*!***********************************************!*\
  !*** ./src/modules/user/models/read/Users.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Users; });
/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb */ "rethinkdb");
/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var model_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! model/utils */ "./src/core/model/utils.js");
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Model */ "./src/modules/user/models/Model.js");
/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../schema */ "./src/modules/user/models/schema.js");






class Users extends _Model__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(options) {
    super(options);
    this.data = Object(model_utils__WEBPACK_IMPORTED_MODULE_1__["sanitise"])(options, _schema__WEBPACK_IMPORTED_MODULE_3__["default"]);
  }

  async fetch(searchQuery) {
    let cursor = await rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.table('users').orderBy(rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.desc('createdAt')) // latest first
    .run(this.connection);
    let result = await cursor.toArray();
    return result;
  }

}

/***/ }),

/***/ "./src/modules/user/models/schema.js":
/*!*******************************************!*\
  !*** ./src/modules/user/models/schema.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @hapi/joi */ "@hapi/joi");
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hapi_joi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var model_Schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! model/Schema */ "./src/core/model/Schema.js");



 // https://hapi.dev/family/joi/?v=16.1.7

/* harmony default export */ __webpack_exports__["default"] = (new model_Schema__WEBPACK_IMPORTED_MODULE_1__["default"]({
  id: _hapi_joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().guid(),
  slug: _hapi_joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().trim() // .lowercase()
  .required(),
  name: _hapi_joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().trim().required(),
  // username: Joi.string()
  //   .alphanum()
  //   .min(3)
  //   .max(30)
  //   .required(),
  // password: Joi.string()
  //   .pattern(/^[a-zA-Z0-9]{3,30}$/)
  //   .required(),
  // repeatPassword: Joi.ref('password'),
  // Number only.
  createdAt: _hapi_joi__WEBPACK_IMPORTED_MODULE_0___default.a.number().integer().required(),
  // Number or null.
  updatedAt: [_hapi_joi__WEBPACK_IMPORTED_MODULE_0___default.a.number().integer(), null]
}));

/***/ }),

/***/ "./src/modules/user/models/update/User.js":
/*!************************************************!*\
  !*** ./src/modules/user/models/update/User.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return User; });
/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb */ "rethinkdb");
/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../schema */ "./src/modules/user/models/schema.js");
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Model */ "./src/modules/user/models/Model.js");





class User extends _Model__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(options) {
    super(options);
    this.data = _schema__WEBPACK_IMPORTED_MODULE_1__["default"].validate(options);
  }

  async updateById(options, objectId) {
    // Enforce the schema.
    let data = options || this.data;
    let document = await _schema__WEBPACK_IMPORTED_MODULE_1__["default"].validateAsync(data); // Update document by id.
    // https://rethinkdb.com/api/javascript/update/

    let result = await rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.table('users').get(objectId).update(document, {
      returnChanges: true
    }).run(this.connection);
    return result;
  }

}

/***/ }),

/***/ "./src/modules/user/routes/create-user.js":
/*!************************************************!*\
  !*** ./src/modules/user/routes/create-user.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_create_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/create-user */ "./src/modules/user/controllers/create-user.js");




const router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a(); // Add a user.

router.post('/user', async (ctx, next) => {
  try {
    const result = await Object(_controllers_create_user__WEBPACK_IMPORTED_MODULE_1__["default"])(ctx, next);
    ctx.type = 'json';
    ctx.body = result;
    await next();
  } catch (err) {
    // Get the error message and do something.
    // console.log(err.message)
    // Throw the error.
    ctx.throw(500, err);
  }
});
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/modules/user/routes/delete-user.js":
/*!************************************************!*\
  !*** ./src/modules/user/routes/delete-user.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_delete_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/delete-user */ "./src/modules/user/controllers/delete-user.js");




const router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a(); // Delete a user.

router.del('/user', async (ctx, next) => {
  try {
    const result = await Object(_controllers_delete_user__WEBPACK_IMPORTED_MODULE_1__["default"])(ctx, next);
    ctx.type = 'json';
    ctx.body = result;
    await next();
  } catch (err) {
    // Get the error message and do something.
    // console.log(err.message)
    // Throw the error.
    ctx.throw(500, err);
  }
});
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/modules/user/routes/fetch-user.js":
/*!***********************************************!*\
  !*** ./src/modules/user/routes/fetch-user.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_fetch_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/fetch-user */ "./src/modules/user/controllers/fetch-user.js");




const router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a(); // Get the user by slug.

router.get('/:slug', async (ctx, next) => {
  try {
    const result = await Object(_controllers_fetch_user__WEBPACK_IMPORTED_MODULE_1__["default"])(ctx, next);
    ctx.type = 'json';
    ctx.body = result;
    await next();
  } catch (err) {
    // Get the error message and do something.
    // console.log(err.message)
    // Throw the error.
    ctx.throw(500, err);
  }
});
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/modules/user/routes/index.js":
/*!******************************************!*\
  !*** ./src/modules/user/routes/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/index */ "./src/modules/user/controllers/index.js");




const router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a(); // Get all users.

router.get('/', async (ctx, next) => {
  try {
    const result = await Object(_controllers_index__WEBPACK_IMPORTED_MODULE_1__["default"])(ctx, next);
    ctx.type = 'json';
    ctx.body = result;
    await next();
  } catch (err) {
    // Get the error message and do something.
    // console.log(err.message)
    // Throw the error.
    ctx.throw(500, err);
  }
});
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/modules/user/routes/update-user.js":
/*!************************************************!*\
  !*** ./src/modules/user/routes/update-user.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_update_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/update-user */ "./src/modules/user/controllers/update-user.js");




const router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a(); // Update a user.

router.put('/user', async (ctx, next) => {
  try {
    const result = await Object(_controllers_update_user__WEBPACK_IMPORTED_MODULE_1__["default"])(ctx);
    ctx.type = 'json';
    ctx.body = result;
    await next();
  } catch (err) {
    // Get the error message and do something.
    // console.log(err.message)
    // Throw the error.
    ctx.throw(500, err);
  }
});
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/routes.js":
/*!***********************!*\
  !*** ./src/routes.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_home__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/home */ "./src/modules/home/index.js");
/* harmony import */ var _modules_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/user */ "./src/modules/user/index.js");


 // Import routes from different modules.



const router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a({// prefix: '/public'
}); // https://stackoverflow.com/questions/30285683/how-can-i-split-my-koa-routes-into-separate-files

const modules = [_modules_home__WEBPACK_IMPORTED_MODULE_1__["default"], _modules_user__WEBPACK_IMPORTED_MODULE_2__["default"]];

for (var module of modules) {
  router.use(module.routes(), module.allowedMethods());
}

/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /var/www/html/repo-github/koa-rethinkdb/src/index.js */"./src/index.js");


/***/ }),

/***/ "@hapi/joi":
/*!****************************!*\
  !*** external "@hapi/joi" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@hapi/joi");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ "koa-bodyparser":
/*!*********************************!*\
  !*** external "koa-bodyparser" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),

/***/ "koa-static":
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-static");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "rethinkdb":
/*!****************************!*\
  !*** external "rethinkdb" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("rethinkdb");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ })

/******/ });
//# sourceMappingURL=main.map