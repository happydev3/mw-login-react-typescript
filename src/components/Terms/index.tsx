import React, { useState, useEffect } from 'react'
import {
  Button,
  Header,
  Modal,
  Placeholder,
  Checkbox,
  StrictModalProps
} from '@mw-kit/mw-ui'
import styled from 'styled-components'

import ptBR from '../../i18n/locales/pt_BR.json'
import { useIntl, FormattedMessage } from 'react-intl'

import { getTerm, postTermsAccept } from './actions'

type Terms = {
  id: number
}

interface TermsProps extends StrictModalProps {
  term: Terms
  onCancel: CallableFunction
  onSuccess: CallableFunction
}

interface TermEntity {
  id: number | string
  content: string
}

const FakeTerms = () => {
  return (
    <Placeholder fluid>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
    </Placeholder>
  )
}

const WrapperModalActions = styled(Modal.Actions)`
  display: flex;
  align-items: center;
  & > div:first-child {
    text-align: left;
    flex-grow: 1;
  }
`

export const Terms = (props: TermsProps) => {
  const [saving, setSaving] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [accept, setAccept] = useState<boolean | undefined>(false)
  const [term, setTerm] = useState<TermEntity>({
    id: '',
    content: ''
  })

  const intl = useIntl()
  const termId = props.term.id

  useEffect(() => {
    if (!termId) {
      return
    }

    // Create an scoped async function in the hook
    async function getData() {
      setLoading(true)
      try {
        // get term
        const res = await getTerm(props.term)

        // set term
        setTerm(res.data.data)
      } catch (error) {
        console.log('error', error)
      } finally {
        setLoading(false)
      }
    }
    // Execute the created function directly
    getData()
  }, [termId])

  const handleAccept = async () => {
    try {
      setSaving(true)

      // accept terms
      const res = await postTermsAccept(termId)

      // return data
      props.onSuccess(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal open={props.open} size='small'>
      <Header>
        <FormattedMessage
          id='terms.header'
          defaultMessage={ptBR['terms.header']}
        />
      </Header>
      <Modal.Content scrolling>
        {loading ? (
          <FakeTerms />
        ) : (
          <p dangerouslySetInnerHTML={{ __html: term.content }} />
        )}
      </Modal.Content>
      <WrapperModalActions>
        <Checkbox
          checked={accept}
          label={intl.formatMessage({
            id: 'terms.accept',
            defaultMessage: ptBR['terms.accept']
          })}
          onChange={(e, { checked }) => {
            setAccept(checked)
          }}
        />
        <div>
          <Button
            basic
            onClick={() => props.onCancel()}
            content={intl.formatMessage({
              id: 'generic.back',
              defaultMessage: ptBR['generic.back']
            })}
          />

          <Button
            disabled={!accept || saving}
            primary
            onClick={handleAccept}
            loading={saving}
            content={intl.formatMessage({
              id: 'generic.continue',
              defaultMessage: ptBR['generic.continue']
            })}
          />
        </div>
      </WrapperModalActions>
    </Modal>
  )
}
