import type { FC } from "react";
import { IoProvider } from "socket.io-react-hook";

import { RootStoreContext, RootStore } from "stores/root";
import AppFooter from "./components/AppFooter/AppFooter";
import AppNavigation from "./components/AppNavigation/AppNavigation";
import AppRoute from "components/AppRoute";

const rootStore = new RootStore();

const App: FC = () => (
  <IoProvider>
    <AppNavigation />
    <main className="page">
      <RootStoreContext.Provider value={rootStore}>
        <AppRoute />
      </RootStoreContext.Provider>
    </main>
    <AppFooter />
  </IoProvider>
);

export default App;
