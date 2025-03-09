'use client';

import { Provider } from 'react-redux';
import { setupStore } from '../store/store';

const store = setupStore();

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
