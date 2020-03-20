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

require.register("components/Dashboard/AssetTemplate/AssetTemplate.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require('react-router-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AssetTemplate = function (_Component) {
	_inherits(AssetTemplate, _Component);

	function AssetTemplate(props) {
		_classCallCheck(this, AssetTemplate);

		var _this = _possibleConstructorReturn(this, (AssetTemplate.__proto__ || Object.getPrototypeOf(AssetTemplate)).call(this, props));

		_this.state = {
			variables: []
		};
		return _this;
	}

	_createClass(AssetTemplate, [{
		key: 'componentDidMount',
		value: function componentDidMount() {}
	}, {
		key: 'addRow',
		value: function addRow() {
			this.setState({
				variables: [].concat(_toConsumableArray(this.state.variables), [{
					name: '',
					type: 'String'
				}])
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var variables = this.state.variables;


			console.log(variables);

			var options = [{ key: 'string', text: 'String', value: 'string' }, { key: 'bool', text: 'Bool', value: 'bool' }, { key: 'float', text: 'Float', value: 'float' }, { key: 'int', text: 'Int', value: 'int' }];

			return _react2.default.createElement(
				_semanticUiReact.Segment.Group,
				null,
				_react2.default.createElement(
					_semanticUiReact.Segment,
					null,
					_react2.default.createElement(
						_semanticUiReact.Form,
						null,
						_react2.default.createElement(
							_semanticUiReact.Form.Field,
							null,
							_react2.default.createElement(_semanticUiReact.Input, { placeholder: 'Template Name' })
						)
					)
				),
				_react2.default.createElement(
					_semanticUiReact.Segment,
					null,
					_react2.default.createElement(
						_semanticUiReact.Form,
						null,
						_react2.default.createElement(
							_semanticUiReact.Form.Field,
							null,
							_react2.default.createElement(_semanticUiReact.Input, { label: 'Number', labelPosition: 'right', readOnly: true, value: 'identifier' })
						),
						_react2.default.createElement(
							_semanticUiReact.Form.Field,
							null,
							_react2.default.createElement(_semanticUiReact.Input, { label: 'String', labelPosition: 'right', readOnly: true, value: 'name' })
						),
						variables && variables.map(function (variable, i) {
							return _react2.default.createElement(
								_semanticUiReact.Form.Field,
								{ key: i },
								_react2.default.createElement(
									_semanticUiReact.Input,
									{ type: 'text', placeholder: 'Search...', action: true },
									_react2.default.createElement('input', null),
									_react2.default.createElement(_semanticUiReact.Select, { compact: true, options: options, defaultValue: 'string' }),
									_react2.default.createElement(
										_semanticUiReact.Button,
										{ type: 'submit' },
										'\u2715'
									)
								)
							);
						}),
						_react2.default.createElement(
							_semanticUiReact.Button,
							{ fluid: true, onClick: this.addRow.bind(this) },
							'\u2795'
						),
						_react2.default.createElement('br', null),
						_react2.default.createElement(
							_semanticUiReact.Button,
							{ primary: true, fluid: true, onClick: this.addRow.bind(this) },
							'Save Template'
						)
					)
				)
			);
		}
	}]);

	return AssetTemplate;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(AssetTemplate);
});

require.register("components/Dashboard/AssetTemplate/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssetTemplate = undefined;

var _AssetTemplate = require('./AssetTemplate');

var _AssetTemplate2 = _interopRequireDefault(_AssetTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { AssetTemplate: _AssetTemplate2.default };
exports.AssetTemplate = _AssetTemplate2.default;
});

require.register("components/Dashboard/DashboardHeader/DashboardHeader.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require('react-router-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _storage = require('./../../../utils/storage');

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
			token: ''
		};
		return _this;
	}

	_createClass(DashboardHeader, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			var obj = (0, _storage.getFromStorage)('botany-bay');

			if (obj && obj.token !== '') {} else {
				this.setState({ isLoggedIn: false });
				return this.props.history.push('/login');
			}

			if (obj && obj.token) {
				var token = obj.token;

				// Verify token

				fetch('/api/Prototype/user/verify?token=' + token).then(function (res) {
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
		key: 'handleLogOut',
		value: function handleLogOut() {
			var _this3 = this;

			var obj = (0, _storage.getFromStorage)('botany-bay');

			if (obj && obj.token) {
				var token = obj.token;

				// Verify token

				fetch('/api/Prototype/user/logout?token=' + token).then(function (res) {
					return res.json();
				}).then(function (json) {
					if (json.success) {
						localStorage.removeItem('botany-bay');

						_this3.setState({
							token: ''
						}, function () {
							return _this3.props.history.push('/');
						});
					}
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				_semanticUiReact.Menu,
				{ pointing: true, secondary: true },
				_react2.default.createElement(
					_semanticUiReact.Menu.Item,
					{ onClick: this.handleLogOut.bind(this) },
					'Logout'
				)
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

require.register("components/Dashboard/MassageOfTheDayView/MassageOfTheDayView.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require('react-router-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCalendar = require('react-calendar');

var _reactCalendar2 = _interopRequireDefault(_reactCalendar);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MassageOfTheDayView = function (_Component) {
	_inherits(MassageOfTheDayView, _Component);

	function MassageOfTheDayView(props) {
		_classCallCheck(this, MassageOfTheDayView);

		var _this = _possibleConstructorReturn(this, (MassageOfTheDayView.__proto__ || Object.getPrototypeOf(MassageOfTheDayView)).call(this, props));

		_this.state = {
			activeIndex: 0,
			isLoading: true,
			messages: [],
			newMessageTitle: '',
			newMessageText: '',
			newMessageImage: '',
			newMessageDate: new Date()
		};
		return _this;
	}

	_createClass(MassageOfTheDayView, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.getMessages();
		}
	}, {
		key: 'handleInputChange',
		value: function handleInputChange(e) {
			this.setState(_defineProperty({}, e.target.name, e.target.value));
		}
	}, {
		key: 'handleDateChange',
		value: function handleDateChange(date) {
			this.setState({ newMessageDate: date });
		}
	}, {
		key: 'createNewMessage',
		value: function createNewMessage() {
			var _this2 = this;

			var _state = this.state,
			    newMessageDate = _state.newMessageDate,
			    newMessageTitle = _state.newMessageTitle,
			    newMessageText = _state.newMessageText,
			    newMessageImage = _state.newMessageImage;
			var projectId = this.props.projectId;


			fetch('/api/Prototype/project/' + projectId + '/messageOfTheDay', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					projectId: projectId,
					title: newMessageTitle,
					text: newMessageText,
					image: newMessageImage,
					date: newMessageDate
				})
			}).then(function (res) {
				return res.json();
			}).then(function (json) {
				if (json.success) {
					if (json.success) {
						_this2.setState({
							isLoading: false,
							newMessageTitle: '',
							newMessageText: '',
							newMessageImage: '',
							newMessageDate: new Date()
						}, function () {
							_this2.getMessages();
						});
					}
				} else {
					console.log(json.message);
				}
			});
		}
	}, {
		key: 'getMessages',
		value: function getMessages() {
			var _this3 = this;

			var projectId = this.props.projectId;

			fetch('/api/Prototype/project/' + projectId + '/messageOfTheDay').then(function (res) {
				return res.json();
			}).then(function (json) {
				if (json.success) {
					_this3.setState({ isLoading: false, messages: json.data, activeIndex: 0 });
				}
			});
		}
	}, {
		key: 'checkDate',
		value: function checkDate(message) {
			var startTime = Math.round(new Date(message.date[0]).getTime() / 1000);
			var endTime = Math.round(new Date(message.date[1]).getTime() / 1000);
			var currentTime = Math.round(new Date().getTime() / 1000);

			if (currentTime > startTime && currentTime < endTime || startTime <= currentTime) {
				return true;
			} else {
				return false;
			}
		}
	}, {
		key: 'handleTabChange',
		value: function handleTabChange(e, _ref) {
			var activeIndex = _ref.activeIndex;

			this.setState({ activeIndex: activeIndex });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _state2 = this.state,
			    isLoading = _state2.isLoading,
			    messages = _state2.messages,
			    newMessageDate = _state2.newMessageDate,
			    newMessageTitle = _state2.newMessageTitle,
			    newMessageText = _state2.newMessageText,
			    newMessageImage = _state2.newMessageImage,
			    activeIndex = _state2.activeIndex;


			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_semanticUiReact.Header,
					{ as: 'h3' },
					'Message Of The Day'
				),
				_react2.default.createElement(_semanticUiReact.Tab, {
					activeIndex: activeIndex,
					onTabChange: this.handleTabChange.bind(this),
					menu: { secondary: true },
					panes: [{
						menuItem: 'Messages',
						render: function render() {
							return _react2.default.createElement(
								_semanticUiReact.Tab.Pane,
								{ loading: isLoading, attached: false, basic: true },
								messages.length > 0 ? _react2.default.createElement(
									_semanticUiReact.Grid,
									null,
									messages.map(function (message, i) {
										return _react2.default.createElement(
											_semanticUiReact.Grid.Column,
											{ mobile: 16, tablet: 16, computer: 8, key: i },
											_react2.default.createElement(
												_semanticUiReact.Segment.Group,
												null,
												_react2.default.createElement(
													_semanticUiReact.Segment,
													{
														color: _this4.checkDate(message) === true ? 'green' : 'red'
													},
													message.image && _react2.default.createElement(_semanticUiReact.Image, { src: message.image }),
													_react2.default.createElement(
														_semanticUiReact.Header,
														null,
														message.title
													),
													_react2.default.createElement(
														'p',
														null,
														message.text
													)
												),
												_react2.default.createElement(
													_semanticUiReact.Segment,
													{
														inverted: true,
														color: _this4.checkDate(message) === true ? 'green' : 'red'
													},
													message.date[1] ? _react2.default.createElement(
														'span',
														null,
														'from: ',
														(0, _moment2.default)(message.date[0]).format('l'),
														' to:',
														' ',
														(0, _moment2.default)(message.date[1]).format('l')
													) : _react2.default.createElement(
														'span',
														null,
														'on: ',
														(0, _moment2.default)(message.date[0]).format('l')
													),
													_react2.default.createElement('br', null)
												)
											)
										);
									})
								) : _react2.default.createElement(_semanticUiReact.Message, { icon: 'info', info: true, content: 'No Messages yet.' })
							);
						}
					}, {
						menuItem: 'New Message',
						render: function render() {
							return _react2.default.createElement(
								_semanticUiReact.Tab.Pane,
								{ attached: false, basic: true },
								_react2.default.createElement(
									_semanticUiReact.Form,
									null,
									_react2.default.createElement(
										_semanticUiReact.Form.Field,
										null,
										_react2.default.createElement(
											'label',
											null,
											'Title'
										),
										_react2.default.createElement(_semanticUiReact.Input, {
											placeholder: 'Message Title',
											value: newMessageTitle,
											name: 'newMessageTitle',
											onChange: _this4.handleInputChange.bind(_this4)
										})
									),
									_react2.default.createElement(
										_semanticUiReact.Form.Field,
										null,
										_react2.default.createElement(
											'label',
											null,
											'Text'
										),
										_react2.default.createElement(_semanticUiReact.TextArea, {
											placeholder: 'Text',
											value: newMessageText,
											name: 'newMessageText',
											onChange: _this4.handleInputChange.bind(_this4)
										})
									),
									_react2.default.createElement(
										_semanticUiReact.Form.Field,
										null,
										_react2.default.createElement(
											'label',
											null,
											'Image URL'
										),
										_react2.default.createElement(_semanticUiReact.Input, {
											placeholder: 'Image URL',
											value: newMessageImage,
											name: 'newMessageImage',
											onChange: _this4.handleInputChange.bind(_this4)
										})
									),
									_react2.default.createElement(
										_semanticUiReact.Form.Field,
										null,
										_react2.default.createElement(
											'label',
											null,
											'Date'
										),
										_react2.default.createElement(_reactCalendar2.default, {
											minDate: new Date(),
											selectRange: true,
											onChange: _this4.handleDateChange.bind(_this4),
											value: newMessageDate
										})
									),
									_react2.default.createElement(
										_semanticUiReact.Button,
										{ onClick: _this4.createNewMessage.bind(_this4) },
										'Create Message'
									)
								)
							);
						}
					}]
				})
			);
		}
	}]);

	return MassageOfTheDayView;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(MassageOfTheDayView);
});

require.register("components/Dashboard/MassageOfTheDayView/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MassageOfTheDayView = undefined;

var _MassageOfTheDayView = require('./MassageOfTheDayView');

var _MassageOfTheDayView2 = _interopRequireDefault(_MassageOfTheDayView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { MassageOfTheDayView: _MassageOfTheDayView2.default };
exports.MassageOfTheDayView = _MassageOfTheDayView2.default;
});

require.register("components/Dashboard/PlayerView/PlayerView.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require('react-router-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlayerView = function (_Component) {
	_inherits(PlayerView, _Component);

	function PlayerView(props) {
		_classCallCheck(this, PlayerView);

		var _this = _possibleConstructorReturn(this, (PlayerView.__proto__ || Object.getPrototypeOf(PlayerView)).call(this, props));

		_this.state = {
			isInitializing: true,
			isLoading: true,
			player: []
		};
		return _this;
	}

	_createClass(PlayerView, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.intervalID = setInterval(function () {
				return _this2.getPlayerInfo();
			}, 1000);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			clearInterval(this.intervalID);
		}
	}, {
		key: 'getPlayerInfo',
		value: function getPlayerInfo() {
			var _this3 = this;

			var playerId = this.props.playerId;


			if (playerId) {
				fetch('/api/Prototype/player/' + playerId).then(function (res) {
					return res.json();
				}).then(function (json) {
					if (json.success) {
						_this3.setState({ isInitializing: false, isLoading: false, player: json.data });
					}
				});
			}
		}
	}, {
		key: 'getIfPlayerOnline',
		value: function getIfPlayerOnline() {
			var player = this.state.player;

			var lastUpdateTime = Math.round(new Date(player.lastUpdate).getTime() / 1000);
			var currentTime = Math.round(new Date().getTime() / 1000);

			if (currentTime - lastUpdateTime < 5) {
				return true;
			} else {
				return false;
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var playerId = this.props.playerId;
			var _state = this.state,
			    isInitializing = _state.isInitializing,
			    isLoading = _state.isLoading,
			    player = _state.player;


			return _react2.default.createElement(
				_semanticUiReact.Segment,
				{ loading: isLoading, color: this.getIfPlayerOnline() ? 'green' : 'red' },
				_react2.default.createElement(_semanticUiReact.Header, { as: 'h3', icon: 'user', content: player.name, subheader: player._id })
			);
		}
	}]);

	return PlayerView;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(PlayerView);
});

require.register("components/Dashboard/PlayerView/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerView = undefined;

var _PlayerView = require('./PlayerView');

var _PlayerView2 = _interopRequireDefault(_PlayerView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { PlayerView: _PlayerView2.default };
exports.PlayerView = _PlayerView2.default;
});

require.register("components/Dashboard/ProjectAssetView/ProjectAssetView.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require('react-router-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _AssetTemplate = require('../AssetTemplate/AssetTemplate');

var _AssetTemplate2 = _interopRequireDefault(_AssetTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectAssetView = function (_Component) {
	_inherits(ProjectAssetView, _Component);

	function ProjectAssetView(props) {
		_classCallCheck(this, ProjectAssetView);

		var _this = _possibleConstructorReturn(this, (ProjectAssetView.__proto__ || Object.getPrototypeOf(ProjectAssetView)).call(this, props));

		_this.state = {
			activeIndex: 0,
			newAssetName: '',
			newAssetId: '',
			isLoading: true,
			assets: {}
		};
		return _this;
	}

	_createClass(ProjectAssetView, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.getAssets();
		}
	}, {
		key: 'handleInputChange',
		value: function handleInputChange(e) {
			this.setState(_defineProperty({}, e.target.name, e.target.value));
		}
	}, {
		key: 'handleTabChange',
		value: function handleTabChange(e, _ref) {
			var activeIndex = _ref.activeIndex;

			this.setState({ activeIndex: activeIndex });
		}
	}, {
		key: 'createAsset',
		value: function createAsset() {
			var _this2 = this;

			var projectId = this.props.projectId;
			var _state = this.state,
			    newAssetName = _state.newAssetName,
			    newAssetId = _state.newAssetId;


			fetch('/api/Prototype/project/' + projectId + '/asset', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					projectId: projectId,
					name: newAssetName,
					identifier: newAssetId
				})
			}).then(function (res) {
				return res.json();
			}).then(function (json) {
				if (json.success) {
					if (json.success) {
						_this2.setState({
							newAssetName: '',
							newAssetId: ''
						}, function () {
							_this2.getAssets();
						});
					}
				} else {
					console.log(json.message);
				}
			});
		}
	}, {
		key: 'getAssets',
		value: function getAssets() {
			var _this3 = this;

			var projectId = this.props.projectId;

			fetch('/api/Prototype/project/' + projectId + '/assets').then(function (res) {
				return res.json();
			}).then(function (json) {
				if (json.success) {
					_this3.setState({ isLoading: false, assets: json.data, activeIndex: 0 });
				}
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _state2 = this.state,
			    assets = _state2.assets,
			    isLoading = _state2.isLoading,
			    activeIndex = _state2.activeIndex,
			    newAssetName = _state2.newAssetName,
			    newAssetId = _state2.newAssetId;


			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_semanticUiReact.Header,
					{ as: 'h3' },
					'Assets'
				),
				_react2.default.createElement(_semanticUiReact.Tab, {
					menu: { secondary: true },
					activeIndex: activeIndex,
					onTabChange: this.handleTabChange.bind(this),
					panes: [{
						menuItem: 'Assets',
						render: function render() {
							return _react2.default.createElement(
								_semanticUiReact.Tab.Pane,
								{ loading: isLoading, attached: false, basic: true },
								assets.length > 0 ? _react2.default.createElement(
									'div',
									null,
									assets.map(function (asset, i) {
										return _react2.default.createElement(
											'div',
											{ key: i },
											asset.identifier
										);
									})
								) : _react2.default.createElement(_semanticUiReact.Message, { icon: 'info', info: true, content: 'No Assets yet.' })
							);
						}
					}, {
						menuItem: 'Create Asset',
						render: function render() {
							return _react2.default.createElement(
								_semanticUiReact.Tab.Pane,
								{ attached: false, basic: true },
								_react2.default.createElement(
									_semanticUiReact.Form,
									null,
									_react2.default.createElement(
										_semanticUiReact.Form.Field,
										null,
										_react2.default.createElement(
											'label',
											null,
											'Name'
										),
										_react2.default.createElement(_semanticUiReact.Input, {
											placeholder: 'Asset Name',
											value: newAssetName,
											name: 'newAssetName',
											onChange: _this4.handleInputChange.bind(_this4)
										})
									),
									_react2.default.createElement(
										_semanticUiReact.Form.Field,
										null,
										_react2.default.createElement(_semanticUiReact.Input, {
											placeholder: 'Asset Identifier',
											value: newAssetId,
											name: 'newAssetId',
											onChange: _this4.handleInputChange.bind(_this4)
										})
									),
									_react2.default.createElement(
										_semanticUiReact.Button,
										{ onClick: _this4.createAsset.bind(_this4) },
										'Create Asset'
									)
								)
							);
						}
					}, {
						menuItem: 'Asset Templates',
						render: function render() {
							return _react2.default.createElement(
								_semanticUiReact.Tab.Pane,
								{ attached: false, basic: true },
								_react2.default.createElement(
									'h3',
									null,
									'Create Template'
								),
								_react2.default.createElement(_AssetTemplate2.default, null)
							);
						}
					}]
				})
			);
		}
	}]);

	return ProjectAssetView;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(ProjectAssetView);
});

require.register("components/Dashboard/ProjectAssetView/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectAssetView = undefined;

var _ProjectAssetView = require('./ProjectAssetView');

var _ProjectAssetView2 = _interopRequireDefault(_ProjectAssetView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { ProjectAssetView: _ProjectAssetView2.default };
exports.ProjectAssetView = _ProjectAssetView2.default;
});

require.register("components/Dashboard/ProjectInfoView/ProjectInfoView.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require('react-router-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectInfoView = function (_Component) {
	_inherits(ProjectInfoView, _Component);

	function ProjectInfoView(props) {
		_classCallCheck(this, ProjectInfoView);

		var _this = _possibleConstructorReturn(this, (ProjectInfoView.__proto__ || Object.getPrototypeOf(ProjectInfoView)).call(this, props));

		_this.state = {
			isLoading: true,
			project: [],
			projectToken: ''
		};
		return _this;
	}

	_createClass(ProjectInfoView, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.intervalID = setInterval(function () {
				return _this2.getProjectInfo();
			}, 1000);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			clearInterval(this.intervalID);
		}
	}, {
		key: 'getProjectInfo',
		value: function getProjectInfo() {
			var _this3 = this;

			var projectId = this.props.projectId;


			fetch('/api/Prototype/project/' + projectId).then(function (res) {
				return res.json();
			}).then(function (json) {
				if (json.success) {
					_this3.setState({ project: json.project, isLoading: false }, function () {
						_this3.getToken();
					});
				}
			});
		}
	}, {
		key: 'createToken',
		value: function createToken(projectId) {
			var _this4 = this;

			fetch('/api/Prototype/project/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					projectId: projectId
				})
			}).then(function (res) {
				return res.json();
			}).then(function (json) {
				if (json.success) {
					_this4.setState({ projectToken: json.data.token });
				}
			});
		}
	}, {
		key: 'updateToken',
		value: function updateToken(projectId) {
			var _this5 = this;

			fetch('/api/Prototype/project/token', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					projectId: projectId
				})
			}).then(function (res) {
				return res.json();
			}).then(function (json) {
				if (json.success) {
					_this5.getToken();
				}
			});
		}
	}, {
		key: 'getToken',
		value: function getToken() {
			var _this6 = this;

			fetch('/api/Prototype/project/' + this.props.match.params.id + '/token').then(function (res) {
				return res.json();
			}).then(function (data) {
				if (data.success) {
					_this6.setState({ projectToken: data.data[0].token });
				}
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _state = this.state,
			    isLoading = _state.isLoading,
			    project = _state.project,
			    projectToken = _state.projectToken;

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_semanticUiReact.Header,
					{ as: 'h3' },
					'Project Overview'
				),
				_react2.default.createElement(
					_semanticUiReact.Segment,
					{ basic: true, loading: isLoading },
					isLoading === false && _react2.default.createElement(
						_semanticUiReact.List,
						null,
						_react2.default.createElement(_semanticUiReact.List.Item, { icon: 'user', header: 'Creator', content: project.creatorId }),
						projectToken ? _react2.default.createElement(_semanticUiReact.List.Item, { icon: 'lock', header: 'Token', content: projectToken }) : _react2.default.createElement(_semanticUiReact.List.Item, {
							icon: 'lock',
							header: 'Token',
							content: _react2.default.createElement(
								_semanticUiReact.Button,
								{ onClick: this.createToken.bind(this, project._id) },
								'Create Token'
							)
						}),
						_react2.default.createElement(
							_semanticUiReact.List.Item,
							null,
							_react2.default.createElement(_semanticUiReact.List.Icon, { name: 'users' }),
							_react2.default.createElement(
								_semanticUiReact.List.Content,
								null,
								_react2.default.createElement(
									_semanticUiReact.List.Header,
									null,
									'Team'
								),
								_react2.default.createElement(
									_semanticUiReact.List.List,
									null,
									project.team && project.team.map(function (teamMember, i) {
										return _react2.default.createElement(
											_semanticUiReact.List.Item,
											{ key: i },
											teamMember
										);
									})
								)
							)
						)
					)
				)
			);
		}
	}]);

	return ProjectInfoView;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(ProjectInfoView);
});

require.register("components/Dashboard/ProjectInfoView/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectInfoView = undefined;

var _ProjectInfoView = require('./ProjectInfoView');

var _ProjectInfoView2 = _interopRequireDefault(_ProjectInfoView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { ProjectInfoView: _ProjectInfoView2.default };
exports.ProjectInfoView = _ProjectInfoView2.default;
});

require.register("components/Dashboard/ProjectPlayerView/ProjectPlayerView.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require('react-router-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _index = require('./../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectPlayerView = function (_Component) {
	_inherits(ProjectPlayerView, _Component);

	function ProjectPlayerView(props) {
		_classCallCheck(this, ProjectPlayerView);

		var _this = _possibleConstructorReturn(this, (ProjectPlayerView.__proto__ || Object.getPrototypeOf(ProjectPlayerView)).call(this, props));

		_this.state = {
			isLoading: true,
			players: []
		};
		return _this;
	}

	_createClass(ProjectPlayerView, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.intervalID = setInterval(function () {
				return _this2.getProjectInfo();
			}, 1000);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			clearInterval(this.intervalID);
		}
	}, {
		key: 'getProjectInfo',
		value: function getProjectInfo() {
			var _this3 = this;

			var projectId = this.props.projectId;


			fetch('/api/Prototype/project/' + projectId).then(function (res) {
				return res.json();
			}).then(function (json) {
				if (json.success) {
					_this3.setState({ players: json.project.players, isLoading: false }, function () {});
				}
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _state = this.state,
			    isLoading = _state.isLoading,
			    players = _state.players;

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_semanticUiReact.Header,
					{ as: 'h3' },
					'Players ',
					players && players.length > 0 ? '(' + players.length + ')' : ''
				),
				_react2.default.createElement(
					_semanticUiReact.Segment,
					{ basic: true, loading: isLoading },
					isLoading === false && _react2.default.createElement(
						'div',
						null,
						players.length > 0 ? _react2.default.createElement(
							_semanticUiReact.Grid,
							null,
							players.map(function (player, i) {
								return _react2.default.createElement(
									_semanticUiReact.Grid.Column,
									{ mobile: 16, tablet: 16, computer: 4, key: i },
									_react2.default.createElement(_index.PlayerView, { playerId: player })
								);
							})
						) : _react2.default.createElement(_semanticUiReact.Message, { icon: 'info', info: true, content: 'No Players yet.' })
					)
				)
			);
		}
	}]);

	return ProjectPlayerView;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(ProjectPlayerView);
});

require.register("components/Dashboard/ProjectPlayerView/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectPlayerView = undefined;

var _ProjectPlayerView = require('./ProjectPlayerView');

var _ProjectPlayerView2 = _interopRequireDefault(_ProjectPlayerView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { ProjectPlayerView: _ProjectPlayerView2.default };
exports.ProjectPlayerView = _ProjectPlayerView2.default;
});

require.register("components/Dashboard/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AssetTemplate = exports.ProjectAssetView = exports.MassageOfTheDayView = exports.ProjectPlayerView = exports.ProjectInfoView = exports.PlayerView = exports.DashboardHeader = undefined;

var _DashboardHeader = require('./DashboardHeader');

var _PlayerView = require('./PlayerView');

var _ProjectInfoView = require('./ProjectInfoView');

var _ProjectPlayerView = require('./ProjectPlayerView');

var _MassageOfTheDayView = require('./MassageOfTheDayView');

var _ProjectAssetView = require('./ProjectAssetView');

var _AssetTemplate = require('./AssetTemplate');

exports.default = {
	DashboardHeader: _DashboardHeader.DashboardHeader,
	PlayerView: _PlayerView.PlayerView,
	ProjectInfoView: _ProjectInfoView.ProjectInfoView,
	ProjectPlayerView: _ProjectPlayerView.ProjectPlayerView,
	MassageOfTheDayView: _MassageOfTheDayView.MassageOfTheDayView,
	ProjectAssetView: _ProjectAssetView.ProjectAssetView,
	AssetTemplate: _AssetTemplate.AssetTemplate
};
exports.DashboardHeader = _DashboardHeader.DashboardHeader;
exports.PlayerView = _PlayerView.PlayerView;
exports.ProjectInfoView = _ProjectInfoView.ProjectInfoView;
exports.ProjectPlayerView = _ProjectPlayerView.ProjectPlayerView;
exports.MassageOfTheDayView = _MassageOfTheDayView.MassageOfTheDayView;
exports.ProjectAssetView = _ProjectAssetView.ProjectAssetView;
exports.AssetTemplate = _AssetTemplate.AssetTemplate;
});

require.register("containers/Dashboard/Overview/Overview.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require('react-router-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _semanticUiReact = require('semantic-ui-react');

var _storage = require('./../../../utils/storage');

var _Dashboard = require('./../../../components/Dashboard');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Overview = function (_Component) {
	_inherits(Overview, _Component);

	function Overview(props) {
		_classCallCheck(this, Overview);

		var _this = _possibleConstructorReturn(this, (Overview.__proto__ || Object.getPrototypeOf(Overview)).call(this, props));

		_this.state = {
			isLoading: true,
			user: {},
			projects: [],
			newProjectName: ''
		};
		return _this;
	}

	_createClass(Overview, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.getUser();
		}
	}, {
		key: 'getUser',
		value: function getUser() {
			var _this2 = this;

			var obj = (0, _storage.getFromStorage)('botany-bay');

			if (obj && obj.token) {
				var token = obj.token;


				fetch('/api/Prototype/user/?id=' + token).then(function (res) {
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
		key: 'getProjects',
		value: function getProjects() {
			var _this3 = this;

			var user = this.state.user;

			fetch('/api/Prototype/' + user._id + '/projects/').then(function (res) {
				return res.json();
			}).then(function (data) {
				if (data.success) {
					_this3.setState({ projects: data.projects });
				}
			});
		}
	}, {
		key: 'createProject',
		value: function createProject() {
			var _this4 = this;

			var _state = this.state,
			    user = _state.user,
			    newProjectName = _state.newProjectName;

			fetch('/api/Prototype/project/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					creator: user._id,
					title: newProjectName
				})
			}).then(function (res) {
				return res.json();
			}).then(function (json) {
				if (json.success) {
					_this4.getProjects();
				}
			});
		}
	}, {
		key: 'handleInputChange',
		value: function handleInputChange(e) {
			this.setState(_defineProperty({}, e.target.name, e.target.value));
		}
	}, {
		key: 'render',
		value: function render() {
			var _state2 = this.state,
			    isLoading = _state2.isLoading,
			    user = _state2.user,
			    projects = _state2.projects,
			    newProjectName = _state2.newProjectName;


			return _react2.default.createElement(
				_semanticUiReact.Container,
				{ className: 'content' },
				_react2.default.createElement(_Dashboard.DashboardHeader, null),
				_react2.default.createElement(
					_semanticUiReact.Segment,
					{ basic: true, loading: isLoading },
					_react2.default.createElement(
						_semanticUiReact.Header,
						{ as: 'h2' },
						user.email,
						_react2.default.createElement(
							_semanticUiReact.Header.Subheader,
							null,
							'(',
							user._id,
							')'
						)
					),
					_react2.default.createElement(
						_semanticUiReact.Header,
						{ as: 'h3' },
						'User Informations'
					),
					_react2.default.createElement(
						_semanticUiReact.List,
						null,
						_react2.default.createElement(_semanticUiReact.List.Item, { icon: 'hashtag', header: 'ID', content: user._id }),
						_react2.default.createElement(_semanticUiReact.List.Item, {
							icon: 'calendar check outline',
							header: 'Signed Up',
							content: (0, _moment2.default)(user.signUpDate).fromNow(true) + ' ago'
						}),
						_react2.default.createElement(_semanticUiReact.List.Item, {
							icon: 'calendar alternate outline',
							header: 'Last Login',
							content: (0, _moment2.default)(user.lastLogin).fromNow(true) + ' ago'
						}),
						_react2.default.createElement(_semanticUiReact.List.Item, { icon: 'mail', header: 'E-Mail', content: user.email })
					),
					_react2.default.createElement(
						'h3',
						null,
						'Projects'
					),
					projects.length > 0 ? _react2.default.createElement(
						_semanticUiReact.Grid,
						null,
						projects.map(function (project, i) {
							return _react2.default.createElement(
								_semanticUiReact.Grid.Column,
								{ mobile: 16, tablet: 16, computer: 8, key: i },
								_react2.default.createElement(
									_semanticUiReact.Segment,
									null,
									_react2.default.createElement(
										_semanticUiReact.Header,
										{ as: _reactRouterDom.NavLink, to: '/dashboard/project/' + project._id },
										project.title,
										_react2.default.createElement(
											_semanticUiReact.Header.Subheader,
											null,
											'(',
											project._id,
											')'
										)
									)
								)
							);
						})
					) : _react2.default.createElement(_semanticUiReact.Message, { icon: 'info', info: true, content: 'No Messages yet.' }),
					_react2.default.createElement(
						'h3',
						null,
						'Create New Project'
					),
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							_semanticUiReact.Input,
							{
								type: 'text',
								name: 'newProjectName',
								value: newProjectName,
								onChange: this.handleInputChange.bind(this),
								placeholder: 'Project name...',
								action: true
							},
							_react2.default.createElement('input', null),
							_react2.default.createElement(
								_semanticUiReact.Button,
								{ onClick: this.createProject.bind(this) },
								'Create Project'
							)
						)
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
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require('react-router-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _Dashboard = require('./../../../components/Dashboard');

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
			isLoading: true,
			activeIndex: 0,
			project: [],
			projectToken: ''
		};
		return _this;
	}

	_createClass(ProjectView, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.getProjectInfo();
		}
	}, {
		key: 'getProjectInfo',
		value: function getProjectInfo() {
			var _this2 = this;

			fetch('/api/Prototype/project/' + this.props.match.params.id).then(function (res) {
				return res.json();
			}).then(function (json) {
				if (json.success) {
					_this2.setState({ project: json.project, isLoading: false }, function () {});
				}
			});
		}
	}, {
		key: 'handleTabChange',
		value: function handleTabChange(e, _ref) {
			var activeIndex = _ref.activeIndex;

			this.setState({ activeIndex: activeIndex });
		}
	}, {
		key: 'render',
		value: function render() {
			var _state = this.state,
			    isLoading = _state.isLoading,
			    project = _state.project,
			    activeIndex = _state.activeIndex;


			return _react2.default.createElement(
				_semanticUiReact.Container,
				{ className: 'content' },
				_react2.default.createElement(
					_semanticUiReact.Menu,
					{ pointing: true, secondary: true },
					_react2.default.createElement(
						_semanticUiReact.Menu.Item,
						{ as: _reactRouterDom.NavLink, exact: true, to: '/dashboard' },
						'Dashboard'
					)
				),
				_react2.default.createElement(
					_semanticUiReact.Segment,
					{ basic: true, loading: isLoading },
					_react2.default.createElement(
						_semanticUiReact.Header,
						{ as: 'h2' },
						project.title,
						_react2.default.createElement(
							_semanticUiReact.Header.Subheader,
							null,
							'(',
							project._id,
							')'
						)
					),
					isLoading === false && _react2.default.createElement(_semanticUiReact.Tab, {
						onTabChange: this.handleTabChange.bind(this),
						activeIndex: activeIndex,
						menu: { secondary: true },
						panes: [{
							menuItem: 'Overview',
							render: function render() {
								return _react2.default.createElement(
									_semanticUiReact.Tab.Pane,
									{ attached: false, basic: true },
									_react2.default.createElement(_Dashboard.ProjectInfoView, { projectId: project._id })
								);
							}
						}, {
							menuItem: 'Players',
							render: function render() {
								return _react2.default.createElement(
									_semanticUiReact.Tab.Pane,
									{ attached: false, basic: true },
									_react2.default.createElement(_Dashboard.ProjectPlayerView, { projectId: project._id })
								);
							}
						}, {
							menuItem: 'Message Of The Day',
							render: function render() {
								return _react2.default.createElement(
									_semanticUiReact.Tab.Pane,
									{ attached: false, basic: true },
									_react2.default.createElement(_Dashboard.MassageOfTheDayView, { projectId: project._id })
								);
							}
						}, {
							menuItem: 'Assets',
							render: function render() {
								return _react2.default.createElement(
									_semanticUiReact.Tab.Pane,
									{ attached: false, basic: true },
									_react2.default.createElement(_Dashboard.ProjectAssetView, { projectId: project._id })
								);
							}
						}, {
							menuItem: 'Settings',
							render: function render() {
								return _react2.default.createElement(
									_semanticUiReact.Tab.Pane,
									{ attached: false, basic: true },
									_react2.default.createElement(
										'p',
										null,
										'Settings...'
									)
								);
							}
						}]
					})
				)
			);
		}
	}]);

	return ProjectView;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(ProjectView);
});

require.register("containers/Dashboard/ProjectView/index.js", function(exports, require, module) {
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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectView = exports.Overview = undefined;

var _Overview = require('./Overview');

var _ProjectView = require('./ProjectView');

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
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = require('react-router-dom');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _Page = require('./containers/Page');

var _Dashboard = require('./containers/Dashboard');

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
			_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _Page.Home }),
			_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/login', component: _Page.Login }),
			_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/register', component: _Page.Register }),
			_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/dashboard', component: _Dashboard.Overview }),
			_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/dashboard/project/:id', component: _Dashboard.ProjectView }),
			_react2.default.createElement(_reactRouterDom.Route, { component: _Page.NotFound })
		)
	)
), document.querySelector('#root'));
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