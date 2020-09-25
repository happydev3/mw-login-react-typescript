import React, { useState } from 'react'
import {
  Button,
  Grid,
  Form,
  Header,
  Input,
  Segment,
  Message
} from '@mw-kit/mw-ui'
import { useParams, useHistory } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'

import ptBR from '../../i18n/locales/pt_BR.json'
import { FormattedMessage, useIntl } from 'react-intl'

import { IPostUsersCheckCode, postUsersCheckCode } from './actions'
import { postUsersRecover } from '../Login/actions'

export const Code = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  type Params = {
    account: string
    username: string
    hash: string
  }
  const params: Params = useParams()
  const history = useHistory()
  const intl = useIntl()
  const { control, formState, handleSubmit, register } = useForm<
    IPostUsersCheckCode
  >({
    mode: 'onChange',
    defaultValues: {
      account: params.account,
      code: params.hash === 'default' ? '' : params.hash
    }
  })

  const { isValid } = formState

  const resend = async () => {
    const account = params.account || ''
    const username = params.username || ''

    // start loading
    setLoading(true)

    // reset messages
    setMessage('')

    try {
      // get result
      const res = await postUsersRecover({ account, username })

      console.log(res)
    } catch (error) {
      console.log(error)
    } finally {
      // stop loading
      setLoading(false)
    }
  }

  const onSubmit = async (data: IPostUsersCheckCode) => {
    try {
      // clear message
      setMessage('')

      // get result
      const res = await postUsersCheckCode(data)

      // extract data
      const d = res.data.data || {}
      const token: string = d.token || ''
      const userId: number = d.extra.users.id || 0

      // save data
      sessionStorage.setItem('MwLoginToken', token)

      // redirect
      history.push(`/recover/${data.account}/${userId}`)
    } catch (error) {
      const res = error.response?.data?.data
      if (res) {
        setMessage(res.message)
      }
    }
  }

  return (
    <React.Fragment>
      <Grid centered>
        <Grid.Column width={8} textAlign='left' verticalAlign='middle'>
          <Header size='large'>
            <FormattedMessage
              id='code.header.main'
              defaultMessage={ptBR['code.header.main']}
            />
            <Header.Subheader>
              <FormattedMessage
                id='code.header.subheader'
                defaultMessage={ptBR['code.header.subheader']}
              />
            </Header.Subheader>
          </Header>
          <br />
          {message && <Message negative content={message} />}
          <br />
          <Form
            onSubmit={handleSubmit(onSubmit)}
            loading={formState.isSubmitting || loading}
          >
            <input name='account' type='hidden' ref={register} />
            <Form.Field>
              <Controller
                as={Input}
                name='code'
                control={control}
                rules={{ required: true }}
                placeholder={intl.formatMessage({
                  id: 'code.placeholder.code',
                  defaultMessage: ptBR['code.placeholder.code']
                })}
                autoFocus
              />
            </Form.Field>
            <Button
              disabled={!isValid}
              primary
              type='submit'
              fluid
              content={intl.formatMessage({
                id: 'code.button.submit',
                defaultMessage: ptBR['code.button.submit']
              })}
            />
            <Segment basic textAlign='center'>
              <FormattedMessage
                id='code.not_received'
                defaultMessage={ptBR['code.not_received']}
              />{' '}
              <a href='#' onClick={resend}>
                <FormattedMessage
                  id='code.resend'
                  defaultMessage={ptBR['code.resend']}
                />
              </a>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  )
}
