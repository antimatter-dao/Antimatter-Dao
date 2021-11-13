import { styled } from '@mui/material'

export const SwitchTabWrapper = styled('div')(({ theme }) => ({
  borderBottom: '1px solid ' + theme.palette.background.default,
  whiteSpace: 'nowrap'
}))

export const Tab = styled('button', { shouldForwardProp: () => true })(({ theme, selected }: any) => ({
  border: 'none',
  background: 'none',
  padding: '14px 0',
  marginRight: '40px',
  fontSize: '16px',
  fontWeight: 700,
  color: selected ? theme.palette.text.primary : theme.palette.text.secondary,
  borderBottom: selected ? '3px solid ' + theme.palette.primary.main : '3px solid transparent',
  transition: '0.3s',
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

// function SwitchTab({
//   currentTab,
//   onTabClick
// }: {
//   currentTab: UserInfoTabs
//   onTabClick: (tab: UserInfoTabs) => () => void
// }) {
//   return (
//     <SwitchTabWrapper>
//       {Object.keys(UserInfoTabRoute).map(tab => {
//         const tabName = UserInfoTabRoute[tab as keyof typeof UserInfoTabRoute]
//         return (
//           <Tab key={tab} onClick={onTabClick(tab as UserInfoTabs)} selected={currentTab === tab}>
//             {tabName}
//           </Tab>
//         )
//       })}
//     </SwitchTabWrapper>
//   )
// }
