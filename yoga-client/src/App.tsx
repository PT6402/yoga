import { HelmetProvider, Helmet } from "react-helmet-async";
import RouteApp from "./routes";
import { Provider } from "react-redux";
import { store } from "./context/store";
export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Tanie || Yoga - Equips</title>
        <meta name="description" content="Tanie || Yoga - Equips" />
      </Helmet>

      {/* MAIN APP */}
      <div className="bg-white text-base dark:bg-slate-900 text-slate-900 dark:text-slate-200">
        <Provider store={store}>
          <RouteApp />
        </Provider>
      </div>
    </HelmetProvider>
  );
}
