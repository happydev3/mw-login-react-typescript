import React__default, { createElement, useState, useEffect, useRef, createContext, useContext } from 'react';
import { useIntl, FormattedMessage, IntlProvider } from 'react-intl';
import { useParams, useHistory, BrowserRouter, Switch, Route } from 'react-router-dom';
import { Grid, Image, Header, Message, Form, Input, Button, Segment, Confirm, Modal, Checkbox, Placeholder, Dropdown } from '@mw-kit/mw-ui';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { object, number, string, ref } from 'yup';
import { yupResolver } from '@hookform/resolvers';

var logo = require("./logo~rQOXgtwE.svg");

let _ = t => t,
    _t,
    _t2,
    _t3,
    _t4;
const Wrapper = styled(Grid.Column)(_t || (_t = _`
  background-size: cover;
  background-image: url('${0}');
  &::before {
    content: '';
    background-color: rgba(52, 85, 171, 0.9);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
  }
`), props => props.background);
const Overlay = styled.div(_t2 || (_t2 = _`
  z-index: 1;
  display: flex;
  flex-direction: column;
`));
const Content = styled.div(_t3 || (_t3 = _`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  & > p {
    font-size: 16px;
    padding: 0 1rem;
  }
`));
const Footer = styled.div(_t4 || (_t4 = _`
  display: flex;
  justify-content: center;
`));
const Banner = props => {
  return createElement(Wrapper, {
    background: props.background,
    color: 'blue'
  }, createElement(Overlay, null, createElement("div", null, createElement(Image, {
    src: props.logo ? props.logo : logo,
    height: 45
  })), createElement(Content, null, createElement(Header, {
    size: 'huge',
    inverted: true,
    content: props.title
  }), createElement("p", null, props.description)), createElement(Footer, null, props.footer)));
};
Banner.defaultProps = {
  background: 'https://iconesmw.s3-sa-east-1.amazonaws.com/trade_result/login/Background_Login.jpg'
};

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

const api = axios.create({
  baseURL: 'https://api.xpto.ninja',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
api.interceptors.request.use(async config => {
  const tokenKey = 'MwLoginToken';
  const url = config.url;
  const language = localStorage.getItem('_LOCALE') || 'pt_BR';
  config.headers['Accept-Language'] = language.replace('_', '-');

  if (url === 'v1/users/token') {
    sessionStorage.removeItem(tokenKey);
    return config;
  }

  const token = sessionStorage.getItem(tokenKey);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
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

const Code = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const params = useParams();
  const history = useHistory();
  const intl = useIntl();
  const {
    control,
    formState,
    handleSubmit,
    register
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      account: params.account,
      code: params.hash === 'default' ? '' : params.hash
    }
  });
  const {
    isValid
  } = formState;

  const resend = async () => {
    const account = params.account || '';
    const username = params.username || '';
    setLoading(true);
    setMessage('');

    try {
      const res = await postUsersRecover({
        account,
        username
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async data => {
    try {
      setMessage('');
      const res = await postUsersCheckCode(data);
      const d = res.data.data || {};
      const token = d.token || '';
      const userId = d.extra.users.id || 0;
      sessionStorage.setItem('MwLoginToken', token);
      history.push(`/recover/${data.account}/${userId}`);
    } catch (error) {
      var _error$response, _error$response$data;

      const res = (_error$response = error.response) === null || _error$response === void 0 ? void 0 : (_error$response$data = _error$response.data) === null || _error$response$data === void 0 ? void 0 : _error$response$data.data;

      if (res) {
        setMessage(res.message);
      }
    }
  };

  return React__default.createElement(React__default.Fragment, null, React__default.createElement(Grid, {
    centered: true
  }, React__default.createElement(Grid.Column, {
    width: 8,
    textAlign: 'left',
    verticalAlign: 'middle'
  }, React__default.createElement(Header, {
    size: 'large'
  }, React__default.createElement(FormattedMessage, {
    id: 'code.header.main',
    defaultMessage: ptBR['code.header.main']
  }), React__default.createElement(Header.Subheader, null, React__default.createElement(FormattedMessage, {
    id: 'code.header.subheader',
    defaultMessage: ptBR['code.header.subheader']
  }))), React__default.createElement("br", null), message && React__default.createElement(Message, {
    negative: true,
    content: message
  }), React__default.createElement("br", null), React__default.createElement(Form, {
    onSubmit: handleSubmit(onSubmit),
    loading: formState.isSubmitting || loading
  }, React__default.createElement("input", {
    name: 'account',
    type: 'hidden',
    ref: register
  }), React__default.createElement(Form.Field, null, React__default.createElement(Controller, {
    as: Input,
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
  })), React__default.createElement(Button, {
    disabled: !isValid,
    primary: true,
    type: 'submit',
    fluid: true,
    content: intl.formatMessage({
      id: 'code.button.submit',
      defaultMessage: ptBR['code.button.submit']
    })
  }), React__default.createElement(Segment, {
    basic: true,
    textAlign: 'center'
  }, React__default.createElement(FormattedMessage, {
    id: 'code.not_received',
    defaultMessage: ptBR['code.not_received']
  }), ' ', React__default.createElement("a", {
    href: '#',
    onClick: resend
  }, React__default.createElement(FormattedMessage, {
    id: 'code.resend',
    defaultMessage: ptBR['code.resend']
  })))))));
};

const AlertsForgot = props => {
  const intl = useIntl();
  const header = intl.formatMessage({
    id: 'alerts.forgot.header',
    defaultMessage: ptBR['alerts.forgot.header']
  });
  const content = intl.formatMessage({
    id: 'alerts.forgot.content',
    defaultMessage: ptBR['alerts.forgot.content']
  });
  return React__default.createElement(Confirm, {
    open: props.open,
    size: 'tiny',
    onConfirm: props.onConfirm,
    header: header,
    content: content,
    cancelButton: React__default.createElement(React__default.Fragment, null),
    confirmButton: React__default.createElement(Button, {
      content: 'Ok'
    })
  });
};

const AlertsNetwork = props => {
  const intl = useIntl();
  const header = intl.formatMessage({
    id: 'alerts.network.header',
    defaultMessage: ptBR['alerts.network.header']
  });
  const content = intl.formatMessage({
    id: 'alerts.network.content',
    defaultMessage: ptBR['alerts.network.content']
  });
  return React__default.createElement(Confirm, {
    open: props.open,
    size: 'tiny',
    onConfirm: props.onConfirm,
    header: header,
    content: content,
    cancelButton: React__default.createElement(React__default.Fragment, null),
    confirmButton: React__default.createElement(Button, {
      negative: true,
      content: 'Ok'
    })
  });
};

const AlertsTime = props => {
  const intl = useIntl();
  const header = intl.formatMessage({
    id: 'alerts.time.header',
    defaultMessage: ptBR['alerts.time.header']
  });
  const content = intl.formatMessage({
    id: 'alerts.time.content',
    defaultMessage: ptBR['alerts.time.content']
  });
  return React__default.createElement(Confirm, {
    open: props.open,
    size: 'tiny',
    onConfirm: props.onConfirm,
    header: header,
    content: content,
    cancelButton: React__default.createElement(React__default.Fragment, null),
    confirmButton: React__default.createElement(Button, {
      negative: true,
      content: 'Ok'
    })
  });
};

const AlertsSession = props => {
  const intl = useIntl();
  const header = intl.formatMessage({
    id: 'alerts.session.header',
    defaultMessage: ptBR['alerts.session.header']
  });
  const content = intl.formatMessage({
    id: 'alerts.session.content',
    defaultMessage: ptBR['alerts.session.content']
  });
  return React__default.createElement(Confirm, {
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
  return api.get(`v1/terms/${data.id}`);
}
function postTermsAccept(id) {
  return api.post(`v1/terms/accept/${id}`);
}

let _$1 = t => t,
    _t$1;

const FakeTerms = () => {
  return React__default.createElement(Placeholder, {
    fluid: true
  }, React__default.createElement(Placeholder.Paragraph, null, React__default.createElement(Placeholder.Line, null), React__default.createElement(Placeholder.Line, null), React__default.createElement(Placeholder.Line, null)), React__default.createElement(Placeholder.Paragraph, null, React__default.createElement(Placeholder.Line, null), React__default.createElement(Placeholder.Line, null), React__default.createElement(Placeholder.Line, null), React__default.createElement(Placeholder.Line, null)), React__default.createElement(Placeholder.Paragraph, null, React__default.createElement(Placeholder.Line, null), React__default.createElement(Placeholder.Line, null), React__default.createElement(Placeholder.Line, null), React__default.createElement(Placeholder.Line, null)));
};

const WrapperModalActions = styled(Modal.Actions)(_t$1 || (_t$1 = _$1`
  display: flex;
  align-items: center;
  & > div:first-child {
    text-align: left;
    flex-grow: 1;
  }
`));
const Terms = props => {
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accept, setAccept] = useState(false);
  const [term, setTerm] = useState({
    id: '',
    content: ''
  });
  const intl = useIntl();
  const termId = props.term.id;
  useEffect(() => {
    if (!termId) {
      return;
    }

    async function getData() {
      setLoading(true);

      try {
        const res = await getTerm(props.term);
        setTerm(res.data.data);
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [termId]);

  const handleAccept = async () => {
    try {
      setSaving(true);
      const res = await postTermsAccept(termId);
      props.onSuccess(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  return React__default.createElement(Modal, {
    open: props.open,
    size: 'small'
  }, React__default.createElement(Header, null, React__default.createElement(FormattedMessage, {
    id: 'terms.header',
    defaultMessage: ptBR['terms.header']
  })), React__default.createElement(Modal.Content, {
    scrolling: true
  }, loading ? React__default.createElement(FakeTerms, null) : React__default.createElement("p", {
    dangerouslySetInnerHTML: {
      __html: term.content
    }
  })), React__default.createElement(WrapperModalActions, null, React__default.createElement(Checkbox, {
    checked: accept,
    label: intl.formatMessage({
      id: 'terms.accept',
      defaultMessage: ptBR['terms.accept']
    }),
    onChange: (e, {
      checked
    }) => {
      setAccept(checked);
    }
  }), React__default.createElement("div", null, React__default.createElement(Button, {
    basic: true,
    onClick: () => props.onCancel(),
    content: intl.formatMessage({
      id: 'generic.back',
      defaultMessage: ptBR['generic.back']
    })
  }), React__default.createElement(Button, {
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

let _$2 = t => t,
    _t$2;
const WrapperForgot = styled(Form.Field)(_t$2 || (_t$2 = _$2`
  position: absolute;
  right: 0;
`));
const Login = props => {
  const mwLogin = JSON.parse(localStorage.getItem('MwLogin') || '{}');
  const mwLoginRemember = !!mwLogin.account;
  const [showPassword, toggleShowPassword] = useState(false);
  const [showFailSession, setShowFailSession] = useState(false);
  const [showFailNetwork, setShowFailNetwork] = useState(false);
  const [showFailTime, setShowFailTime] = useState(false);
  const [showFailTerms, setShowFailTerms] = useState(false);
  const [showAlertForgot, setShowAlertForgot] = useState(false);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState('');
  const [username, setUsername] = useState('');
  const [remember, setRemember] = useState(mwLoginRemember);
  const [message, setMessage] = useState('');
  const [termId, setTermId] = useState(0);
  const loginSchema = object().shape({
    account: number().required().positive().integer(),
    username: string().required(),
    password: string().required(),
    force: number(),
    fail: string()
  });
  const {
    control,
    handleSubmit,
    register,
    formState,
    setValue,
    getValues,
    errors
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      account: mwLogin.account || '',
      username: mwLogin.username || '',
      password: '',
      force: 0,
      fail: ''
    },
    resolver: yupResolver(loginSchema)
  });
  const refLoginForm = useRef(null);
  const history = useHistory();
  const intl = useIntl();
  const {
    isValid
  } = formState;

  const handleSuccess = user => {
    props.onSuccess(user);
    alert('success!');
  };

  const handleForgot = async () => {
    const values = getValues();

    if (errors.account || errors.username) {
      setMessage('dados invalidos');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await postUsersRecover(values);
      setAccount(values.account);
      setUsername(values.username);
      setShowAlertForgot(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async data => {
    if (remember) {
      localStorage.setItem('MwLogin', JSON.stringify({
        account: data.account,
        username: data.username
      }));
    } else {
      localStorage.removeItem('MwLogin');
    }

    try {
      setMessage('');
      const res = await getToken(data);
      const token = res.data.data.token || '';
      const fail = res.data.data.fail || '';
      const extra = res.data.data.extra || {};

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
    } catch (error) {
      var _error$response, _error$response$data;

      const res = (_error$response = error.response) === null || _error$response === void 0 ? void 0 : (_error$response$data = _error$response.data) === null || _error$response$data === void 0 ? void 0 : _error$response$data.data;

      if (res) {
        setMessage(res.message);
      }
    }
  };

  return React__default.createElement(React__default.Fragment, null, React__default.createElement(AlertsForgot, {
    open: showAlertForgot,
    onConfirm: () => {
      history.push(`/code/${account}/${username}/default`);
    }
  }), React__default.createElement(AlertsNetwork, {
    open: showFailNetwork,
    onConfirm: () => setShowFailNetwork(false)
  }), React__default.createElement(AlertsSession, {
    open: showFailSession,
    onCancel: () => setShowFailSession(false),
    onConfirm: () => {
      var _refLoginForm$current;

      setValue('force', 1);
      setShowFailSession(false);
      refLoginForm === null || refLoginForm === void 0 ? void 0 : (_refLoginForm$current = refLoginForm.current) === null || _refLoginForm$current === void 0 ? void 0 : _refLoginForm$current.handleSubmit();
    }
  }), React__default.createElement(AlertsTime, {
    open: showFailTime,
    onConfirm: () => setShowFailTime(false)
  }), React__default.createElement(Terms, {
    open: showFailTerms,
    term: {
      id: termId
    },
    onCancel: () => setShowFailTerms(false),
    onSuccess: data => {
      setShowFailTerms(false);
      handleSuccess(data);
    }
  }), React__default.createElement(Grid, {
    centered: true
  }, React__default.createElement(Grid.Column, {
    width: 8,
    textAlign: 'left',
    verticalAlign: 'middle'
  }, React__default.createElement(Header, {
    size: 'large'
  }, React__default.createElement(FormattedMessage, {
    id: 'login.header.main',
    defaultMessage: ptBR['login.header.main']
  })), React__default.createElement("br", null), message && React__default.createElement(Message, {
    negative: true,
    content: message
  }), React__default.createElement("br", null), React__default.createElement(Form, {
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
  }), React__default.createElement(Form.Field, null, React__default.createElement("label", null, React__default.createElement(FormattedMessage, {
    id: 'login.label.account',
    defaultMessage: ptBR['login.label.account']
  })), React__default.createElement(Controller, {
    as: Input,
    name: 'account',
    control: control,
    placeholder: intl.formatMessage({
      id: 'login.placeholder.account',
      defaultMessage: ptBR['login.placeholder.account']
    }),
    autoFocus: true
  })), React__default.createElement(Form.Field, null, React__default.createElement("label", null, React__default.createElement(FormattedMessage, {
    id: 'login.label.username',
    defaultMessage: ptBR['login.label.username']
  })), React__default.createElement(Controller, {
    as: Input,
    name: 'username',
    control: control,
    placeholder: intl.formatMessage({
      id: 'login.placeholder.username',
      defaultMessage: ptBR['login.placeholder.username']
    })
  })), React__default.createElement(Form.Field, null, React__default.createElement("label", null, React__default.createElement(FormattedMessage, {
    id: 'login.label.password',
    defaultMessage: ptBR['login.label.password']
  })), React__default.createElement(Controller, {
    as: Input,
    name: 'password',
    type: showPassword ? 'text' : 'password',
    control: control,
    icon: {
      name: `eye${showPassword ? ' slash' : ''}`,
      link: true,
      onClick: () => toggleShowPassword(!showPassword)
    },
    placeholder: intl.formatMessage({
      id: 'login.placeholder.password',
      defaultMessage: ptBR['login.placeholder.password']
    })
  })), React__default.createElement(Form.Group, null, React__default.createElement(Form.Field, null, React__default.createElement(Checkbox, {
    name: 'remember',
    label: intl.formatMessage({
      id: 'login.label.remember',
      defaultMessage: ptBR['login.label.remember']
    }),
    checked: remember,
    onChange: () => setRemember(!remember),
    ref: register
  })), React__default.createElement(WrapperForgot, null, React__default.createElement("a", {
    href: '#',
    onClick: handleForgot
  }, React__default.createElement(FormattedMessage, {
    id: 'login.forgot',
    defaultMessage: ptBR['login.forgot']
  })))), React__default.createElement(Button, {
    disabled: !isValid,
    primary: true,
    type: 'submit',
    fluid: true
  }, React__default.createElement(FormattedMessage, {
    id: 'login.button.submit',
    defaultMessage: ptBR['login.button.submit']
  }))))));
};

function putUsersPassword(data) {
  return api.put(`v1/users/${data.id}`, data);
}

const Recover = () => {
  const [message, setMessage] = useState('');
  const params = useParams();
  const history = useHistory();
  const intl = useIntl();
  const RecoverSchema = object().shape({
    id: number().required().positive().integer(),
    password: string().required(),
    password_confirm: string().required().equals([ref('password')])
  });
  const {
    control,
    formState,
    handleSubmit,
    register
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      id: params.id,
      password: '',
      password_confirm: ''
    },
    resolver: yupResolver(RecoverSchema)
  });
  const {
    isValid
  } = formState;

  const onSubmit = async data => {
    try {
      setMessage('');
      await putUsersPassword(data);
      history.push('/');
    } catch (error) {
      var _error$response, _error$response$data;

      const res = (_error$response = error.response) === null || _error$response === void 0 ? void 0 : (_error$response$data = _error$response.data) === null || _error$response$data === void 0 ? void 0 : _error$response$data.data;

      if (res) {
        setMessage(res.message);
      }
    }
  };

  return React__default.createElement(React__default.Fragment, null, React__default.createElement(Grid, {
    centered: true
  }, React__default.createElement(Grid.Column, {
    width: 8,
    textAlign: 'left',
    verticalAlign: 'middle'
  }, React__default.createElement(Header, {
    size: 'large'
  }, React__default.createElement(FormattedMessage, {
    id: 'recover.header.main',
    defaultMessage: ptBR['recover.header.main']
  })), React__default.createElement("br", null), message && React__default.createElement(Message, {
    negative: true,
    content: message
  }), React__default.createElement("br", null), React__default.createElement(Form, {
    onSubmit: handleSubmit(onSubmit),
    loading: formState.isSubmitting
  }, React__default.createElement("input", {
    name: 'id',
    type: 'hidden',
    ref: register
  }), React__default.createElement(Form.Field, null, React__default.createElement("label", null, "Nova senha"), React__default.createElement(Controller, {
    as: Input,
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
  })), React__default.createElement(Form.Field, null, React__default.createElement("label", null, "Repetir senha"), React__default.createElement(Controller, {
    as: Input,
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
  })), React__default.createElement(Button, {
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

let _$3 = t => t,
    _t$3;

if (!localStorage.hasOwnProperty('_LOCALE')) {
  localStorage.setItem('_LOCALE', navigator.language.replace('-', '_'));
}

const localeLocal = localStorage.getItem('_LOCALE') || 'pt_BR';
const Container = styled(Grid)(_t$3 || (_t$3 = _$3`
  margin: 0 !important;
  height: 100%;
`));
const Context = createContext({});

let _$4 = t => t,
    _t$4;
const languages = {
  en_US: 'English',
  pt_BR: 'Português'
};
const Wrapper$1 = styled.div(_t$4 || (_t$4 = _$4`
  position: absolute;
  right: 1rem;
`));
const Locales = () => {
  const options = [{
    key: 'en_US',
    text: 'English',
    value: 'en_US'
  }, {
    key: 'pt_BR',
    text: 'Português',
    value: 'pt_BR'
  }];
  const context = useContext(Context);
  return React__default.createElement(Wrapper$1, null, React__default.createElement(Dropdown, {
    text: languages[context.locale || 'pt_BR'],
    direction: 'left',
    options: options,
    value: context.locale,
    onChange: (e, {
      value
    }) => {
      context.changeLocale && context.changeLocale(value);
    }
  }));
};

let _$5 = t => t,
    _t$5;

if (!localStorage.hasOwnProperty('_LOCALE')) {
  localStorage.setItem('_LOCALE', navigator.language.replace('-', '_'));
}

const localeLocal$1 = localStorage.getItem('_LOCALE') || 'pt_BR';
const Container$1 = styled(Grid)(_t$5 || (_t$5 = _$5`
  margin: 0 !important;
  height: 100%;
`));
const messages = {
  pt_BR: ptBR,
  en_US: enUS
};
const Context$1 = createContext({});
const MwLogin = props => {
  console.log('localeLocal', localeLocal$1);
  const [locale, setLocale] = useState(localeLocal$1);

  const changeLocale = locale => {
    setLocale(locale);
    localStorage.setItem('_LOCALE', locale);
  };

  return React__default.createElement(Context$1.Provider, {
    value: {
      locale,
      changeLocale
    }
  }, React__default.createElement(IntlProvider, {
    locale: locale.replace('_', '-'),
    messages: messages[locale]
  }, React__default.createElement(BrowserRouter, {
    basename: props.basename
  }, React__default.createElement(Container$1, {
    stackable: true,
    stretched: true,
    textAlign: 'center'
  }, React__default.createElement(Grid.Row, {
    columns: 'equal'
  }, React__default.createElement(Banner, Object.assign({}, props.banner)), React__default.createElement(Grid.Column, null, React__default.createElement(Locales, null), React__default.createElement(Switch, null, React__default.createElement(Route, {
    exact: true,
    path: '/login'
  }, React__default.createElement(Login, Object.assign({}, props))), React__default.createElement(Route, {
    exact: true,
    path: '/code/:account/:username/:hash'
  }, React__default.createElement(Code, null)), React__default.createElement(Route, {
    exact: true,
    path: '/recover/:account/:id'
  }, React__default.createElement(Recover, null)), React__default.createElement(Route, null, React__default.createElement(Login, Object.assign({}, props))))))))));
};

export { Context$1 as Context, MwLogin };
//# sourceMappingURL=index.modern.js.map
