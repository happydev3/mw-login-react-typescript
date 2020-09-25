import React from 'react'
import { Button, Confirm, StrictConfirmProps } from '@mw-kit/mw-ui'

import ptBR from '../../../i18n/locales/pt_BR.json'
import { useIntl } from 'react-intl'

export const AlertsForgot = (props: StrictConfirmProps) => {
  const intl = useIntl()

  const header = intl.formatMessage({
    id: 'alerts.forgot.header',
    defaultMessage: ptBR['alerts.forgot.header']
  })

  const content = intl.formatMessage({
    id: 'alerts.forgot.content',
    defaultMessage: ptBR['alerts.forgot.content']
  })

  return (
    <Confirm
      open={props.open}
      size='tiny'
      onConfirm={props.onConfirm}
      header={header}
      content={content}
      cancelButton={<React.Fragment />}
      confirmButton={<Button content='Ok' />}
    />
  )
}
