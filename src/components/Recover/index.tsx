import React, { useState } from 'react'
import { Button, Grid, Form, Header, Input, Message } from '@mw-kit/mw-ui'
import { useParams, useHistory } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'

import ptBR from '../../i18n/locales/pt_BR.json'
import { FormattedMessage, useIntl } from 'react-intl'

// validator
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers'

import { IPutUsersPassword, putUsersPassword } from './actions'

export const Recover = () => {
  const [message, setMessage] = useState<string>('')

  type Params = {
    account: any
    id: any
  }

  const params: Params = useParams()
  const history = useHistory()
  const intl = useIntl()
  const RecoverSchema = yup.object().shape({
    id: yup.number().required().positive().integer(),
    password: yup.string().required(),
    password_confirm: yup
      .string()
      .required()
      .equals([yup.ref('password')])
  })

  const { control, formState, handleSubmit, register } = useForm<
    IPutUsersPassword
  >({
    mode: 'onChange',
    defaultValues: {
      id: params.id,
      password: '',
      password_confirm: ''
    },
    resolver: yupResolver(RecoverSchema)
  })

  const { isValid } = formState

  const onSubmit = async (data: IPutUsersPassword) => {
    try {
      // clear message
      setMessage('')

      // get result
      await putUsersPassword(data)

      // go login
      history.push('/')
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
              id='recover.header.main'
              defaultMessage={ptBR['recover.header.main']}
            />
          </Header>
          <br />
          {message && <Message negative content={message} />}
          <br />
          <Form
            onSubmit={handleSubmit(onSubmit)}
            loading={formState.isSubmitting}
          >
            <input name='id' type='hidden' ref={register} />
            <Form.Field>
              <label>Nova senha</label>
              <Controller
                as={Input}
                type='password'
                name='password'
                control={control}
                rules={{ required: true }}
                placeholder={intl.formatMessage({
                  id: 'recover.placeholder.password',
                  defaultMessage: ptBR['recover.placeholder.password']
                })}
                autoFocus
              />
            </Form.Field>
            <Form.Field>
              <label>Repetir senha</label>
              <Controller
                as={Input}
                type='password'
                name='password_confirm'
                control={control}
                rules={{ required: true }}
                placeholder={intl.formatMessage({
                  id: 'recover.placeholder.password_confirm',
                  defaultMessage: ptBR['recover.placeholder.password_confirm']
                })}
              />
            </Form.Field>
            <Button
              disabled={!isValid}
              primary
              type='submit'
              fluid
              content={intl.formatMessage({
                id: 'recover.button.submit',
                defaultMessage: ptBR['recover.button.submit']
              })}
            />
          </Form>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  )
}
