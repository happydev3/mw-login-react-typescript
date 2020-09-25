import * as React from 'react'
import styled from 'styled-components'
import { Grid, Image, Header } from '@mw-kit/mw-ui'

import logo from '../../assets/logo.svg'

const Wrapper = styled(Grid.Column)`
  background-size: cover;
  background-image: url('${(props) => props.background}');
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
`

const Overlay = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  & > p {
    font-size: 16px;
    padding: 0 1rem;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: center;
`

export interface BannerProps {
  logo?: string
  background?: string
  title: string
  description: string
  footer: string
}

export const Banner = (props: BannerProps) => {
  return (
    <Wrapper background={props.background} color='blue'>
      <Overlay>
        <div>
          <Image src={props.logo ? props.logo : logo} height={45} />
        </div>
        <Content>
          <Header size='huge' inverted content={props.title} />
          <p>{props.description}</p>
        </Content>
        <Footer>{props.footer}</Footer>
      </Overlay>
    </Wrapper>
  )
}

Banner.defaultProps = {
  background:
    'https://iconesmw.s3-sa-east-1.amazonaws.com/trade_result/login/Background_Login.jpg'
} as Partial<BannerProps>
