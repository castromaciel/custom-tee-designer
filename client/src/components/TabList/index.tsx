import { FC, Fragment, MouseEventHandler } from 'react';
import { Tab } from '..';

interface Item {
  name: string,
  icon: string,
}

interface TabListProps {
  items: Item[]
  onTabClick: MouseEventHandler<HTMLDivElement>
  activeFilterTab?: Record<string, boolean>
  isFilterTab?: boolean
}

const TabList: FC<TabListProps> = ({
  activeFilterTab, items, onTabClick, isFilterTab = false
}) => {

  if (!items.length) return null

  return (
    <Fragment>
      {
        items?.map((item) => (
          <Tab
            tab={item}
            key={item?.name}
            isFilterTab={isFilterTab}
            onClick={onTabClick}
            isActiveTab={activeFilterTab?.[item.name]} 
          />
        ))
      }
    </Fragment>
  )
}

export default TabList
