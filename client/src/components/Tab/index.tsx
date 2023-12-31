import { useStore } from '@/hooks'
import { CSSProperties, FC, MouseEventHandler } from 'react'

interface TabProps {
  tab: {
    name: string
    icon: string
  }
  onClick: MouseEventHandler<HTMLDivElement>
  isFilterTab?: boolean
  isActiveTab?: boolean
}

const Tab: FC<TabProps> = ({
  onClick, tab, isActiveTab, isFilterTab
}) => {
  const snap = useStore()

  const activeStyles: CSSProperties = isFilterTab && isActiveTab
    ? { backgroundColor: snap.primaryColor, opacity: 0.5 }
    : { backgroundColor: 'transparent', opacity: 1 }

  return (
    <div
      id={tab.name}
      onClick={onClick}
      className={`tab-btn ${isFilterTab ? 'rounded-full glassmorphism' : 'rounded-4'}`}
      style={activeStyles}
    >
      <img 
        src={tab.icon}
        alt={tab.name}
        className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object-contain'}`}
      />
    </div>
  )
}

export default Tab
