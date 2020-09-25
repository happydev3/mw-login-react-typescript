import React, { createContext, useState } from 'react'
import { IntlProvider } from 'react-intl'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Grid } from '@mw-kit/mw-ui'

import {
  Banner,
  BannerProps,
  Code,
  Login,
  Recover,
  Locales
} from './components'

import styled from 'styled-components'
import ptBR from './i18n/locales/pt_BR.json'
import enUS from './i18n/locales/en_US.json'

interface MwLoginProps {
  basename: string
  banner: BannerProps
  onSuccess: CallableFunction
}

if (!localStorage.hasOwnProperty('_LOCALE')) {
  localStorage.setItem('_LOCALE', navigator.language.replace('-', '_'))
}

const localeLocal = localStorage.getItem('_LOCALE') || 'pt_BR'
const Container = styled(Grid)`
  margin: 0 !important;
  height: 100%;
`

const messages = {
  pt_BR: ptBR,
  en_US: enUS
}

interface ContextProps {
  locale: string
  changeLocale: CallableFunction
}

export const Context = createContext<Partial<ContextProps>>({})

export const MwLogin = (props: MwLoginProps) => {
  console.log('localeLocal', localeLocal)

  const [locale, setLocale] = useState<string>(localeLocal)

  const changeLocale = (locale: string) => {
    // change locale
    setLocale(locale)

    // save on local storate
    localStorage.setItem('_LOCALE', locale)
  }

  return (
    <Context.Provider value={{ locale, changeLocale }}>
      <IntlProvider
        locale={locale.replace('_', '-')}
        messages={messages[locale]}
      >
        <Router basename={props.basename}>
          <Container stackable stretched textAlign='center'>
            <Grid.Row columns='equal'>
              <Banner {...props.banner} />
              <Grid.Column>
                <Locales />
                <Switch>
                  <Route exact path='/login'>
                    <Login {...props} />
                  </Route>
                  <Route exact path='/code/:account/:username/:hash'>
                    <Code />
                  </Route>
                  <Route exact path='/recover/:account/:id'>
                    <Recover />
                  </Route>
                  <Route>
                    <Login {...props} />
                  </Route>
                </Switch>
              </Grid.Column>
            </Grid.Row>
          </Container>
        </Router>
      </IntlProvider>
    </Context.Provider>
  )
}
