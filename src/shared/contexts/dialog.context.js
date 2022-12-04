import Dialog from "components/Dialog";
import DialogContainer from "components/DialogContainer";
import { createContext, useState, useContext, useCallback } from "react";

const defaultValue = { isDialogOpen: true, dialog: <></>, dialogTitle: 'New Heading', dialogSize: '500px' }
export const DialogContext = createContext(defaultValue);


export const DialogProvider = props => {
  const [dialog, setDialog] = useState()
  const dialogContext = useContext(DialogContext);


  const closeDialog = useCallback(() => {
    setDialog()
  }, [setDialog])

  return (
    <DialogContext.Provider value={{ closeDialog, setDialog, ...dialogContext }} {...props} >
      {props.children}
      {dialog && <DialogContainer closeModal={closeDialog}>{dialog}</DialogContainer>}
    </DialogContext.Provider>
  )
}