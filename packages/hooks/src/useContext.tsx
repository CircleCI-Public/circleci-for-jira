import { view } from '@forge/bridge';
import { useQuery } from '@tanstack/react-query';

export const useContext = () => useQuery(['context'], () => view.getContext());
