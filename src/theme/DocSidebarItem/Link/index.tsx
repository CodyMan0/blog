import React from 'react';
import Link from '@theme-original/DocSidebarItem/Link';
import type LinkType from '@theme/DocSidebarItem/Link';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof LinkType>;

export default function LinkWrapper(props: Props): React.JSX.Element {
  const {item} = props;
  const status = item.customProps?.status as string | undefined;

  return (
    <div className="sidebar-item-with-badge">
      <Link {...props} />
      {status && (
        <span
          className={`sidebar-badge sidebar-badge--${status}`}
          title={status === 'done' ? '완료' : '진행중'}
        />
      )}
    </div>
  );
}
