import AppLayout from './AppLayout';
import { useSelector } from '../hooks/useRedux';
import Confirm from '../pages/Confirm';
import Index from '../pages/Index';
import Settings from '../pages/Settings';

const PageSwitcher = () => {
  const index = useSelector((x) => x.index != null);
  const settings = useSelector((x) => x.settings != null);
  return (
    <AppLayout>
      {index && <Index />}
      {settings && <Settings />}
      <Confirm />
    </AppLayout>
  );
};

export default PageSwitcher;
