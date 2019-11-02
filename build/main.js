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

    var cursor = await rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.table('user').changes().run(connection);
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
  constructor(connection, table) {
    this.table = table;
    this.connection = connection;
  }

  async hasTable() {
    let exists = await rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.tableList().contains(this.table).run(this.connection);
    return exists;
  }

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

/***/ "./src/modules/user/controllers/create/user.js":
/*!*****************************************************!*\
  !*** ./src/modules/user/controllers/create/user.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_create_User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/create/User */ "./src/modules/user/models/create/User.js");



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


  let user = new _models_create_User__WEBPACK_IMPORTED_MODULE_0__["default"](ctx._rdbConn, 'user'); // Throw the error if the table does not exist.

  let tableFound = await user.hasTable();

  if (tableFound === false) {
    ctx.throw(500, 'users table does not exist');
  } // Check if the provided slug is taken.


  let isSlugUnique = await user.isUnique('slug', body.slug);

  if (isSlugUnique !== true) {
    ctx.throw(404, 'slug has been taken');
  } // Insert a doc.
  // Current timestamp.


  let timestamp = Date.now();
  let options = {
    name: body.name,
    slug: body.slug // example fields that won't be injected into the document:
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

/***/ "./src/modules/user/controllers/delete/user.js":
/*!*****************************************************!*\
  !*** ./src/modules/user/controllers/delete/user.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_delete_User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/delete/User */ "./src/modules/user/models/delete/User.js");



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

  let user = new _models_delete_User__WEBPACK_IMPORTED_MODULE_0__["default"](ctx._rdbConn, 'user'); // Throw the error if the table does not exist.

  let tableFound = await user.hasTable();

  if (tableFound === false) {
    ctx.throw(500, 'users table does not exist');
  } // Find one doc.


  const found = await user.getById(objectId);

  if (!found) {
    ctx.throw(404, 'user does not exist');
  }

  let result = await user.deleteById(objectId);

  if (result.deleted !== 1) {
    ctx.throw(404, 'delete user failed');
  }

  return result;
});

/***/ }),

/***/ "./src/modules/user/controllers/read/user.js":
/*!***************************************************!*\
  !*** ./src/modules/user/controllers/read/user.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_read_User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/read/User */ "./src/modules/user/models/read/User.js");



/* harmony default export */ __webpack_exports__["default"] = (async ctx => {
  const slug = ctx.params.slug; // Create a user instance.

  let user = new _models_read_User__WEBPACK_IMPORTED_MODULE_0__["default"](ctx._rdbConn, 'user'); // Throw the error if the table does not exist.

  let tableFound = await user.hasTable();

  if (tableFound === false) {
    ctx.throw(500, 'users table does not exist');
  }

  let result = await user.fetchBySlug(slug);

  if (!result) {
    ctx.throw(404, 'user not found');
  }

  return result;
});

/***/ }),

/***/ "./src/modules/user/controllers/read/users.js":
/*!****************************************************!*\
  !*** ./src/modules/user/controllers/read/users.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_read_Users__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/read/Users */ "./src/modules/user/models/read/Users.js");



/* harmony default export */ __webpack_exports__["default"] = (async ctx => {
  // Create a user instance.
  let users = new _models_read_Users__WEBPACK_IMPORTED_MODULE_0__["default"](ctx._rdbConn, 'user'); // Throw the error if the table does not exist.

  let tableFound = await users.hasTable();

  if (tableFound === false) {
    ctx.throw(500, 'users table does not exist');
  }

  let result = await users.fetch();
  return result;
});

/***/ }),

/***/ "./src/modules/user/controllers/update/user.js":
/*!*****************************************************!*\
  !*** ./src/modules/user/controllers/update/user.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_update_User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/update/User */ "./src/modules/user/models/update/User.js");



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

  if (body.email === undefined) {
    ctx.throw(400, 'email is undefined');
  }

  if (body.username === undefined) {
    ctx.throw(400, 'username is undefined');
  }

  if (body.password === undefined) {
    ctx.throw(400, 'password is undefined');
  }

  if (body.confirmPassword === undefined) {
    ctx.throw(400, 'confirmPassword is undefined');
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

  if (body.email === '') {
    ctx.throw(400, 'email is required');
  }

  if (body.username === '') {
    ctx.throw(400, 'username is required');
  }

  if (body.password === '') {
    ctx.throw(400, 'password is required');
  }

  let objectId = body.id; // Create a user instance.

  let user = new _models_update_User__WEBPACK_IMPORTED_MODULE_0__["default"](ctx._rdbConn, 'user'); // Throw the error if the table does not exist.

  let tableFound = await user.hasTable();

  if (tableFound === false) {
    ctx.throw(500, 'users table does not exist');
  } // Check if the provided slug is taken.
  // Find one doc except itself.


  let isSlugUnique = await user.isUnique('slug', body.slug, objectId);

  if (isSlugUnique !== true) {
    ctx.throw(404, 'slug has been taken');
  } // Check if the provided username is taken.
  // Find one doc except itself.


  let isUsernameUnique = await user.isUnique('username', body.username, objectId);

  if (isUsernameUnique !== true) {
    ctx.throw(404, 'username has been taken');
  } // Check if the provided email is taken.
  // Find one doc except itself.


  let isEmailUnique = await user.isUnique('email', body.email, objectId);

  if (isEmailUnique !== true) {
    ctx.throw(404, 'email has been taken');
  } // Prepare the update query.


  let timestamp = Date.now();
  let updateQuery = {
    name: body.name,
    slug: body.slug,
    email: body.email,
    username: body.username,
    updatedAt: timestamp // example fields that won't be injected into the document:
    // username: 'marymoe',
    // password: '123123'
    // Update document by id.

  };
  let result = await user.updateById(updateQuery, objectId);

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
/* harmony import */ var _routes_read_users__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes/read/users */ "./src/modules/user/routes/read/users.js");
/* harmony import */ var _routes_read_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes/read/user */ "./src/modules/user/routes/read/user.js");
/* harmony import */ var _routes_create_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes/create/user */ "./src/modules/user/routes/create/user.js");
/* harmony import */ var _routes_update_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes/update/user */ "./src/modules/user/routes/update/user.js");
/* harmony import */ var _routes_delete_user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/delete/user */ "./src/modules/user/routes/delete/user.js");







 // Better with prefix
// https://www.npmjs.com/package/koa-router#router-prefixes

const router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a({
  prefix: '/users'
});
const routes = [_routes_read_users__WEBPACK_IMPORTED_MODULE_1__["default"], _routes_read_user__WEBPACK_IMPORTED_MODULE_2__["default"], _routes_create_user__WEBPACK_IMPORTED_MODULE_3__["default"], _routes_update_user__WEBPACK_IMPORTED_MODULE_4__["default"], _routes_delete_user__WEBPACK_IMPORTED_MODULE_5__["default"]];

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
/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schema */ "./src/modules/user/models/schema.js");





class Model extends model_rethinkdb__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(...args) {
    super(...args);
  }

  async getBySlug(slug) {
    let searchQuery = {
      slug: slug
    };
    let result = await rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.table(this.table).filter(searchQuery).nth(0) // query for a stream/array element by its position
    .default(null) // will return null if no user found.
    .run(this.connection);
    return result;
  }

  async getBySlugExcludeId(slugName, objectId) {
    // Find one doc except itself.
    // https://rethinkdb.com/api/javascript/filter
    // https://rethinkdb.com/api/javascript/ne
    let result = await rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.table(this.table).filter(rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.row('slug').eq(slugName) // equal
    ).filter(rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.row('id').ne(objectId) // but not equal itself
    ).nth(0) // query for a stream/array element by its position
    .default(null) // will return null if no user found.
    .run(this.connection);
    return result;
  }

  async getById(objectId) {
    let result = await rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.table(this.table).get(objectId).run(this.connection);
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
  constructor(...args) {
    super(...args);
  }

  async insert(options) {
    // Enforce the schema.
    let document = await _schema__WEBPACK_IMPORTED_MODULE_1__["default"].validateAsync(options, {
      convert: false
    }); // Insert a doc.
    // https://rethinkdb.com/api/javascript/insert

    let result = await rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.table(this.table).insert(document, {
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
  constructor(...args) {
    super(...args);
  }

  async deleteById(objectId) {
    // Delete a single document by id.
    // https://rethinkdb.com/api/javascript/delete/
    let result = await rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.table(this.table).get(objectId).delete().run(this.connection);
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
  constructor(...args) {
    super(...args);
  }

  async fetchBySlug(slug) {
    // Prepare query.
    let searchQuery = {
      slug: slug // Retrieve documents by filter.
      // https://rethinkdb.com/api/javascript/filter/

    };
    let result = await rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.table(this.table).filter(searchQuery).nth(0) // query for a stream/array element by its position
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
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Model */ "./src/modules/user/models/Model.js");




class Users extends _Model__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(...args) {
    super(...args);
  }

  async fetch() {
    let cursor = await rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.table(this.table).orderBy(rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.desc('createdAt')) // latest first
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
  slug: _hapi_joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().trim().min(3).max(30).lowercase().required(),
  name: _hapi_joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().trim().min(3).max(30).required(),
  // email: Joi.string()
  //   .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  //   .trim()
  //   .required(),
  // username: Joi.string()
  //   .alphanum()
  //   .min(3)
  //   .max(30)
  //   .trim()
  //   .required(),
  // password: Joi.string()
  //   .pattern(/^[a-zA-Z0-9]{3,30}$/)
  //   .trim()
  //   .required(),
  // repeatPassword: Joi.ref('password'),
  // Number only.
  createdAt: _hapi_joi__WEBPACK_IMPORTED_MODULE_0___default.a.number().integer().required(),
  // Number only on update.
  updatedAt: _hapi_joi__WEBPACK_IMPORTED_MODULE_0___default.a.number().integer()
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


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class User extends _Model__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(...args) {
    super(...args);
  }

  async updateById(updateQuery, objectId) {
    // Get the current doc.
    let currentDocument = await this.getById(objectId); // Merge two objects.

    let options = _objectSpread({}, currentDocument, updateQuery); // Enforce the schema.


    let document = await _schema__WEBPACK_IMPORTED_MODULE_1__["default"].validateAsync(options, {
      convert: false
    }); // Update document by id.
    // https://rethinkdb.com/api/javascript/update/

    let result = await rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.table(this.table).get(objectId).update(document, {
      returnChanges: true
    }).run(this.connection);
    return result;
  }

}

/***/ }),

/***/ "./src/modules/user/routes/create/user.js":
/*!************************************************!*\
  !*** ./src/modules/user/routes/create/user.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_create_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../controllers/create/user */ "./src/modules/user/controllers/create/user.js");




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

/***/ "./src/modules/user/routes/delete/user.js":
/*!************************************************!*\
  !*** ./src/modules/user/routes/delete/user.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_delete_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../controllers/delete/user */ "./src/modules/user/controllers/delete/user.js");




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

/***/ "./src/modules/user/routes/read/user.js":
/*!**********************************************!*\
  !*** ./src/modules/user/routes/read/user.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_read_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../controllers/read/user */ "./src/modules/user/controllers/read/user.js");




const router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a(); // Get the user by slug.

router.get('/:slug', async (ctx, next) => {
  try {
    const result = await Object(_controllers_read_user__WEBPACK_IMPORTED_MODULE_1__["default"])(ctx, next);
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

/***/ "./src/modules/user/routes/read/users.js":
/*!***********************************************!*\
  !*** ./src/modules/user/routes/read/users.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_read_users__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../controllers/read/users */ "./src/modules/user/controllers/read/users.js");




const router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a(); // Get all users.

router.get('/', async (ctx, next) => {
  try {
    const result = await Object(_controllers_read_users__WEBPACK_IMPORTED_MODULE_1__["default"])(ctx, next);
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

/***/ "./src/modules/user/routes/update/user.js":
/*!************************************************!*\
  !*** ./src/modules/user/routes/update/user.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_update_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../controllers/update/user */ "./src/modules/user/controllers/update/user.js");




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