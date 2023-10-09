import { FC, MouseEventHandler } from 'react'

interface TabProps {
  tab: {
    name: string
    icon: string
  }
  onClick: MouseEventHandler<HTMLButtonElement>
  isFilterTab?: boolean
  activeTab?: string
}

const Tab: FC<TabProps> = (props) => {
  console.log(props)
  return (
    <div>Tab</div>
  )
}

export default Tab
