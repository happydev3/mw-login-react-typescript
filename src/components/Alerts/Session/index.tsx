import React from 'react'
import { Confirm, StrictConfirmProps } from '@mw-kit/mw-ui'

import ptBR from '../../../i18n/locales/pt_BR.json'
import { useIntl } from 'react-intl'

export const AlertsSession = (props: StrictConfirmProps) => {
  const intl = useIntl()

  const header = intl.formatMessage({
    id: 'alerts.session.header',
    defaultMessage: ptBR['alerts.session.header']
  })

  const content = intl.formatMessage({
    id: 'alerts.session.content',
    defaultMessage: ptBR['alerts.session.content']
  })

  return (
    <Confirm
      open={props.open}
      size='tiny'
      onCancel={props.onCancel}
      onConfirm={props.onConfirm}
      header={header}
      content={content}
      cancelButton={intl.formatMessage({
        id: 'cancel',
        defaultMessage: ptBR.cancel
      })}
      confirmButton={intl.formatMessage({
        id: 'confirm',
        defaultMessage: ptBR.confirm
      })}
    />
  )
}
