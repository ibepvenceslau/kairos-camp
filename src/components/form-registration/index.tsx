import { ToastProvider } from '@/contexts/toast.context';
import { Form } from '@/components/form-registration/form';
import { LoadingProvider } from '@/contexts/loading.context';

export const FormRegistration = () => {
  return (
    <ToastProvider>
      <LoadingProvider>
        <Form />
      </LoadingProvider>
    </ToastProvider>
  );
};
