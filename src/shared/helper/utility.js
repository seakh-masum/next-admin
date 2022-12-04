const showError = (message) => {
  renderSnackbar(message, 'red', "fa-circle-exclamation");
};

const showSuccess = (message) => {
  renderSnackbar(message, 'green', "fa-circle-check");
};

const renderSnackbar = (message, className, iconName) => {
  const snackbar = document.getElementById("snackbar");
  const snackbarText = document.getElementById("snackbar-message");
  const snackbarIcon = document.getElementById("snackbar-icon");
  if (snackbar && snackbarText) {
    // snackbar.classList.add(`bg-${className}-400`);
    snackbar.classList = `py-3 px-4 gap-2 fixed left-1/2 -translate-x-1/2 bottom-4 shadow-xl rounded-xl max-w-40 z-[9000] flex flex-row items-center bg-${className}-400`;
    snackbar.classList.remove('hidden');
    snackbarIcon.classList.add(iconName, `text-${className}-700`);
    snackbarText.innerText = message;
  }

  setTimeout(() => {
    snackbar.classList = 'hidden';
  }, 2000);
};

const setColorVariable = (value) => {
  Object.keys(value).forEach((key) => {
    document.documentElement.style.setProperty(
      `--color${key}`,
      `${value[key]}`
    );
  });
}

const createUser = (user) => {
  const { displayName, email, emailVerified, isAnonymous, photoURL, uid } = user;
  const currentUser = { displayName, email, emailVerified, isAnonymous, photoURL, uid }
  return currentUser;
}

const setExpiryDate = (days) => {
  var date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  return date.toUTCString();
}

const makeSelectArr = (arr) => {
  return arr.map((item) => {
    return { label: capitalizeFirstLetter(item), value: item };
  });
}

function capitalizeFirstLetter(str) {
  return String(str)?.charAt(0).toUpperCase() + String(str)?.slice(1);
}

const makeExpiryDate = (date) => {
  if (date) {
    const [year, month] = date.split('-');
    return `${month}/${year.slice(-2)}`;
  }
}

const makeMobileData = (mainArr, columnArr) => {

}

export { showError, showSuccess, setColorVariable, createUser, setExpiryDate, makeSelectArr, makeExpiryDate, capitalizeFirstLetter };