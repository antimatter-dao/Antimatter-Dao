import { useState, useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  AppBar,
  styled,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  IconButton,
  useTheme,
  MenuItem,
  Box,
  Typography
} from '@mui/material'
import { Menu } from '@mui/icons-material'
import { ChainList, ChainListMap } from 'constants/chain'
import Select from 'components/Select/Select'
import LogoText from 'components/LogoText'
import Divider from 'components/Divider'
import { ExternalLink } from 'theme/components'
import Web3Status from './Web3Status'
import Image from 'components/Image'
import ChainSwap from 'assets/svg/antimatter.svg'
import { ReactComponent as DashboardIcon } from 'assets/svg/dashboard_icon.svg'
import { ReactComponent as TradingRewardIcon } from 'assets/svg/trading_reward_icon.svg'
import { ReactComponent as StakeIcon } from 'assets/svg/stake_icon.svg'
import { ReactComponent as BondIcon } from 'assets/svg/bond_icon.svg'
import { ReactComponent as BridgeIcon } from 'assets/svg/bridge_icon.svg'
import { ReactComponent as GovernanceIcon } from 'assets/svg/governance_icon.svg'
import { ReactComponent as DocsIcon } from 'assets/svg/docs_icon.svg'
import { ReactComponent as ForumIcon } from 'assets/svg/forum_icon.svg'
import { routes } from 'constants/routes'
import { useActiveWeb3React } from 'hooks'

interface TabContent {
  title: string
  route?: string
  link?: string
  titleContent?: JSX.Element
  icon?: JSX.Element
}

interface Tab extends TabContent {
  subTab?: TabContent[]
}

export const Tabs: { tag: string; tabs: Tab[] }[] = [
  {
    tag: 'My Boards',
    tabs: [
      { title: 'Dashboard', route: routes.dashboard, icon: <DashboardIcon className="filledSvg" /> },
      { title: 'Trading Rewards', route: routes.trading_rewards, icon: <TradingRewardIcon /> },
      { title: 'Stake', route: routes.stake, icon: <StakeIcon /> },
      { title: 'Bond', route: routes.bond, icon: <BondIcon /> },
      { title: 'Bridge', route: routes.bridge, icon: <BridgeIcon /> }
    ]
  },
  {
    tag: 'community',
    tabs: [
      {
        title: 'Governance',
        link: 'https://governance.antimatter.finance/',
        icon: <GovernanceIcon className="filledSvg" />
      },
      { title: 'Docs', link: 'https://docs.antimatter.finance/ ', icon: <DocsIcon /> },
      { title: 'Forum', link: 'https://forum.antimatter.finance/', icon: <ForumIcon /> }
    ]
  }
]

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'relative',
  height: theme.height.header,
  backgroundColor: theme.palette.background.default,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: 'none',
  padding: '44px 32px 0',
  paddingLeft: `calc(${theme.width.sidebar} + 32px)`,
  [theme.breakpoints.down('sm')]: {
    padding: '20px 24px 0'
  }
}))

const MainLogo = styled(NavLink)({
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    cursor: 'pointer'
  }
})

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  opacity: 0.6,
  display: 'flex',
  alignItems: 'center',
  '&.active': {
    opacity: 1,
    '& svg': {
      stroke: theme.palette.primary.main
    },
    '& .filledSvg': {
      fill: theme.palette.primary.main,
      stroke: 'none'
    }
  },
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

const StyledExternalLink = styled(ExternalLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  opacity: 0.6,
  display: 'flex',
  alignItems: 'center',
  '&.active': {
    opacity: 1,
    '& svg': {
      stroke: theme.palette.primary.main
    },
    '& .filledSvg': {
      fill: theme.palette.primary.main,
      stroke: 'none'
    }
  },
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

const container = window !== undefined ? () => window.document.body : undefined

export default function Header() {
  const { chainId } = useActiveWeb3React()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()

  const drawer = useMemo(
    () => (
      <Box
        sx={{
          padding: '50px 40px',
          minHeight: '100%'
        }}
        gridTemplateRows="auto auto auto 1fr"
        display="grid"
        justifyContent="space-between"
        gap="52px"
      >
        <Box display="flex" gap="10px" alignItems="center" sx={{ height: 28, marginLeft: '-10px' }}>
          <MainLogo id={'chainswap'} to={'/'}>
            <Image src={ChainSwap} alt={'chainswap'} />
          </MainLogo>
          <Divider orientation="vertical" color="#00000030" sx={{ width: '2px', height: 22 }} />
          <Typography fontSize="16px">Dao</Typography>
        </Box>

        {Tabs.map(({ tag, tabs }) => (
          <List key={tag}>
            <ListItem
              sx={{
                padding: '10px 0',
                fontSize: 12,
                color: theme => theme.palette.text.secondary,
                textTransform: 'uppercase'
              }}
            >
              {tag}
            </ListItem>
            {tabs.map(({ title, route, icon, link }, idx) => (
              <ListItem key={title} sx={{ padding: '10px 0' }}>
                {link ? (
                  <StyledExternalLink href={link}>
                    <ListItemIcon sx={{ color: 'currentColor', minWidth: 40 }}>{icon}</ListItemIcon>
                    <ListItemText
                      primary={title}
                      primaryTypographyProps={{
                        sx: { fontSize: '16px' }
                      }}
                    />
                  </StyledExternalLink>
                ) : (
                  <StyledNavLink
                    key={title + idx}
                    id={`${route}-nav-link`}
                    to={route ?? ''}
                    onClick={() => setMobileOpen(false)}
                    className="link"
                  >
                    <ListItemIcon sx={{ color: 'currentColor', minWidth: 40 }}>{icon}</ListItemIcon>
                    <ListItemText
                      primary={title}
                      primaryTypographyProps={{
                        sx: { fontSize: '16px' }
                      }}
                    />
                  </StyledNavLink>
                )}
              </ListItem>
            ))}
          </List>
        ))}

        <Box sx={{ mt: 'auto', alignSelf: 'flex-end', height: '100%', display: 'flex', alignItems: 'flex-end' }}>
          <Web3Status />
        </Box>
      </Box>
    ),
    []
  )
  return (
    <>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={() => {
          setMobileOpen(false)
        }}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: theme.width.sidebar }
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          boxShadow: 'none',
          '& .MuiPaper-root': {
            borderColor: 'transparent'
          },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: theme.width.sidebar
          }
        }}
        open
      >
        {drawer}
      </Drawer>
      <StyledAppBar>
        <IconButton onClick={() => setMobileOpen(true)} sx={{ display: { xs: 'block', sm: 'none' } }}>
          <Menu />
        </IconButton>
        <Box display="grid" gap="8px">
          <Box display="flex" gap="4px">
            <Typography color="rgba(0,0,0,0.5)">Welcome to Antimatter Dao</Typography>
            <span>👋</span>
          </Box>

          <Typography fontWeight={700} fontSize={32} sx={{ color: theme => theme.palette.text.primary }}>
            {Tabs[0].tabs.find(tab => tab.route === location.pathname)?.title ?? ''}
          </Typography>
        </Box>
        {chainId && ChainListMap[chainId] && (
          <Select
            defaultValue={ChainListMap[chainId].symbol}
            value={ChainListMap[chainId].symbol}
            onChange={() => {}}
            width="140px"
          >
            {ChainList.map(option => (
              <MenuItem
                value={option.symbol}
                key={option.symbol}
                selected={ChainListMap[chainId].symbol === option.symbol}
              >
                <LogoText logo={option.logo} text={option.symbol} gapSize={'small'} fontSize={14} />
              </MenuItem>
            ))}
          </Select>
        )}
      </StyledAppBar>
    </>
  )
}
