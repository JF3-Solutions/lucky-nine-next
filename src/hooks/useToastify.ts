import { toast } from 'react-toastify';

export const useToastify = () => {
  const toastifyError = (errorMessage: string, containerId?: string) =>
    toast.error(errorMessage, {
      position: 'top-center',
      draggablePercent: 50,
      containerId,
    });

  const toastifySuccess = (successMessage: string, containerId?: string) =>
    toast.success(successMessage, {
      position: 'top-center',
      draggablePercent: 50,
      containerId,
    });

  const toastifyInfo = (successMessage: string, containerId?: string) =>
    toast.info(successMessage, {
      position: 'top-center',
      draggablePercent: 50,
      containerId,
    });

  return {
    toastifyError,
    toastifySuccess,
    toastifyInfo,
  };
};
