import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useLayoutEffect, useState } from 'react';
import { useActions, useSelector } from '../hooks/useRedux';

export default function Confirm() {
  const confirm = useSelector((x) => x.confirm);
  const [keepConfirm, setKeepConfirm] = useState<typeof confirm>(undefined);
  const actions = useActions();
  useLayoutEffect(() => {
    setKeepConfirm(confirm ?? keepConfirm);
  }, [confirm, keepConfirm]);

  return (
    <div>
      <Dialog open={confirm != null}>
        {keepConfirm && (
          <>
            <DialogTitle id="alert-dialog-title">{keepConfirm.title}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">{keepConfirm.message}</DialogContentText>
            </DialogContent>
            <DialogActions>
              {keepConfirm.cancel != null && (
                <Button onClick={() => actions.closeConfirm(false)} autoFocus>
                  {keepConfirm.cancel}
                </Button>
              )}
              <Button onClick={() => actions.closeConfirm(true)}>{keepConfirm.accept}</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
