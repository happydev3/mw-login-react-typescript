import React, { useState, useRef } from 'react'
import {
  Form,
  Checkbox,
  Button,
  Grid,
  Header,
  Input,
  Message
} from '@mw-kit/mw-ui'
import { useForm, Controller } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

// validator
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers'

// get actions
import { IgetToken, getToken, postUsersRecover } from './actions'

// get styles
import styled from 'styled-components'

import {
  AlertsForgot,
  AlertsSession,
  AlertsNetwork,
  AlertsTime
} from '../Alerts'
import { Terms } from '../Terms'
import { FormattedMessage, useIntl } from 'react-intl'

import ptBR from '../../i18n/locales/pt_BR.json'

interface LoginProps {
  onSuccess: CallableFunction
}

const WrapperForgot = styled(Form.Field)`
  position: absolute;
  right: 0;
`

export const Login = (props: LoginProps) => {
  const mwLogin = JSON.parse(localStorage.getItem('MwLogin') || '{}')
  const mwLoginRemember = !!mwLogin.account

  const [showPassword, toggleShowPassword] = useState<boolean>(false)
  const [showFailSession, setShowFailSession] = useState<boolean>(false)
  const [showFailNetwork, setShowFailNetwork] = useState<boolean>(false)
  const [showFailTime, setShowFailTime] = useState<boolean>(false)
  const [showFailTerms, setShowFailTerms] = useState<boolean>(false)
  const [showAlertForgot, setShowAlertForgot] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [account, setAccount] = useState<string | number>('')
  const [username, setUsername] = useState<string>('')
  const [remember, setRemember] = useState<boolean>(mwLoginRemember)

  const [message, setMessage] = useState<string>('')
  const [termId, setTermId] = useState<number>(0)

  const loginSchema = yup.object().shape({
    account: yup.number().required().positive().integer(),
    username: yup.string().required(),
    password: yup.string().required(),
    force: yup.number(),
    fail: yup.string()
  })

  const {
    control,
    handleSubmit,
    register,
    formState,
    setValue,
    getValues,
    errors
  } = useForm<IgetToken>({
    mode: 'onChange',
    defaultValues: {
      account: mwLogin.account || '',
      username: mwLogin.username || '',
      password: '',
      force: 0,
      fail: ''
    },
    resolver: yupResolver(loginSchema)
  })

  const refLoginForm = useRef<HTMLFormElement>(null)
  const history = useHistory()
  const intl = useIntl()
  const { isValid } = formState

  const handleSuccess = (user: any) => {
    props.onSuccess(user)

    alert('success!')
  }

  const handleForgot = async () => {
    // get values
    const values = getValues()

    // valid
    if (errors.account || errors.username) {
      setMessage('dados invalidos')
      return
    }

    // start loading
    setLoading(true)

    // clean message
    setMessage('')

    try {
      // dispath recover
      await postUsersRecover(values)

      // set account
      setAccount(values.account)
      setUsername(values.username)

      // show alert
      setShowAlertForgot(true)
    } catch (error) {
      console.log(error)
    } finally {
      // stop loading
      setLoading(false)
    }
  }

  const onSubmit = async (data: IgetToken) => {
    if (remember) {
      localStorage.setItem(
        'MwLogin',
        JSON.stringify({
          account: data.account,
          username: data.username
        })
      )
    } else {
      localStorage.removeItem('MwLogin')
    }

    try {
      // clear message
      setMessage('')

      // get token
      const res = await getToken(data)

      // extract data
      const token: string = res.data.data.token || ''
      const fail: string = res.data.data.fail || ''
      const extra: any = res.data.data.extra || {}

      if (token && fail === '') {
        // call success
        handleSuccess(res.data)
      } else if (fail === 'terms') {
        // set temporary token
        sessionStorage.setItem('MwLoginToken', token)

        // set term id
        setTermId(extra.terms?.id)

        // call terms modal
        setShowFailTerms(true)
      } else if (fail === 'session') {
        // call session modal
        setShowFailSession(true)
      } else if (fail === 'network') {
        // call network modal
        setShowFailNetwork(true)
      } else if (fail === 'time') {
        // call time modal
        setShowFailTime(true)
      }
    } catch (error) {
      const res = error.response?.data?.data
      if (res) {
        setMessage(res.message)
      }
    }
  }

  return (
    <React.Fragment>
      <AlertsForgot
        open={showAlertForgot}
        onConfirm={() => {
          history.push(`/code/${account}/${username}/default`)
        }}
      />

      <AlertsNetwork
        open={showFailNetwork}
        onConfirm={() => setShowFailNetwork(false)}
      />

      <AlertsSession
        open={showFailSession}
        onCancel={() => setShowFailSession(false)}
        onConfirm={() => {
          // force login
          setValue('force', 1)

          // hide modal
          setShowFailSession(false)

          // dispath form
          refLoginForm?.current?.handleSubmit()
        }}
      />

      <AlertsTime
        open={showFailTime}
        onConfirm={() => setShowFailTime(false)}
      />

      <Terms
        open={showFailTerms}
        term={{ id: termId }}
        onCancel={() => setShowFailTerms(false)}
        onSuccess={(data: any) => {
          // close modal
          setShowFailTerms(false)

          // call success
          handleSuccess(data)
        }}
      />

      <Grid centered>
        <Grid.Column width={8} textAlign='left' verticalAlign='middle'>
          <Header size='large'>
            <FormattedMessage
              id='login.header.main'
              defaultMessage={ptBR['login.header.main']}
            />
          </Header>
          <br />
          {message && <Message negative content={message} />}
          <br />
          <Form
            ref={refLoginForm}
            onSubmit={handleSubmit(onSubmit)}
            loading={formState.isSubmitting || loading}
          >
            <input name='force' type='hidden' ref={register} />
            <input name='fail' type='hidden' ref={register} />
            <Form.Field>
              <label>
                <FormattedMessage
                  id='login.label.account'
                  defaultMessage={ptBR['login.label.account']}
                />
              </label>
              <Controller
                as={Input}
                name='account'
                control={control}
                placeholder={intl.formatMessage({
                  id: 'login.placeholder.account',
                  defaultMessage: ptBR['login.placeholder.account']
                })}
                autoFocus
              />
            </Form.Field>
            <Form.Field>
              <label>
                <FormattedMessage
                  id='login.label.username'
                  defaultMessage={ptBR['login.label.username']}
                />
              </label>
              <Controller
                as={Input}
                name='username'
                control={control}
                placeholder={intl.formatMessage({
                  id: 'login.placeholder.username',
                  defaultMessage: ptBR['login.placeholder.username']
                })}
              />
            </Form.Field>
            <Form.Field>
              <label>
                <FormattedMessage
                  id='login.label.password'
                  defaultMessage={ptBR['login.label.password']}
                />
              </label>
              <Controller
                as={Input}
                name='password'
                type={showPassword ? 'text' : 'password'}
                control={control}
                icon={{
                  name: `eye${showPassword ? ' slash' : ''}`,
                  link: true,
                  onClick: () => toggleShowPassword(!showPassword)
                }}
                placeholder={intl.formatMessage({
                  id: 'login.placeholder.password',
                  defaultMessage: ptBR['login.placeholder.password']
                })}
              />
            </Form.Field>

            <Form.Group>
              <Form.Field>
                <Checkbox
                  name='remember'
                  label={intl.formatMessage({
                    id: 'login.label.remember',
                    defaultMessage: ptBR['login.label.remember']
                  })}
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  ref={register}
                />
              </Form.Field>
              <WrapperForgot>
                <a href='#' onClick={handleForgot}>
                  <FormattedMessage
                    id='login.forgot'
                    defaultMessage={ptBR['login.forgot']}
                  />
                </a>
              </WrapperForgot>
            </Form.Group>
            <Button disabled={!isValid} primary type='submit' fluid>
              <FormattedMessage
                id='login.button.submit'
                defaultMessage={ptBR['login.button.submit']}
              />
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  )
}
