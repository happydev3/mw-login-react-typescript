function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactIntl = require('react-intl');
var reactRouterDom = require('react-router-dom');
var mwUi = require('@mw-kit/mw-ui');
var styled = _interopDefault(require('styled-components'));
var reactHookForm = require('react-hook-form');
var axios = _interopDefault(require('axios'));
var yup = require('yup');
var resolvers = require('@hookform/resolvers');

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

var logo = require("./logo~rQOXgtwE.svg");

function _templateObject4() {
  var data = _taggedTemplateLiteralLoose(["\n  display: flex;\n  justify-content: center;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  height: 100%;\n  & > p {\n    font-size: 16px;\n    padding: 0 1rem;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  background-size: cover;\n  background-image: url('", "');\n  &::before {\n    content: '';\n    background-color: rgba(52, 85, 171, 0.9);\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    z-index: 0;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var Wrapper = styled(mwUi.Grid.Column)(_templateObject(), function (props) {
  return props.background;
});
var Overlay = styled.div(_templateObject2());
var Content = styled.div(_templateObject3());
var Footer = styled.div(_templateObject4());
var Banner = function Banner(props) {
  return React.createElement(Wrapper, {
    background: props.background,
    color: 'blue'
  }, React.createElement(Overlay, null, React.createElement("div", null, React.createElement(mwUi.Image, {
    src: props.logo ? props.logo : logo,
    height: 45
  })), React.createElement(Content, null, React.createElement(mwUi.Header, {
    size: 'huge',
    inverted: true,
    content: props.title
  }), React.createElement("p", null, props.description)), React.createElement(Footer, null, props.footer)));
};
Banner.defaultProps = {
  background: 'https://iconesmw.s3-sa-east-1.amazonaws.com/trade_result/login/Background_Login.jpg'
};

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

// Asynchronously await a promise and pass the result to a finally continuation
function _finallyRethrows(body, finalizer) {
	try {
		var result = body();
	} catch (e) {
		return finalizer(true, e);
	}
	if (result && result.then) {
		return result.then(finalizer.bind(null, false), finalizer.bind(null, true));
	}
	return finalizer(false, result);
}

var cancel = "Cancelar";
var confirm = "Confirmar";
var ptBR = {
	"alerts.forgot.header": "Código enviado",
	"alerts.forgot.content": "Enviamos um código de verificação no seu e-mail.",
	"alerts.network.header": "Rede não Permitida",
	"alerts.network.content": "Você esta tentando logar em uma rede sem permissão. Por favor, entre em contato com seu responsável.",
	"alerts.session.header": "Sessão em Andamento",
	"alerts.session.content": "Existe outra sessão em andamento com esse usuário, se você continuar a sessão será encerrada. Deseja encerrar a outra sessão?",
	"alerts.time.header": "Horário de Acesso",
	"alerts.time.content": "Você está tentando logar fora do horário permitido. Por favor, entre em contato com o seu responsável.",
	"code.header.main": "Redefinir senha",
	"code.header.subheader": "Digite o código no campo abaixo",
	"code.button.submit": "Confirmar",
	"code.placeholder.code": "Digite o Código",
	"code.not_received": "Não recebeu o código?",
	"code.resend": "Enviar novamente",
	"recover.header.main": "Redefinir senha",
	"recover.button.submit": "Redefinir",
	"recover.placeholder.password": "Digite uma senha",
	"recover.placeholder.password_confirm": "Digite uma senha",
	"login.button.submit": "Enviar",
	"login.header.main": "Dados de Acesso",
	"login.label.account": "Contratante",
	"login.label.username": "Usuário",
	"login.label.password": "Senha",
	"login.label.remember": "Lembrar-me",
	"login.placeholder.account": "Digite o ID contratante",
	"login.placeholder.username": "Digite seu usuário",
	"login.placeholder.password": "Digite sua senha",
	"login.forgot": "Esqueceu sua senha?",
	"terms.header": "Política de Privacidade e Termos de Uso",
	"terms.accept": "Aceito a política de privacidade e termos de uso",
	"generic.back": "Voltar",
	cancel: cancel,
	confirm: confirm,
	"generic.continue": "Continuar"
};

var api = axios.create({
  baseURL: 'https://api.xpto.ninja',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
api.interceptors.request.use(function (config) {
  try {
    var tokenKey = 'MwLoginToken';
    var url = config.url;
    var language = localStorage.getItem('_LOCALE') || 'pt_BR';
    config.headers['Accept-Language'] = language.replace('_', '-');

    if (url === 'v1/users/token') {
      sessionStorage.removeItem(tokenKey);
      return Promise.resolve(config);
    }

    var token = sessionStorage.getItem(tokenKey);

    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    return Promise.resolve(config);
  } catch (e) {
    return Promise.reject(e);
  }
});

function postUsersCheckCode(data) {
  return api.post('v1/users/check-code', data);
}

function getToken(data) {
  return api.post('v1/users/token', data);
}
function postUsersRecover(data) {
  return api.post('v1/users/recover', data);
}

var Code = function Code() {
  var _useState = React.useState(false),
      loading = _useState[0],
      setLoading = _useState[1];

  var _useState2 = React.useState(''),
      message = _useState2[0],
      setMessage = _useState2[1];

  var params = reactRouterDom.useParams();
  var history = reactRouterDom.useHistory();
  var intl = reactIntl.useIntl();

  var _useForm = reactHookForm.useForm({
    mode: 'onChange',
    defaultValues: {
      account: params.account,
      code: params.hash === 'default' ? '' : params.hash
    }
  }),
      control = _useForm.control,
      formState = _useForm.formState,
      handleSubmit = _useForm.handleSubmit,
      register = _useForm.register;

  var isValid = formState.isValid;

  var resend = function resend() {
    try {
      var account = params.account || '';
      var username = params.username || '';
      setLoading(true);
      setMessage('');

      var _temp2 = _finallyRethrows(function () {
        return _catch(function () {
          return Promise.resolve(postUsersRecover({
            account: account,
            username: username
          })).then(function (res) {
            console.log(res);
          });
        }, function (error) {
          console.log(error);
        });
      }, function (_wasThrown, _result) {
        setLoading(false);
        if (_wasThrown) throw _result;
        return _result;
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var onSubmit = function onSubmit(data) {
    try {
      var _temp4 = _catch(function () {
        setMessage('');
        return Promise.resolve(postUsersCheckCode(data)).then(function (res) {
          var d = res.data.data || {};
          var token = d.token || '';
          var userId = d.extra.users.id || 0;
          sessionStorage.setItem('MwLoginToken', token);
          history.push("/recover/" + data.account + "/" + userId);
        });
      }, function (error) {
        var _error$response, _error$response$data;

        var res = (_error$response = error.response) === null || _error$response === void 0 ? void 0 : (_error$response$data = _error$response.data) === null || _error$response$data === void 0 ? void 0 : _error$response$data.data;

        if (res) {
          setMessage(res.message);
        }
      });

      return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return React__default.createElement(React__default.Fragment, null, React__default.createElement(mwUi.Grid, {
    centered: true
  }, React__default.createElement(mwUi.Grid.Column, {
    width: 8,
    textAlign: 'left',
    verticalAlign: 'middle'
  }, React__default.createElement(mwUi.Header, {
    size: 'large'
  }, React__default.createElement(reactIntl.FormattedMessage, {
    id: 'code.header.main',
    defaultMessage: ptBR['code.header.main']
  }), React__default.createElement(mwUi.Header.Subheader, null, React__default.createElement(reactIntl.FormattedMessage, {
    id: 'code.header.subheader',
    defaultMessage: ptBR['code.header.subheader']
  }))), React__default.createElement("br", null), message && React__default.createElement(mwUi.Message, {
    negative: true,
    content: message
  }), React__default.createElement("br", null), React__default.createElement(mwUi.Form, {
    onSubmit: handleSubmit(onSubmit),
    loading: formState.isSubmitting || loading
  }, React__default.createElement("input", {
    name: 'account',
    type: 'hidden',
    ref: register
  }), React__default.createElement(mwUi.Form.Field, null, React__default.createElement(reactHookForm.Controller, {
    as: mwUi.Input,
    name: 'code',
    control: control,
    rules: {
      required: true
    },
    placeholder: intl.formatMessage({
      id: 'code.placeholder.code',
      defaultMessage: ptBR['code.placeholder.code']
    }),
    autoFocus: true
  })), React__default.createElement(mwUi.Button, {
    disabled: !isValid,
    primary: true,
    type: 'submit',
    fluid: true,
    content: intl.formatMessage({
      id: 'code.button.submit',
      defaultMessage: ptBR['code.button.submit']
    })
  }), React__default.createElement(mwUi.Segment, {
    basic: true,
    textAlign: 'center'
  }, React__default.createElement(reactIntl.FormattedMessage, {
    id: 'code.not_received',
    defaultMessage: ptBR['code.not_received']
  }), ' ', React__default.createElement("a", {
    href: '#',
    onClick: resend
  }, React__default.createElement(reactIntl.FormattedMessage, {
    id: 'code.resend',
    defaultMessage: ptBR['code.resend']
  })))))));
};

var AlertsForgot = function AlertsForgot(props) {
  var intl = reactIntl.useIntl();
  var header = intl.formatMessage({
    id: 'alerts.forgot.header',
    defaultMessage: ptBR['alerts.forgot.header']
  });
  var content = intl.formatMessage({
    id: 'alerts.forgot.content',
    defaultMessage: ptBR['alerts.forgot.content']
  });
  return React__default.createElement(mwUi.Confirm, {
    open: props.open,
    size: 'tiny',
    onConfirm: props.onConfirm,
    header: header,
    content: content,
    cancelButton: React__default.createElement(React__default.Fragment, null),
    confirmButton: React__default.createElement(mwUi.Button, {
      content: 'Ok'
    })
  });
};

var AlertsNetwork = function AlertsNetwork(props) {
  var intl = reactIntl.useIntl();
  var header = intl.formatMessage({
    id: 'alerts.network.header',
    defaultMessage: ptBR['alerts.network.header']
  });
  var content = intl.formatMessage({
    id: 'alerts.network.content',
    defaultMessage: ptBR['alerts.network.content']
  });
  return React__default.createElement(mwUi.Confirm, {
    open: props.open,
    size: 'tiny',
    onConfirm: props.onConfirm,
    header: header,
    content: content,
    cancelButton: React__default.createElement(React__default.Fragment, null),
    confirmButton: React__default.createElement(mwUi.Button, {
      negative: true,
      content: 'Ok'
    })
  });
};

var AlertsTime = function AlertsTime(props) {
  var intl = reactIntl.useIntl();
  var header = intl.formatMessage({
    id: 'alerts.time.header',
    defaultMessage: ptBR['alerts.time.header']
  });
  var content = intl.formatMessage({
    id: 'alerts.time.content',
    defaultMessage: ptBR['alerts.time.content']
  });
  return React__default.createElement(mwUi.Confirm, {
    open: props.open,
    size: 'tiny',
    onConfirm: props.onConfirm,
    header: header,
    content: content,
    cancelButton: React__default.createElement(React__default.Fragment, null),
    confirmButton: React__default.createElement(mwUi.Button, {
      negative: true,
      content: 'Ok'
    })
  });
};

var AlertsSession = function AlertsSession(props) {
  var intl = reactIntl.useIntl();
  var header = intl.formatMessage({
    id: 'alerts.session.header',
    defaultMessage: ptBR['alerts.session.header']
  });
  var content = intl.formatMessage({
    id: 'alerts.session.content',
    defaultMessage: ptBR['alerts.session.content']
  });
  return React__default.createElement(mwUi.Confirm, {
    open: props.open,
    size: 'tiny',
    onCancel: props.onCancel,
    onConfirm: props.onConfirm,
    header: header,
    content: content,
    cancelButton: intl.formatMessage({
      id: 'cancel',
      defaultMessage: ptBR.cancel
    }),
    confirmButton: intl.formatMessage({
      id: 'confirm',
      defaultMessage: ptBR.confirm
    })
  });
};

function getTerm(data) {
  return api.get("v1/terms/" + data.id);
}
function postTermsAccept(id) {
  return api.post("v1/terms/accept/" + id);
}

function _templateObject$1() {
  var data = _taggedTemplateLiteralLoose(["\n  display: flex;\n  align-items: center;\n  & > div:first-child {\n    text-align: left;\n    flex-grow: 1;\n  }\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}

var FakeTerms = function FakeTerms() {
  return React__default.createElement(mwUi.Placeholder, {
    fluid: true
  }, React__default.createElement(mwUi.Placeholder.Paragraph, null, React__default.createElement(mwUi.Placeholder.Line, null), React__default.createElement(mwUi.Placeholder.Line, null), React__default.createElement(mwUi.Placeholder.Line, null)), React__default.createElement(mwUi.Placeholder.Paragraph, null, React__default.createElement(mwUi.Placeholder.Line, null), React__default.createElement(mwUi.Placeholder.Line, null), React__default.createElement(mwUi.Placeholder.Line, null), React__default.createElement(mwUi.Placeholder.Line, null)), React__default.createElement(mwUi.Placeholder.Paragraph, null, React__default.createElement(mwUi.Placeholder.Line, null), React__default.createElement(mwUi.Placeholder.Line, null), React__default.createElement(mwUi.Placeholder.Line, null), React__default.createElement(mwUi.Placeholder.Line, null)));
};

var WrapperModalActions = styled(mwUi.Modal.Actions)(_templateObject$1());
var Terms = function Terms(props) {
  var _useState = React.useState(false),
      saving = _useState[0],
      setSaving = _useState[1];

  var _useState2 = React.useState(false),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = React.useState(false),
      accept = _useState3[0],
      setAccept = _useState3[1];

  var _useState4 = React.useState({
    id: '',
    content: ''
  }),
      term = _useState4[0],
      setTerm = _useState4[1];

  var intl = reactIntl.useIntl();
  var termId = props.term.id;
  React.useEffect(function () {
    var getData = function getData() {
      try {
        setLoading(true);

        var _temp2 = _finallyRethrows(function () {
          return _catch(function () {
            return Promise.resolve(getTerm(props.term)).then(function (res) {
              setTerm(res.data.data);
            });
          }, function (error) {
            console.log('error', error);
          });
        }, function (_wasThrown, _result) {
          setLoading(false);
          if (_wasThrown) throw _result;
          return _result;
        });

        return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    };

    if (!termId) {
      return;
    }

    getData();
  }, [termId]);

  var handleAccept = function handleAccept() {
    try {
      var _temp4 = _finallyRethrows(function () {
        return _catch(function () {
          setSaving(true);
          return Promise.resolve(postTermsAccept(termId)).then(function (res) {
            props.onSuccess(res.data);
          });
        }, function (error) {
          console.log(error);
        });
      }, function (_wasThrown2, _result2) {
        setSaving(false);
        if (_wasThrown2) throw _result2;
        return _result2;
      });

      return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return React__default.createElement(mwUi.Modal, {
    open: props.open,
    size: 'small'
  }, React__default.createElement(mwUi.Header, null, React__default.createElement(reactIntl.FormattedMessage, {
    id: 'terms.header',
    defaultMessage: ptBR['terms.header']
  })), React__default.createElement(mwUi.Modal.Content, {
    scrolling: true
  }, loading ? React__default.createElement(FakeTerms, null) : React__default.createElement("p", {
    dangerouslySetInnerHTML: {
      __html: term.content
    }
  })), React__default.createElement(WrapperModalActions, null, React__default.createElement(mwUi.Checkbox, {
    checked: accept,
    label: intl.formatMessage({
      id: 'terms.accept',
      defaultMessage: ptBR['terms.accept']
    }),
    onChange: function onChange(e, _ref) {
      var checked = _ref.checked;
      setAccept(checked);
    }
  }), React__default.createElement("div", null, React__default.createElement(mwUi.Button, {
    basic: true,
    onClick: function onClick() {
      return props.onCancel();
    },
    content: intl.formatMessage({
      id: 'generic.back',
      defaultMessage: ptBR['generic.back']
    })
  }), React__default.createElement(mwUi.Button, {
    disabled: !accept || saving,
    primary: true,
    onClick: handleAccept,
    loading: saving,
    content: intl.formatMessage({
      id: 'generic.continue',
      defaultMessage: ptBR['generic.continue']
    })
  }))));
};

function _templateObject$2() {
  var data = _taggedTemplateLiteralLoose(["\n  position: absolute;\n  right: 0;\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var WrapperForgot = styled(mwUi.Form.Field)(_templateObject$2());
var Login = function Login(props) {
  var mwLogin = JSON.parse(localStorage.getItem('MwLogin') || '{}');
  var mwLoginRemember = !!mwLogin.account;

  var _useState = React.useState(false),
      showPassword = _useState[0],
      toggleShowPassword = _useState[1];

  var _useState2 = React.useState(false),
      showFailSession = _useState2[0],
      setShowFailSession = _useState2[1];

  var _useState3 = React.useState(false),
      showFailNetwork = _useState3[0],
      setShowFailNetwork = _useState3[1];

  var _useState4 = React.useState(false),
      showFailTime = _useState4[0],
      setShowFailTime = _useState4[1];

  var _useState5 = React.useState(false),
      showFailTerms = _useState5[0],
      setShowFailTerms = _useState5[1];

  var _useState6 = React.useState(false),
      showAlertForgot = _useState6[0],
      setShowAlertForgot = _useState6[1];

  var _useState7 = React.useState(false),
      loading = _useState7[0],
      setLoading = _useState7[1];

  var _useState8 = React.useState(''),
      account = _useState8[0],
      setAccount = _useState8[1];

  var _useState9 = React.useState(''),
      username = _useState9[0],
      setUsername = _useState9[1];

  var _useState10 = React.useState(mwLoginRemember),
      remember = _useState10[0],
      setRemember = _useState10[1];

  var _useState11 = React.useState(''),
      message = _useState11[0],
      setMessage = _useState11[1];

  var _useState12 = React.useState(0),
      termId = _useState12[0],
      setTermId = _useState12[1];

  var loginSchema = yup.object().shape({
    account: yup.number().required().positive().integer(),
    username: yup.string().required(),
    password: yup.string().required(),
    force: yup.number(),
    fail: yup.string()
  });

  var _useForm = reactHookForm.useForm({
    mode: 'onChange',
    defaultValues: {
      account: mwLogin.account || '',
      username: mwLogin.username || '',
      password: '',
      force: 0,
      fail: ''
    },
    resolver: resolvers.yupResolver(loginSchema)
  }),
      control = _useForm.control,
      handleSubmit = _useForm.handleSubmit,
      register = _useForm.register,
      formState = _useForm.formState,
      setValue = _useForm.setValue,
      getValues = _useForm.getValues,
      errors = _useForm.errors;

  var refLoginForm = React.useRef(null);
  var history = reactRouterDom.useHistory();
  var intl = reactIntl.useIntl();
  var isValid = formState.isValid;

  var handleSuccess = function handleSuccess(user) {
    props.onSuccess(user);
    alert('success!');
  };

  var handleForgot = function handleForgot() {
    try {
      var values = getValues();

      if (errors.account || errors.username) {
        setMessage('dados invalidos');
        return Promise.resolve();
      }

      setLoading(true);
      setMessage('');

      var _temp2 = _finallyRethrows(function () {
        return _catch(function () {
          return Promise.resolve(postUsersRecover(values)).then(function () {
            setAccount(values.account);
            setUsername(values.username);
            setShowAlertForgot(true);
          });
        }, function (error) {
          console.log(error);
        });
      }, function (_wasThrown, _result) {
        setLoading(false);
        if (_wasThrown) throw _result;
        return _result;
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var onSubmit = function onSubmit(data) {
    try {
      if (remember) {
        localStorage.setItem('MwLogin', JSON.stringify({
          account: data.account,
          username: data.username
        }));
      } else {
        localStorage.removeItem('MwLogin');
      }

      var _temp4 = _catch(function () {
        setMessage('');
        return Promise.resolve(getToken(data)).then(function (res) {
          var token = res.data.data.token || '';
          var fail = res.data.data.fail || '';
          var extra = res.data.data.extra || {};

          if (token && fail === '') {
            handleSuccess(res.data);
          } else if (fail === 'terms') {
            var _extra$terms;

            sessionStorage.setItem('MwLoginToken', token);
            setTermId((_extra$terms = extra.terms) === null || _extra$terms === void 0 ? void 0 : _extra$terms.id);
            setShowFailTerms(true);
          } else if (fail === 'session') {
            setShowFailSession(true);
          } else if (fail === 'network') {
            setShowFailNetwork(true);
          } else if (fail === 'time') {
            setShowFailTime(true);
          }
        });
      }, function (error) {
        var _error$response, _error$response$data;

        var res = (_error$response = error.response) === null || _error$response === void 0 ? void 0 : (_error$response$data = _error$response.data) === null || _error$response$data === void 0 ? void 0 : _error$response$data.data;

        if (res) {
          setMessage(res.message);
        }
      });

      return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return React__default.createElement(React__default.Fragment, null, React__default.createElement(AlertsForgot, {
    open: showAlertForgot,
    onConfirm: function onConfirm() {
      history.push("/code/" + account + "/" + username + "/default");
    }
  }), React__default.createElement(AlertsNetwork, {
    open: showFailNetwork,
    onConfirm: function onConfirm() {
      return setShowFailNetwork(false);
    }
  }), React__default.createElement(AlertsSession, {
    open: showFailSession,
    onCancel: function onCancel() {
      return setShowFailSession(false);
    },
    onConfirm: function onConfirm() {
      var _refLoginForm$current;

      setValue('force', 1);
      setShowFailSession(false);
      refLoginForm === null || refLoginForm === void 0 ? void 0 : (_refLoginForm$current = refLoginForm.current) === null || _refLoginForm$current === void 0 ? void 0 : _refLoginForm$current.handleSubmit();
    }
  }), React__default.createElement(AlertsTime, {
    open: showFailTime,
    onConfirm: function onConfirm() {
      return setShowFailTime(false);
    }
  }), React__default.createElement(Terms, {
    open: showFailTerms,
    term: {
      id: termId
    },
    onCancel: function onCancel() {
      return setShowFailTerms(false);
    },
    onSuccess: function onSuccess(data) {
      setShowFailTerms(false);
      handleSuccess(data);
    }
  }), React__default.createElement(mwUi.Grid, {
    centered: true
  }, React__default.createElement(mwUi.Grid.Column, {
    width: 8,
    textAlign: 'left',
    verticalAlign: 'middle'
  }, React__default.createElement(mwUi.Header, {
    size: 'large'
  }, React__default.createElement(reactIntl.FormattedMessage, {
    id: 'login.header.main',
    defaultMessage: ptBR['login.header.main']
  })), React__default.createElement("br", null), message && React__default.createElement(mwUi.Message, {
    negative: true,
    content: message
  }), React__default.createElement("br", null), React__default.createElement(mwUi.Form, {
    ref: refLoginForm,
    onSubmit: handleSubmit(onSubmit),
    loading: formState.isSubmitting || loading
  }, React__default.createElement("input", {
    name: 'force',
    type: 'hidden',
    ref: register
  }), React__default.createElement("input", {
    name: 'fail',
    type: 'hidden',
    ref: register
  }), React__default.createElement(mwUi.Form.Field, null, React__default.createElement("label", null, React__default.createElement(reactIntl.FormattedMessage, {
    id: 'login.label.account',
    defaultMessage: ptBR['login.label.account']
  })), React__default.createElement(reactHookForm.Controller, {
    as: mwUi.Input,
    name: 'account',
    control: control,
    placeholder: intl.formatMessage({
      id: 'login.placeholder.account',
      defaultMessage: ptBR['login.placeholder.account']
    }),
    autoFocus: true
  })), React__default.createElement(mwUi.Form.Field, null, React__default.createElement("label", null, React__default.createElement(reactIntl.FormattedMessage, {
    id: 'login.label.username',
    defaultMessage: ptBR['login.label.username']
  })), React__default.createElement(reactHookForm.Controller, {
    as: mwUi.Input,
    name: 'username',
    control: control,
    placeholder: intl.formatMessage({
      id: 'login.placeholder.username',
      defaultMessage: ptBR['login.placeholder.username']
    })
  })), React__default.createElement(mwUi.Form.Field, null, React__default.createElement("label", null, React__default.createElement(reactIntl.FormattedMessage, {
    id: 'login.label.password',
    defaultMessage: ptBR['login.label.password']
  })), React__default.createElement(reactHookForm.Controller, {
    as: mwUi.Input,
    name: 'password',
    type: showPassword ? 'text' : 'password',
    control: control,
    icon: {
      name: "eye" + (showPassword ? ' slash' : ''),
      link: true,
      onClick: function onClick() {
        return toggleShowPassword(!showPassword);
      }
    },
    placeholder: intl.formatMessage({
      id: 'login.placeholder.password',
      defaultMessage: ptBR['login.placeholder.password']
    })
  })), React__default.createElement(mwUi.Form.Group, null, React__default.createElement(mwUi.Form.Field, null, React__default.createElement(mwUi.Checkbox, {
    name: 'remember',
    label: intl.formatMessage({
      id: 'login.label.remember',
      defaultMessage: ptBR['login.label.remember']
    }),
    checked: remember,
    onChange: function onChange() {
      return setRemember(!remember);
    },
    ref: register
  })), React__default.createElement(WrapperForgot, null, React__default.createElement("a", {
    href: '#',
    onClick: handleForgot
  }, React__default.createElement(reactIntl.FormattedMessage, {
    id: 'login.forgot',
    defaultMessage: ptBR['login.forgot']
  })))), React__default.createElement(mwUi.Button, {
    disabled: !isValid,
    primary: true,
    type: 'submit',
    fluid: true
  }, React__default.createElement(reactIntl.FormattedMessage, {
    id: 'login.button.submit',
    defaultMessage: ptBR['login.button.submit']
  }))))));
};

function putUsersPassword(data) {
  return api.put("v1/users/" + data.id, data);
}

var Recover = function Recover() {
  var _useState = React.useState(''),
      message = _useState[0],
      setMessage = _useState[1];

  var params = reactRouterDom.useParams();
  var history = reactRouterDom.useHistory();
  var intl = reactIntl.useIntl();
  var RecoverSchema = yup.object().shape({
    id: yup.number().required().positive().integer(),
    password: yup.string().required(),
    password_confirm: yup.string().required().equals([yup.ref('password')])
  });

  var _useForm = reactHookForm.useForm({
    mode: 'onChange',
    defaultValues: {
      id: params.id,
      password: '',
      password_confirm: ''
    },
    resolver: resolvers.yupResolver(RecoverSchema)
  }),
      control = _useForm.control,
      formState = _useForm.formState,
      handleSubmit = _useForm.handleSubmit,
      register = _useForm.register;

  var isValid = formState.isValid;

  var onSubmit = function onSubmit(data) {
    try {
      var _temp2 = _catch(function () {
        setMessage('');
        return Promise.resolve(putUsersPassword(data)).then(function () {
          history.push('/');
        });
      }, function (error) {
        var _error$response, _error$response$data;

        var res = (_error$response = error.response) === null || _error$response === void 0 ? void 0 : (_error$response$data = _error$response.data) === null || _error$response$data === void 0 ? void 0 : _error$response$data.data;

        if (res) {
          setMessage(res.message);
        }
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return React__default.createElement(React__default.Fragment, null, React__default.createElement(mwUi.Grid, {
    centered: true
  }, React__default.createElement(mwUi.Grid.Column, {
    width: 8,
    textAlign: 'left',
    verticalAlign: 'middle'
  }, React__default.createElement(mwUi.Header, {
    size: 'large'
  }, React__default.createElement(reactIntl.FormattedMessage, {
    id: 'recover.header.main',
    defaultMessage: ptBR['recover.header.main']
  })), React__default.createElement("br", null), message && React__default.createElement(mwUi.Message, {
    negative: true,
    content: message
  }), React__default.createElement("br", null), React__default.createElement(mwUi.Form, {
    onSubmit: handleSubmit(onSubmit),
    loading: formState.isSubmitting
  }, React__default.createElement("input", {
    name: 'id',
    type: 'hidden',
    ref: register
  }), React__default.createElement(mwUi.Form.Field, null, React__default.createElement("label", null, "Nova senha"), React__default.createElement(reactHookForm.Controller, {
    as: mwUi.Input,
    type: 'password',
    name: 'password',
    control: control,
    rules: {
      required: true
    },
    placeholder: intl.formatMessage({
      id: 'recover.placeholder.password',
      defaultMessage: ptBR['recover.placeholder.password']
    }),
    autoFocus: true
  })), React__default.createElement(mwUi.Form.Field, null, React__default.createElement("label", null, "Repetir senha"), React__default.createElement(reactHookForm.Controller, {
    as: mwUi.Input,
    type: 'password',
    name: 'password_confirm',
    control: control,
    rules: {
      required: true
    },
    placeholder: intl.formatMessage({
      id: 'recover.placeholder.password_confirm',
      defaultMessage: ptBR['recover.placeholder.password_confirm']
    })
  })), React__default.createElement(mwUi.Button, {
    disabled: !isValid,
    primary: true,
    type: 'submit',
    fluid: true,
    content: intl.formatMessage({
      id: 'recover.button.submit',
      defaultMessage: ptBR['recover.button.submit']
    })
  })))));
};

var cancel$1 = "Cancel";
var confirm$1 = "Confirm";
var enUS = {
	"alerts.forgot.header": "Code sent.",
	"alerts.forgot.content": "We sent a verification code to your email.",
	"alerts.network.header": "Not Permitted",
	"alerts.network.content": "You are trying to log in to a network without permission. Please contact your manager.",
	"alerts.session.header": "Ongoing Session",
	"alerts.session.content": "There is another session in progress with that user, if you continue the session will be ended. Do you want to end the other session?",
	"alerts.time.header": "Access time:",
	"alerts.time.content": "You are trying to log in outside the allowed hours. Please contact your manager.",
	"code.header.main": "Reset password",
	"code.header.subheader": "Enter the code in the field below",
	"code.button.submit": "Confirm",
	"code.placeholder.code": "Enter code",
	"code.not_received": "Didn't receive the code?",
	"code.resend": "Send again",
	"recover.header.main": "Reset password",
	"recover.button.submit": "Reset",
	"recover.placeholder.password": "Enter password",
	"recover.placeholder.password_confirm": "Enter password",
	"login.button.submit": "Send",
	"login.header.main": "Access data",
	"login.label.account": "Contracting party",
	"login.label.username": "User",
	"login.label.password": "Password",
	"login.label.remember": "Remember me",
	"login.placeholder.account": "Enter contracting ID",
	"login.placeholder.username": "Enter your username",
	"login.placeholder.password": "Enter your password",
	"login.forgot": "Forgot your password?",
	"terms.header": "Privacy Policy & Terms",
	"terms.accept": "I accept the privacy policy and terms of use",
	"generic.back": "Back",
	cancel: cancel$1,
	confirm: confirm$1,
	"generic.continue": "Continue"
};

function _templateObject$3() {
  var data = _taggedTemplateLiteralLoose(["\n  margin: 0 !important;\n  height: 100%;\n"]);

  _templateObject$3 = function _templateObject() {
    return data;
  };

  return data;
}

if (!localStorage.hasOwnProperty('_LOCALE')) {
  localStorage.setItem('_LOCALE', navigator.language.replace('-', '_'));
}

var localeLocal = localStorage.getItem('_LOCALE') || 'pt_BR';
var Container = styled(mwUi.Grid)(_templateObject$3());
var Context = React.createContext({});

function _templateObject$4() {
  var data = _taggedTemplateLiteralLoose(["\n  position: absolute;\n  right: 1rem;\n"]);

  _templateObject$4 = function _templateObject() {
    return data;
  };

  return data;
}
var languages = {
  en_US: 'English',
  pt_BR: 'Português'
};
var Wrapper$1 = styled.div(_templateObject$4());
var Locales = function Locales() {
  var options = [{
    key: 'en_US',
    text: 'English',
    value: 'en_US'
  }, {
    key: 'pt_BR',
    text: 'Português',
    value: 'pt_BR'
  }];
  var context = React.useContext(Context);
  return React__default.createElement(Wrapper$1, null, React__default.createElement(mwUi.Dropdown, {
    text: languages[context.locale || 'pt_BR'],
    direction: 'left',
    options: options,
    value: context.locale,
    onChange: function onChange(e, _ref) {
      var value = _ref.value;
      context.changeLocale && context.changeLocale(value);
    }
  }));
};

function _templateObject$5() {
  var data = _taggedTemplateLiteralLoose(["\n  margin: 0 !important;\n  height: 100%;\n"]);

  _templateObject$5 = function _templateObject() {
    return data;
  };

  return data;
}

if (!localStorage.hasOwnProperty('_LOCALE')) {
  localStorage.setItem('_LOCALE', navigator.language.replace('-', '_'));
}

var localeLocal$1 = localStorage.getItem('_LOCALE') || 'pt_BR';
var Container$1 = styled(mwUi.Grid)(_templateObject$5());
var messages = {
  pt_BR: ptBR,
  en_US: enUS
};
var Context$1 = React.createContext({});
var MwLogin = function MwLogin(props) {
  console.log('localeLocal', localeLocal$1);

  var _useState = React.useState(localeLocal$1),
      locale = _useState[0],
      setLocale = _useState[1];

  var changeLocale = function changeLocale(locale) {
    setLocale(locale);
    localStorage.setItem('_LOCALE', locale);
  };

  return React__default.createElement(Context$1.Provider, {
    value: {
      locale: locale,
      changeLocale: changeLocale
    }
  }, React__default.createElement(reactIntl.IntlProvider, {
    locale: locale.replace('_', '-'),
    messages: messages[locale]
  }, React__default.createElement(reactRouterDom.BrowserRouter, {
    basename: props.basename
  }, React__default.createElement(Container$1, {
    stackable: true,
    stretched: true,
    textAlign: 'center'
  }, React__default.createElement(mwUi.Grid.Row, {
    columns: 'equal'
  }, React__default.createElement(Banner, Object.assign({}, props.banner)), React__default.createElement(mwUi.Grid.Column, null, React__default.createElement(Locales, null), React__default.createElement(reactRouterDom.Switch, null, React__default.createElement(reactRouterDom.Route, {
    exact: true,
    path: '/login'
  }, React__default.createElement(Login, Object.assign({}, props))), React__default.createElement(reactRouterDom.Route, {
    exact: true,
    path: '/code/:account/:username/:hash'
  }, React__default.createElement(Code, null)), React__default.createElement(reactRouterDom.Route, {
    exact: true,
    path: '/recover/:account/:id'
  }, React__default.createElement(Recover, null)), React__default.createElement(reactRouterDom.Route, null, React__default.createElement(Login, Object.assign({}, props))))))))));
};

exports.Context = Context$1;
exports.MwLogin = MwLogin;
//# sourceMappingURL=index.js.map
