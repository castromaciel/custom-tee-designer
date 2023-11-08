import { FC, Fragment, MouseEventHandler } from 'react';
import { Tab } from '..';

interface Item {
  name: string,
  icon: string,
}

interface TabListProps {
  items: Item[]
  onTabClick: MouseEventHandler<HTMLDivElement>
}

const TabList: FC<TabListProps> = ({
  items, onTabClick
}) => {

  if (!items.length) return null

  return (
    <Fragment>
      {
        items?.map((item) => (
          <Tab tab={item} key={item?.name} onClick={onTabClick} />
        ))
      }
    </Fragment>
  )
}

export default TabList
