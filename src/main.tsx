
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";

import AppRouter from './routes/AppRoutes'
import { Provider } from 'react-redux'
import { store } from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
<Provider store={store}>
  <QueryClientProvider client={queryClient}>
  <AppRouter />
  <ToastContainer />
  </QueryClientProvider>
</Provider>

)
