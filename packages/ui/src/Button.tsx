import { router } from '@forge/bridge';
import { ButtonProps, default as MuiButton } from '@mui/material/Button';

export const Button = (props: ButtonProps) => {
  const handleLinkClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.href) {
      e.preventDefault();
      await router.open(props.href);
    }
  };
  return <MuiButton onClick={handleLinkClick} {...props} />;
};
