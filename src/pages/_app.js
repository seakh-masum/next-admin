import 'styles/globals.css';
import { useRouter } from 'next/router';
import { Suspense, useState, useEffect, useContext } from 'react';
import Layout from 'components/Layout';
import Snackbar from 'components/Snackbar'
import dynamic from 'next/dynamic';
import { checkCookie, checkLocalStorage, getLocalStorage, setLocalStorage } from 'shared/helper/storage';
import { ThemeContext } from 'shared/contexts/theme.context';
import { setColorVariable } from 'shared/helper/utility';
import { STORAGE_KEY } from 'shared/helper/ContstantData';
import Dialog from 'components/Dialog';
import { DialogContext, DialogProvider } from 'shared/contexts/dialog.context';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const AuthLayout = dynamic(() => { return import('./auth') });
  const [isAuthenticated, setAuthentication] = useState(false);
  const [loader, setLoader] = useState(false);
  const theme = useContext(ThemeContext);
  const dialogContext = useContext(DialogContext);
  const [isDialogOpen, setIsDialogOpen] = useState(true);


  useEffect(() => {
    setLoader(true);
    if (loader) {
      if (checkLocalStorage(STORAGE_KEY.theme)) {
        const existingTheme = getLocalStorage(STORAGE_KEY.theme);
        setColorVariable(existingTheme.value);
      } else {
        setColorVariable(theme);
      }
      setAuthentication(checkCookie('user'));
      if (!isAuthenticated || !router.pathname.includes('auth')) {
        return;
      } else {
        router.push('/auth/login');
      }
    }
  }, [loader])


  const closeSnackbar = () => {
    const snackbar = document.getElementById("snackbar");
    if (snackbar) {
      snackbar.classList.add("hidden")
    }
  }

  const getLayout = (page) => {
    return router.pathname.includes('auth') ? <AuthLayout>{page}</AuthLayout> : <Layout>{page}</Layout>;
  }

  const closeDialog = () => {
    setIsDialogOpen(false);
  }


  return (
    <Suspense fallback={<></>}>
      <DialogProvider title='check'>
        {getLayout(<Component {...pageProps} />)}
      </DialogProvider>
      <Snackbar closeSnackbar={closeSnackbar} />
      {/* <DialogContext.Provider value={{ isDialogOpen, closeDialog }}>
        {isDialogOpen && <Dialog title={dialogContext.dialogTitle} width={dialogContext.dialogSize} closeModal={closeDialog}>{dialogContext.dialog}</Dialog>}
      </DialogContext.Provider> */}
    </Suspense>
  )
}

export default MyApp;
