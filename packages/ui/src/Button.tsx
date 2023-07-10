import { default as MuiButton, ButtonProps } from '@mui/material/Button';
import { router } from '@forge/bridge';

export const Button = (props: ButtonProps) => {
  const handleLinkClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.href) {
      e.preventDefault();
      await router.open(props.href);
    }
  };
  return <MuiButton onClick={handleLinkClick} {...props} />;
}