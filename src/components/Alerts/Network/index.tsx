import React from 'react'
import { Button, Confirm, StrictConfirmProps } from '@mw-kit/mw-ui'

import ptBR from '../../../i18n/locales/pt_BR.json'
import { useIntl } from 'react-intl'

export const AlertsNetwork = (props: StrictConfirmProps) => {
  const intl = useIntl()

  const header = intl.formatMessage({
    id: 'alerts.network.header',
    defaultMessage: ptBR['alerts.network.header']
  })

  const content = intl.formatMessage({
    id: 'alerts.network.content',
    defaultMessage: ptBR['alerts.network.content']
  })

  return (
    <Confirm
      open={props.open}
      size='tiny'
      onConfirm={props.onConfirm}
      header={header}
      content={content}
      cancelButton={<React.Fragment />}
      confirmButton={<Button negative content='Ok' />}
    />
  )
}
