(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    var val = aliases[name];
    return (val && name !== val) ? expandAlias(val) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("App.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
	_inherits(App, _Component);

	function App(props) {
		_classCallCheck(this, App);

		return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
	}

	_createClass(App, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				this.props.children
			);
		}
	}]);

	return App;
}(_react.Component);

exports.default = App;
});

require.register("components/HeaderMenu/HeaderMenu.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require("react-router-dom");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require("semantic-ui-react");

var _storage = require("./../../utils/storage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeaderMenu = function (_Component) {
    _inherits(HeaderMenu, _Component);

    function HeaderMenu(props) {
        _classCallCheck(this, HeaderMenu);

        var _this = _possibleConstructorReturn(this, (HeaderMenu.__proto__ || Object.getPrototypeOf(HeaderMenu)).call(this, props));

        _this.state = {
            activeItem: "",
            isLoading: true,
            isLoggedIn: false,
            token: ""
        };
        return _this;
    }

    _createClass(HeaderMenu, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            var obj = (0, _storage.getFromStorage)("botany-bay");

            if (obj && obj.token !== "") {} else {
                this.setState({ isLoggedIn: false });
                //return this.props.history.push("/login");
            }

            if (obj && obj.token) {
                var token = obj.token;

                // Verify token

                fetch("/api/Prototype/user/verify?token=" + token).then(function (res) {
                    return res.json();
                }).then(function (json) {
                    if (json.success) {
                        _this2.setState({
                            token: token,
                            isLoggedIn: true,
                            isLoading: false
                        }, function () {
                            //return this.props.history.push("/dashboard");
                        });
                    } else {
                        _this2.setState({
                            isLoading: false,
                            isLoggedIn: false,
                            userData: []
                        });
                    }
                });
            } else {
                this.setState({
                    isLoading: false
                });
            }
        }
    }, {
        key: "handleClick",
        value: function handleClick(e, _ref) {
            var name = _ref.name;

            this.setState({ activeItem: name });
        }
    }, {
        key: "handleLogout",
        value: function handleLogout() {
            var _this3 = this;

            this.setState({
                isLoading: true
            });

            var obj = (0, _storage.getFromStorage)("botany-bay");

            if (obj && obj.token) {
                var token = obj.token;

                // Verify token

                fetch("/api/Prototype/user/logout?token=" + token).then(function (res) {
                    return res.json();
                }).then(function (json) {
                    if (json.success) {
                        localStorage.removeItem("botany-bay");

                        _this3.setState({
                            token: "",
                            signInError: "",
                            isLoading: false
                        }, function () {
                            return _this3.props.history.push("/");
                        });
                    } else {
                        _this3.setState({
                            isLoading: false
                        });
                    }
                });
            } else {
                this.setState({
                    isLoading: false
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _state = this.state,
                activeItem = _state.activeItem,
                isLoggedIn = _state.isLoggedIn;


            return _react2.default.createElement(
                _semanticUiReact.Menu,
                { secondary: true, stackable: true },
                _react2.default.createElement(
                    _semanticUiReact.Menu.Item,
                    { header: true },
                    "Shipyard"
                ),
                _react2.default.createElement(
                    _semanticUiReact.Menu.Item,
                    {
                        name: "home",
                        active: activeItem === "home",
                        onClick: this.handleClick.bind(this),
                        as: _reactRouterDom.NavLink,
                        exact: true,
                        to: "/"
                    },
                    "Home"
                ),
                isLoggedIn ? _react2.default.createElement(
                    _semanticUiReact.Menu.Menu,
                    { position: "right" },
                    _react2.default.createElement(
                        _semanticUiReact.Menu.Item,
                        {
                            name: "dashboard",
                            active: activeItem === "dashboard",
                            onClick: this.handleClick.bind(this),
                            as: _reactRouterDom.NavLink,
                            to: "/dashboard"
                        },
                        "Dashboard"
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Menu.Item,
                        {
                            name: "logout",
                            active: activeItem === "logout",
                            onClick: this.handleLogout.bind(this)
                        },
                        "Logout"
                    )
                ) : _react2.default.createElement(
                    _semanticUiReact.Menu.Menu,
                    { position: "right" },
                    _react2.default.createElement(
                        _semanticUiReact.Menu.Item,
                        {
                            name: "login",
                            active: activeItem === "login",
                            onClick: this.handleClick.bind(this),
                            as: _reactRouterDom.NavLink,
                            exact: true,
                            to: "/login"
                        },
                        "Login"
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Menu.Item,
                        {
                            name: "register",
                            active: activeItem === "register",
                            onClick: this.handleClick.bind(this),
                            as: _reactRouterDom.NavLink,
                            exact: true,
                            to: "/register"
                        },
                        "Register"
                    )
                )
            );
        }
    }]);

    return HeaderMenu;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(HeaderMenu);
});

require.register("components/HeaderMenu/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderMenu = undefined;

var _HeaderMenu = require("./HeaderMenu");

var _HeaderMenu2 = _interopRequireDefault(_HeaderMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { HeaderMenu: _HeaderMenu2.default };
exports.HeaderMenu = _HeaderMenu2.default;
});

require.register("components/PageHeader/PageHeader.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require("semantic-ui-react");

var _ = require("./../");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageHeader = function (_Component) {
    _inherits(PageHeader, _Component);

    function PageHeader(props) {
        _classCallCheck(this, PageHeader);

        var _this = _possibleConstructorReturn(this, (PageHeader.__proto__ || Object.getPrototypeOf(PageHeader)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(PageHeader, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(_.HeaderMenu, null);
        }
    }]);

    return PageHeader;
}(_react.Component);

exports.default = PageHeader;
});

;require.register("components/PageHeader/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageHeader = undefined;

var _PageHeader = require("./PageHeader");

var _PageHeader2 = _interopRequireDefault(_PageHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { PageHeader: _PageHeader2.default };
exports.PageHeader = _PageHeader2.default;
});

require.register("components/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageHeader = exports.HeaderMenu = undefined;

var _HeaderMenu = require("./HeaderMenu");

var _PageHeader = require("./PageHeader");

exports.default = { HeaderMenu: _HeaderMenu.HeaderMenu, PageHeader: _PageHeader.PageHeader };
exports.HeaderMenu = _HeaderMenu.HeaderMenu;
exports.PageHeader = _PageHeader.PageHeader;
});

require.register("containers/Dashboard/Dashboard.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _isomorphicUnfetch = require("isomorphic-unfetch");

var _isomorphicUnfetch2 = _interopRequireDefault(_isomorphicUnfetch);

var _baseLayout = require("@shipyardsuite/base-layout");

var _HeaderMenu = require("../../components/HeaderMenu/HeaderMenu");

var _HeaderMenu2 = _interopRequireDefault(_HeaderMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_Component) {
    _inherits(Home, _Component);

    function Home(props) {
        _classCallCheck(this, Home);

        var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Home, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            (0, _isomorphicUnfetch2.default)("/api/Prototype/users").then(function (res) {
                return res.json();
            }).then(function (data) {
                console.log(data);
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(_HeaderMenu2.default, null),
                _react2.default.createElement(_baseLayout.DBFetcher, { url: "/api/Prototype/test" })
            );
        }
    }]);

    return Home;
}(_react.Component);

exports.default = Home;
});

;require.register("containers/Dashboard/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dashboard = undefined;

var _Dashboard = require("./Dashboard");

var _Dashboard2 = _interopRequireDefault(_Dashboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { Dashboard: _Dashboard2.default };
exports.Dashboard = _Dashboard2.default;
});

require.register("containers/Home/Home.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _isomorphicUnfetch = require("isomorphic-unfetch");

var _isomorphicUnfetch2 = _interopRequireDefault(_isomorphicUnfetch);

var _components = require("../../components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_Component) {
    _inherits(Home, _Component);

    function Home(props) {
        _classCallCheck(this, Home);

        var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Home, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            (0, _isomorphicUnfetch2.default)("/api/Prototype/users").then(function (res) {
                return res.json();
            }).then(function (data) {
                console.log(data);
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(_components.PageHeader, null)
            );
        }
    }]);

    return Home;
}(_react.Component);

exports.default = Home;
});

;require.register("containers/Home/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Home = undefined;

var _Home = require("./Home");

var _Home2 = _interopRequireDefault(_Home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { Home: _Home2.default };
exports.Home = _Home2.default;
});

require.register("containers/Login/Login.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require("react-router-dom");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require("semantic-ui-react");

var _storage = require("./../../utils/storage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_Component) {
    _inherits(Login, _Component);

    function Login(props) {
        _classCallCheck(this, Login);

        var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

        _this.state = {
            token: "",
            loginError: "",
            email: "",
            password: ""
        };
        return _this;
    }

    _createClass(Login, [{
        key: "handleChange",
        value: function handleChange(e, _ref) {
            var name = _ref.name,
                value = _ref.value;

            this.setState(_defineProperty({}, name, value));
        }
    }, {
        key: "onLogin",
        value: function onLogin() {
            var _this2 = this;

            var _state = this.state,
                email = _state.email,
                password = _state.password;


            this.setState({
                loginError: ""
            }, function () {
                fetch("/api/Prototype/user/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }).then(function (res) {
                    return res.json();
                }).then(function (json) {
                    if (json.success) {
                        (0, _storage.setInStorage)("botany-bay", { token: json.token });

                        _this2.props.history.push("/dashboard");

                        _this2.setState({
                            loginError: json.message,
                            email: "",
                            password: "",
                            token: json.token
                        });
                    } else {
                        _this2.setState({
                            loginError: json.message
                        });
                    }
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _state2 = this.state,
                email = _state2.email,
                password = _state2.password,
                loginError = _state2.loginError;


            return _react2.default.createElement(
                _semanticUiReact.Segment,
                { basic: true },
                _react2.default.createElement(
                    _semanticUiReact.Header,
                    { as: "h2", color: "black", textAlign: "center" },
                    "Log-in"
                ),
                _react2.default.createElement(
                    _semanticUiReact.Form,
                    { size: "large" },
                    _react2.default.createElement(
                        _semanticUiReact.Segment,
                        { raised: true },
                        _react2.default.createElement(_semanticUiReact.Form.Input, {
                            type: "email",
                            name: "email",
                            fluid: true,
                            icon: "user",
                            iconPosition: "left",
                            value: email,
                            onChange: this.handleChange.bind(this),
                            placeholder: "E-mail address"
                        }),
                        _react2.default.createElement(_semanticUiReact.Form.Input, {
                            fluid: true,
                            icon: "lock",
                            iconPosition: "left",
                            placeholder: "Password",
                            type: "password",
                            name: "password",
                            value: password,
                            onChange: this.handleChange.bind(this)
                        }),
                        _react2.default.createElement(
                            _semanticUiReact.Button,
                            {
                                color: "teal",
                                fluid: true,
                                size: "large",
                                onClick: this.onLogin.bind(this)
                            },
                            "Login"
                        ),
                        _react2.default.createElement(
                            _semanticUiReact.Message,
                            null,
                            "Dont have an account yet?\xA0",
                            _react2.default.createElement(
                                _reactRouterDom.NavLink,
                                { exact: true, to: "/register" },
                                "Create one now!"
                            )
                        ),
                        loginError ? _react2.default.createElement(
                            _semanticUiReact.Message,
                            { color: "red" },
                            loginError
                        ) : null
                    )
                )
            );
        }
    }]);

    return Login;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(Login);
});

require.register("containers/Login/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Login = undefined;

var _Login = require("./Login");

var _Login2 = _interopRequireDefault(_Login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { Login: _Login2.default };
exports.Login = _Login2.default;
});

require.register("containers/NotFound/NotFound.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("../../components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotFound = function (_Component) {
    _inherits(NotFound, _Component);

    function NotFound(props) {
        _classCallCheck(this, NotFound);

        var _this = _possibleConstructorReturn(this, (NotFound.__proto__ || Object.getPrototypeOf(NotFound)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(NotFound, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            fetch("/api/Prototype/users").then(function (res) {
                return res.json();
            }).then(function (data) {
                console.log(data);
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(_components.PageHeader, null),
                _react2.default.createElement(
                    "p",
                    null,
                    "404: Page not found..."
                )
            );
        }
    }]);

    return NotFound;
}(_react.Component);

exports.default = NotFound;
});

;require.register("containers/NotFound/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotFound = undefined;

var _NotFound = require("./NotFound");

var _NotFound2 = _interopRequireDefault(_NotFound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { NotFound: _NotFound2.default };
exports.NotFound = _NotFound2.default;
});

require.register("containers/Register/Register.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require("react-router-dom");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require("semantic-ui-react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Register = function (_Component) {
    _inherits(Register, _Component);

    function Register(props) {
        _classCallCheck(this, Register);

        var _this = _possibleConstructorReturn(this, (Register.__proto__ || Object.getPrototypeOf(Register)).call(this, props));

        _this.state = {
            signUpError: "",
            registrationSuccess: false,
            email: "",
            password: "",
            passwordValidation: ""
        };
        return _this;
    }

    _createClass(Register, [{
        key: "handleChange",
        value: function handleChange(e, _ref) {
            var name = _ref.name,
                value = _ref.value;

            this.setState(_defineProperty({}, name, value));
        }
    }, {
        key: "onSignUp",
        value: function onSignUp() {
            var _this2 = this;

            var _state = this.state,
                email = _state.email,
                password = _state.password,
                passwordValidation = _state.passwordValidation;


            if (password === passwordValidation) {
                fetch("/api/Prototype/user/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }).then(function (res) {
                    return res.json();
                }).then(function (json) {
                    if (json.success) {
                        _this2.setState({
                            signUpError: json.message,
                            registrationSuccess: true,
                            email: "",
                            password: ""
                        });
                    } else {
                        _this2.setState({
                            signUpError: json.message
                        });
                    }
                });
            } else {
                this.setState({
                    signUpError: "Passwords did not match!"
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _state2 = this.state,
                email = _state2.email,
                password = _state2.password,
                passwordValidation = _state2.passwordValidation,
                registrationSuccess = _state2.registrationSuccess,
                signUpError = _state2.signUpError;


            return _react2.default.createElement(
                _semanticUiReact.Segment,
                { basic: true },
                _react2.default.createElement(
                    _semanticUiReact.Header,
                    { as: "h2", color: "black", textAlign: "center" },
                    "Register new Account"
                ),
                _react2.default.createElement(
                    _semanticUiReact.Form,
                    { size: "large" },
                    _react2.default.createElement(
                        _semanticUiReact.Segment,
                        { raised: true, disabled: registrationSuccess },
                        _react2.default.createElement(_semanticUiReact.Form.Input, {
                            fluid: true,
                            type: "email",
                            icon: "user",
                            iconPosition: "left",
                            placeholder: "E-mail address",
                            name: "email",
                            value: email,
                            onChange: this.handleChange.bind(this)
                        }),
                        _react2.default.createElement(_semanticUiReact.Form.Input, {
                            fluid: true,
                            type: "password",
                            icon: "lock",
                            iconPosition: "left",
                            placeholder: "Password",
                            name: "password",
                            value: password,
                            onChange: this.handleChange.bind(this)
                        }),
                        _react2.default.createElement(_semanticUiReact.Form.Input, {
                            fluid: true,
                            type: "password",
                            icon: "lock",
                            iconPosition: "left",
                            placeholder: "Repeat Password",
                            name: "passwordValidation",
                            value: passwordValidation,
                            onChange: this.handleChange.bind(this)
                        }),
                        _react2.default.createElement(
                            _semanticUiReact.Button,
                            {
                                color: "teal",
                                fluid: true,
                                size: "large",
                                onClick: this.onSignUp.bind(this)
                            },
                            "Register"
                        ),
                        registrationSuccess ? _react2.default.createElement(
                            _semanticUiReact.Message,
                            { color: "green" },
                            "Registration Successful, check your emails.\xA0",
                            _react2.default.createElement(
                                _reactRouterDom.NavLink,
                                { exact: true, to: "/" },
                                "Back to Homepage"
                            )
                        ) : null,
                        signUpError ? _react2.default.createElement(
                            _semanticUiReact.Message,
                            { color: "red" },
                            signUpError
                        ) : null
                    )
                )
            );
        }
    }]);

    return Register;
}(_react.Component);

exports.default = Register;
});

;require.register("containers/Register/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Register = undefined;

var _Register = require("./Register");

var _Register2 = _interopRequireDefault(_Register);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { Register: _Register2.default };
exports.Register = _Register2.default;
});

require.register("containers/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Register = exports.NotFound = exports.Login = exports.Home = exports.Dashboard = undefined;

var _Dashboard = require("./Dashboard");

var _Home = require("./Home");

var _Login = require("./Login");

var _NotFound = require("./NotFound");

var _Register = require("./Register");

exports.default = { Dashboard: _Dashboard.Dashboard, Home: _Home.Home, Login: _Login.Login, NotFound: _NotFound.NotFound, Register: _Register.Register };
exports.Dashboard = _Dashboard.Dashboard;
exports.Home = _Home.Home;
exports.Login = _Login.Login;
exports.NotFound = _NotFound.NotFound;
exports.Register = _Register.Register;
});

require.register("initialize.js", function(exports, require, module) {
"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = require("react-router-dom");

var _App = require("./App");

var _App2 = _interopRequireDefault(_App);

var _containers = require("./containers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(
        _App2.default,
        null,
        _react2.default.createElement(
            _reactRouterDom.Switch,
            null,
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/", component: _containers.Home }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/register", component: _containers.Register }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/login", component: _containers.Login }),
            _react2.default.createElement(_reactRouterDom.Route, { path: "/dashboard", component: _containers.Dashboard }),
            _react2.default.createElement(_reactRouterDom.Route, { component: _containers.NotFound })
        )
    )
), document.querySelector("#root"));
});

require.register("utils/storage.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFromStorage = getFromStorage;
exports.setInStorage = setInStorage;
function getFromStorage(key) {
    if (!key) {
        return null;
    }

    try {
        var valueStr = localStorage.getItem(key);

        if (valueStr) {
            return JSON.parse(valueStr);
        }

        return null;
    } catch (err) {
        return null;
    }
}

function setInStorage(key, obj) {
    if (!key) {
        console.error("Error: Key is missing");
    }

    try {
        localStorage.setItem(key, JSON.stringify(obj));
    } catch (err) {
        console.error(err);
    }
}
});

;require.alias("node-browser-modules/node_modules/buffer/index.js", "buffer");
require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map