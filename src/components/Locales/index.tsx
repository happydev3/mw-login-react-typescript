import React, { useContext } from 'react'
import { Dropdown } from '@mw-kit/mw-ui'
import styled from 'styled-components'
import { Context } from '../../index'

const languages = {
  en_US: 'English',
  pt_BR: 'Português'
}

const Wrapper = styled.div`
  position: absolute;
  right: 1rem;
`

export const Locales = () => {
  const options = [
    {
      key: 'en_US',
      text: 'English',
      value: 'en_US'
    },
    {
      key: 'pt_BR',
      text: 'Português',
      value: 'pt_BR'
    }
  ]

  const context = useContext(Context)

  return (
    <Wrapper>
      <Dropdown
        text={languages[context.locale || 'pt_BR']}
        direction='left'
        options={options}
        value={context.locale}
        onChange={(e, { value }) => {
          context.changeLocale && context.changeLocale(value)
        }}
      />
    </Wrapper>
  )
}
