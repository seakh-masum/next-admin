import { useContext } from 'react'
import { DialogContext } from 'shared/contexts/dialog.context'


const useModal = () => {
  const context = useContext(DialogContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a UserProvider')
  }

  return context
}

export default useModal;