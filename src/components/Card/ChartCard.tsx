import React from 'react'
import Card from './Card'

interface Props {
  title: string
  width?: string | number
  height?: string | number
  value?: string | number
  changeRate?: string
  children?: React.ReactNode
}

export default function ChartCard(props: Props) {
  const { title, width, height, children } = props

  return (
    <Card title={title} width={width} height={height}>
      {children}
    </Card>
  )
}
