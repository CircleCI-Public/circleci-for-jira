import * as React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
}

export const Link = (props: LinkProps) => {
  const { children, href, ...rest } = props;
  
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
};
