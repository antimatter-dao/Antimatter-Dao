import { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { styled } from '@mui/material'
import Header from '../components/Header'
import Polling from '../components/essential/Polling'
import Popups from '../components/essential/Popups'
import Web3ReactManager from '../components/essential/Web3ReactManager'
import WarningModal from '../components/Modal/WarningModal'
import Dashboard from './Dashboard'
import TradingRewards from './TradingRewards'
import Bridge from './Bridge'
import { ModalProvider } from 'context/ModalContext'
import { routes } from 'constants/routes'
import Stake from './Stake'
import Bond from './Bond'
import ComingSoonMoadal from 'components/Modal/ComingSoonModal'
import Spinner from 'components/Spinner'
import NoService from './NoService'
import { fetchLocation } from '../utils/fetch/location'

const AppWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  overflowX: 'hidden',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    height: '100vh'
  }
}))

const ContentWrapper = styled('div')({
  width: '100%',
  maxHeight: '100vh',
  overflow: 'auto',
  alignItems: 'center'
})

const BodyWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: `calc(100vh - ${theme.height.header})`,
  padding: `50px 32px 80px calc(${theme.width.sidebar} + 32px)`,
  justifyContent: 'flex-start',
  alignItems: 'center',
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    padding: `20px 20px 80px`
  }
}))

const resource = fetchLocation()

export default function App() {
  return (
    <Suspense fallback={null}>
      <ModalProvider>
        <AppWrapper id="app">
          <ComingSoonMoadal />
          <ContentWrapper>
            <LocatoinVerification resource={resource}>
              <Header />
              <BodyWrapper id="body">
                <Popups />
                <Polling />
                <WarningModal />
                <Web3ReactManager>
                  <Switch>
                    <Route exact strict path={routes.dashboard} component={Dashboard} />
                    <Route exact strict path={routes.trading_rewards} component={TradingRewards} />
                    <Route exact strict path={routes.stake} component={Stake} />
                    <Route exact strict path={routes.bond} component={Bond} />
                    <Route exact strict path={routes.bridge} component={Bridge} />
                    <Route path="/">
                      <Redirect to={routes.dashboard} />
                    </Route>
                  </Switch>
                </Web3ReactManager>
              </BodyWrapper>
            </LocatoinVerification>
          </ContentWrapper>
        </AppWrapper>
      </ModalProvider>
    </Suspense>
  )
}

const isDev = process.env.NODE_ENV === 'development'
function LocatoinVerification({ resource, children }: { resource: { read(): any }; children: React.ReactNode }) {
  const location = resource.read()

  return (
    <Suspense fallback={<Spinner size={100} />}>
      {!isDev && (location === 'US' || location === 'CN') ? <NoService /> : children}
      {/*{location === 'US' || location === 'CN' || !location || location === 'Not found' ? children : children}*/}
    </Suspense>
  )
}
