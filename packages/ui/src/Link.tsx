import * as React from 'react';
import { router } from '@forge/bridge';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
}

export const Link = (props: LinkProps) => {
  const { children, href, ...rest } = props;
  const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    console.log('Link clicked');
    e.preventDefault();
    console.log('Opening browser')
    await router.open(href);
    console.log('Browser opened')
  };
  return (
    <a href={href} {...rest} onClick={handleLinkClick}>
      {children}
    </a>
  );
};
