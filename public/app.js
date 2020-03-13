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
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

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
        key: "render",
        value: function render() {
            return this.props.children;
        }
    }]);

    return App;
}(_react.Component);

exports.default = App;
});

require.register("components/Dashboard/DashboardHeader/DashboardHeader.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require("react-router-dom");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _storage = require("./../../../utils/storage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DashboardHeader = function (_Component) {
    _inherits(DashboardHeader, _Component);

    function DashboardHeader(props) {
        _classCallCheck(this, DashboardHeader);

        var _this = _possibleConstructorReturn(this, (DashboardHeader.__proto__ || Object.getPrototypeOf(DashboardHeader)).call(this, props));

        _this.state = {
            isLoggedIn: false,
            token: ""
        };
        return _this;
    }

    _createClass(DashboardHeader, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            var obj = (0, _storage.getFromStorage)("botany-bay");

            if (obj && obj.token !== "") {} else {
                this.setState({ isLoggedIn: false });
                return this.props.history.push("/login");
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
                            isLoggedIn: true
                        });
                    } else {
                        _this2.setState({
                            isLoggedIn: false
                        });
                    }
                });
            }
        }
    }, {
        key: "handleLogOut",
        value: function handleLogOut() {
            var _this3 = this;

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
                            token: ""
                        }, function () {
                            return _this3.props.history.push("/");
                        });
                    }
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "ul",
                    null,
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            "a",
                            { href: "#", onClick: this.handleLogOut.bind(this) },
                            "Logout"
                        )
                    )
                ),
                _react2.default.createElement("hr", null)
            );
        }
    }]);

    return DashboardHeader;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(DashboardHeader);
});

require.register("components/Dashboard/DashboardHeader/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashboardHeader = undefined;

var _DashboardHeader = require("./DashboardHeader");

var _DashboardHeader2 = _interopRequireDefault(_DashboardHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { DashboardHeader: _DashboardHeader2.default };
exports.DashboardHeader = _DashboardHeader2.default;
});

require.register("components/Dashboard/ProjectTeamView/ProjectTeamView.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require("react-router-dom");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectTeamView = function (_Component) {
    _inherits(ProjectTeamView, _Component);

    function ProjectTeamView(props) {
        _classCallCheck(this, ProjectTeamView);

        var _this = _possibleConstructorReturn(this, (ProjectTeamView.__proto__ || Object.getPrototypeOf(ProjectTeamView)).call(this, props));

        _this.state = {
            project: []
        };
        return _this;
    }

    _createClass(ProjectTeamView, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            // fetch(`/api/Prototype/project/${this.props.match.params.id}`)
            //     .then(res => res.json())
            //     .then(data => {
            //         if (data.success) {
            //             this.setState({ project: data.project });
            //         }
            //     });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                "Test"
            );
        }
    }]);

    return ProjectTeamView;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(ProjectTeamView);
});

require.register("components/Dashboard/UserById/UserById.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require("react-router-dom");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserById = function (_Component) {
    _inherits(UserById, _Component);

    function UserById(props) {
        _classCallCheck(this, UserById);

        var _this = _possibleConstructorReturn(this, (UserById.__proto__ || Object.getPrototypeOf(UserById)).call(this, props));

        _this.state = {
            user: []
        };
        return _this;
    }

    _createClass(UserById, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            var userId = this.props.userId;


            if (userId) {
                fetch("/api/Prototype/user/" + userId).then(function (res) {
                    return res.json();
                }).then(function (data) {
                    if (data.success) {
                        console.log(data);
                        _this2.setState({ user: data, idFound: true });
                    }
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var userId = this.props.userId;
            var user = this.state.user;


            return _react2.default.createElement(
                _reactRouterDom.NavLink,
                { exact: true, to: "/profile/" + userId },
                user.email
            );
        }
    }]);

    return UserById;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(UserById);
});

require.register("components/Dashboard/UserById/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserById = undefined;

var _UserById = require("./UserById");

var _UserById2 = _interopRequireDefault(_UserById);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { UserById: _UserById2.default };
exports.UserById = _UserById2.default;
});

require.register("components/Dashboard/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserById = exports.DashboardHeader = undefined;

var _DashboardHeader = require("./DashboardHeader");

var _UserById = require("./UserById");

exports.default = {
    DashboardHeader: _DashboardHeader.DashboardHeader,
    UserById: _UserById.UserById
};
exports.DashboardHeader = _DashboardHeader.DashboardHeader;
exports.UserById = _UserById.UserById;
});

require.register("containers/Dashboard/Overview/Overview.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require("react-router-dom");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _storage = require("./../../../utils/storage");

var _Dashboard = require("./../../../components/Dashboard");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Overview = function (_Component) {
    _inherits(Overview, _Component);

    function Overview(props) {
        _classCallCheck(this, Overview);

        var _this = _possibleConstructorReturn(this, (Overview.__proto__ || Object.getPrototypeOf(Overview)).call(this, props));

        _this.state = {
            user: {},
            projects: []
        };
        return _this;
    }

    _createClass(Overview, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.getUser();
        }
    }, {
        key: "getUser",
        value: function getUser() {
            var _this2 = this;

            var obj = (0, _storage.getFromStorage)("botany-bay");

            if (obj && obj.token) {
                var token = obj.token;


                fetch("/api/Prototype/user/?id=" + token).then(function (res) {
                    return res.json();
                }).then(function (json) {
                    if (json.success) {
                        _this2.setState({
                            isLoading: false,
                            user: json.data.user
                        }, function () {
                            _this2.getProjects();
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
        key: "getProjects",
        value: function getProjects() {
            var _this3 = this;

            var user = this.state.user;

            fetch("/api/Prototype/" + user._id + "/projects/").then(function (res) {
                return res.json();
            }).then(function (data) {
                if (data.success) {
                    _this3.setState({ projects: data.projects });
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _state = this.state,
                user = _state.user,
                projects = _state.projects;


            return _react2.default.createElement(
                "div",
                { className: "content" },
                _react2.default.createElement(_Dashboard.DashboardHeader, null),
                _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        "h1",
                        null,
                        "Overview"
                    ),
                    _react2.default.createElement(
                        "h3",
                        null,
                        "User"
                    ),
                    _react2.default.createElement(
                        "ul",
                        null,
                        _react2.default.createElement(
                            "li",
                            null,
                            "id: ",
                            user._id
                        ),
                        _react2.default.createElement(
                            "li",
                            null,
                            "signedUp: ",
                            (0, _moment2.default)(user.signUpDate).fromNow(true),
                            "ago"
                        ),
                        _react2.default.createElement(
                            "li",
                            null,
                            "lastLogin: ",
                            (0, _moment2.default)(user.lastLogin).fromNow(true)
                        ),
                        _react2.default.createElement(
                            "li",
                            null,
                            "email: ",
                            user.email
                        ),
                        _react2.default.createElement(
                            "li",
                            null,
                            "verified: ",
                            user.isVerified ? "✔" : "✘"
                        )
                    ),
                    _react2.default.createElement(
                        "h3",
                        null,
                        "Projects"
                    ),
                    _react2.default.createElement(
                        "ul",
                        null,
                        projects.map(function (project, i) {
                            return _react2.default.createElement(
                                "li",
                                { key: i },
                                _react2.default.createElement(
                                    _reactRouterDom.NavLink,
                                    {
                                        to: "/dashboard/project/" + project._id
                                    },
                                    project.title
                                )
                            );
                        })
                    )
                )
            );
        }
    }]);

    return Overview;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(Overview);
});

require.register("containers/Dashboard/Overview/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Overview = undefined;

var _Overview = require("./Overview");

var _Overview2 = _interopRequireDefault(_Overview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { Overview: _Overview2.default };
exports.Overview = _Overview2.default;
});

require.register("containers/Dashboard/ProjectView/ProjectView.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require("react-router-dom");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Dashboard = require("./../../../components/Dashboard");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectView = function (_Component) {
    _inherits(ProjectView, _Component);

    function ProjectView(props) {
        _classCallCheck(this, ProjectView);

        var _this = _possibleConstructorReturn(this, (ProjectView.__proto__ || Object.getPrototypeOf(ProjectView)).call(this, props));

        _this.state = {
            project: [],
            projectToken: ""
        };
        return _this;
    }

    _createClass(ProjectView, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            fetch("/api/Prototype/project/" + this.props.match.params.id).then(function (res) {
                return res.json();
            }).then(function (json) {
                if (json.success) {
                    _this2.setState({ project: json.project }, function () {
                        _this2.getToken();
                    });
                }
            });
        }
    }, {
        key: "createToken",
        value: function createToken(projectId) {
            var _this3 = this;

            fetch("/api/Prototype/project/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    projectId: projectId
                })
            }).then(function (res) {
                return res.json();
            }).then(function (json) {
                if (json.success) {
                    _this3.setState({ projectToken: json.data.token });
                }
            });
        }
    }, {
        key: "updateToken",
        value: function updateToken(projectId) {
            var _this4 = this;

            fetch("/api/Prototype/project/token", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    projectId: projectId
                })
            }).then(function (res) {
                return res.json();
            }).then(function (json) {
                if (json.success) {
                    _this4.getToken();
                }
            });
        }
    }, {
        key: "getToken",
        value: function getToken() {
            var _this5 = this;

            fetch("/api/Prototype/project/" + this.props.match.params.id + "/token").then(function (res) {
                return res.json();
            }).then(function (data) {
                if (data.success) {
                    console.log(data.data[0].token);
                    _this5.setState({ projectToken: data.data[0].token });
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _state = this.state,
                project = _state.project,
                projectToken = _state.projectToken;


            return _react2.default.createElement(
                "div",
                { className: "content" },
                _react2.default.createElement(
                    "ul",
                    null,
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            _reactRouterDom.NavLink,
                            { exact: true, to: "/dashboard" },
                            "Dashboard"
                        )
                    )
                ),
                _react2.default.createElement("hr", null),
                _react2.default.createElement(
                    "div",
                    null,
                    project && _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(
                            "h1",
                            null,
                            project.title,
                            " (",
                            project._id,
                            ")"
                        ),
                        _react2.default.createElement(
                            "h3",
                            null,
                            "Project Overview"
                        ),
                        _react2.default.createElement(
                            "ul",
                            null,
                            _react2.default.createElement(
                                "li",
                                null,
                                "creatorId: ",
                                project.creatorId
                            ),
                            _react2.default.createElement(
                                "li",
                                null,
                                "token:",
                                " ",
                                projectToken ? _react2.default.createElement(
                                    "span",
                                    null,
                                    projectToken,
                                    _react2.default.createElement(
                                        "button",
                                        {
                                            onClick: this.updateToken.bind(this, project._id)
                                        },
                                        "Refresh"
                                    )
                                ) : _react2.default.createElement(
                                    "button",
                                    {
                                        onClick: this.createToken.bind(this, project._id)
                                    },
                                    "createToken"
                                )
                            )
                        ),
                        _react2.default.createElement(
                            "h3",
                            null,
                            "Team"
                        ),
                        _react2.default.createElement(
                            "ul",
                            null,
                            project.team && project.team.map(function (teamMember, i) {
                                return _react2.default.createElement(
                                    "li",
                                    { key: i },
                                    teamMember
                                );
                            })
                        ),
                        _react2.default.createElement(
                            "h3",
                            null,
                            "Players"
                        ),
                        _react2.default.createElement("div", null),
                        _react2.default.createElement(
                            "h3",
                            null,
                            "Notifications"
                        ),
                        _react2.default.createElement("div", null),
                        _react2.default.createElement(
                            "h3",
                            null,
                            "MessageOfTheDay"
                        ),
                        _react2.default.createElement("div", null),
                        _react2.default.createElement(
                            "h3",
                            null,
                            "Characters"
                        ),
                        _react2.default.createElement("div", null),
                        _react2.default.createElement(
                            "h3",
                            null,
                            "Assets"
                        ),
                        _react2.default.createElement("div", null),
                        _react2.default.createElement(
                            "h3",
                            null,
                            "Translations"
                        ),
                        _react2.default.createElement("div", null)
                    )
                )
            );
        }
    }]);

    return ProjectView;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(ProjectView);

//                                 {/* {project.creatorId && (
//                                 <UserById userId={project.creatorId} />
//                             )} */}
});

;require.register("containers/Dashboard/ProjectView/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectView = undefined;

var _ProjectView = require("./ProjectView");

var _ProjectView2 = _interopRequireDefault(_ProjectView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { ProjectView: _ProjectView2.default };
exports.ProjectView = _ProjectView2.default;
});

require.register("containers/Dashboard/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectView = exports.Overview = undefined;

var _Overview = require("./Overview");

var _ProjectView = require("./ProjectView");

exports.default = { Overview: _Overview.Overview, ProjectView: _ProjectView.ProjectView };
exports.Overview = _Overview.Overview;
exports.ProjectView = _ProjectView.ProjectView;
});

require.register("containers/Page/Home/Home.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require("react-router-dom");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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
        value: function componentDidMount() {}
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "ul",
                    null,
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            _reactRouterDom.NavLink,
                            { exact: true, to: "/login" },
                            "Login"
                        )
                    ),
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            _reactRouterDom.NavLink,
                            { exact: true, to: "/register" },
                            "Register"
                        )
                    )
                ),
                _react2.default.createElement("hr", null),
                _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        "h1",
                        null,
                        "Homepage"
                    )
                )
            );
        }
    }]);

    return Home;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(Home);
});

require.register("containers/Page/Home/index.js", function(exports, require, module) {
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

require.register("containers/Page/Login/Login.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require("react-router-dom");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _storage = require("./../../../utils/storage");

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
        key: "handleInputChange",
        value: function handleInputChange(e) {
            this.setState(_defineProperty({}, e.target.name, e.target.value));
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
                "div",
                null,
                _react2.default.createElement(
                    "ul",
                    null,
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            _reactRouterDom.NavLink,
                            { exact: true, to: "/" },
                            "Home"
                        )
                    )
                ),
                _react2.default.createElement("hr", null),
                _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        "h1",
                        null,
                        "Log-In"
                    ),
                    _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement("input", {
                            type: "email",
                            name: "email",
                            value: email,
                            onChange: this.handleInputChange.bind(this),
                            placeholder: "E-mail address"
                        }),
                        _react2.default.createElement("br", null),
                        _react2.default.createElement("input", {
                            placeholder: "Password",
                            type: "password",
                            name: "password",
                            value: password,
                            onChange: this.handleInputChange.bind(this)
                        }),
                        _react2.default.createElement("br", null),
                        _react2.default.createElement(
                            "button",
                            { onClick: this.onLogin.bind(this) },
                            "Login"
                        )
                    ),
                    loginError ? _react2.default.createElement(
                        "p",
                        null,
                        loginError
                    ) : null
                )
            );
        }
    }]);

    return Login;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(Login);
});

require.register("containers/Page/Login/index.js", function(exports, require, module) {
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

require.register("containers/Page/NotFound/NotFound.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require("react-router-dom");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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
                _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        "h1",
                        null,
                        "404"
                    ),
                    _react2.default.createElement(
                        "p",
                        null,
                        "Page not found..."
                    ),
                    _react2.default.createElement(
                        _reactRouterDom.NavLink,
                        { exact: true, to: "/" },
                        "Home"
                    )
                )
            );
        }
    }]);

    return NotFound;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(NotFound);
});

require.register("containers/Page/NotFound/index.js", function(exports, require, module) {
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

require.register("containers/Page/Register/Register.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require("react-router-dom");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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
        key: "handleInputChange",
        value: function handleInputChange(e) {
            this.setState(_defineProperty({}, e.target.name, e.target.value));
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
                "div",
                null,
                _react2.default.createElement(
                    "ul",
                    null,
                    _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                            _reactRouterDom.NavLink,
                            { exact: true, to: "/" },
                            "Home"
                        )
                    )
                ),
                _react2.default.createElement("hr", null),
                _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        "h1",
                        null,
                        "Register"
                    ),
                    _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement("input", {
                            type: "email",
                            name: "email",
                            value: email,
                            onChange: this.handleInputChange.bind(this),
                            placeholder: "E-mail address"
                        }),
                        _react2.default.createElement("br", null),
                        _react2.default.createElement("input", {
                            placeholder: "Password",
                            type: "password",
                            name: "password",
                            value: password,
                            onChange: this.handleInputChange.bind(this)
                        }),
                        _react2.default.createElement("br", null),
                        _react2.default.createElement("input", {
                            placeholder: "Repeat Password",
                            type: "password",
                            name: "passwordValidation",
                            value: passwordValidation,
                            onChange: this.handleInputChange.bind(this)
                        }),
                        _react2.default.createElement("br", null),
                        _react2.default.createElement(
                            "button",
                            { onClick: this.onSignUp.bind(this) },
                            "Register"
                        )
                    ),
                    registrationSuccess ? _react2.default.createElement(
                        "p",
                        null,
                        "Registration Successful, check your emails.\xA0",
                        _react2.default.createElement(
                            _reactRouterDom.NavLink,
                            { exact: true, to: "/" },
                            "Back to Homepage"
                        )
                    ) : null,
                    signUpError ? _react2.default.createElement(
                        "p",
                        null,
                        signUpError
                    ) : null
                )
            );
        }
    }]);

    return Register;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(Register);

/*
<Form.Input
                                fluid
                                type="email"
                                icon="user"
                                iconPosition="left"
                                placeholder="E-mail address"
                                name="email"
                                value={email}
                                onChange={this.handleChange.bind(this)}
                            />
                            <Form.Input
                                fluid
                                type="password"
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={this.handleChange.bind(this)}
                            />
                            <Form.Input
                                fluid
                                type="password"
                                icon="lock"
                                iconPosition="left"
                                placeholder="Repeat Password"
                                name="passwordValidation"
                                value={passwordValidation}
                                onChange={this.handleChange.bind(this)}
                            />
                            <Button
                                color="teal"
                                fluid
                                size="large"
                                onClick={this.onSignUp.bind(this)}
                            >
                                Register
                            </Button>
*/
});

;require.register("containers/Page/Register/index.js", function(exports, require, module) {
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

require.register("containers/Page/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Register = exports.Login = exports.NotFound = exports.Home = undefined;

var _Home = require("./Home");

var _NotFound = require("./NotFound");

var _Login = require("./Login");

var _Register = require("./Register");

exports.default = { Home: _Home.Home, NotFound: _NotFound.NotFound, Login: _Login.Login, Register: _Register.Register };
exports.Home = _Home.Home;
exports.NotFound = _NotFound.NotFound;
exports.Login = _Login.Login;
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

var _Page = require("./containers/Page");

var _Dashboard = require("./containers/Dashboard");

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
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/", component: _Page.Home }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/login", component: _Page.Login }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/register", component: _Page.Register }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/dashboard", component: _Dashboard.Overview }),
            _react2.default.createElement(_reactRouterDom.Route, {
                exact: true,
                path: "/dashboard/project/:id",
                component: _Dashboard.ProjectView
            }),
            _react2.default.createElement(_reactRouterDom.Route, { component: _Page.NotFound })
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

;require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map