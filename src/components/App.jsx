import { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import { WindowedChat } from 'utils/Chat/ChatWindowed/WindowedChat';
import { Loader } from './SharedLayout/Loaders/Loader';

const Streams = lazy(() =>
  import(/* webpackChunkName: "Streams page" */ '../pages/Streams/Streams')
);

const Stream = lazy(() =>
  import(/* webpackChunkName: "Stream page" */ '../pages/Streams/Stream/Stream')
);

const MyWSKM = lazy(() =>
  import(/* webpackChunkName: "My WSKM Page" */ '../pages/MyWSKM/MyWSKM')
);

const MyWSKMPl = lazy(() =>
  import(/* webpackChunkName: "My WSKM Demo Page" */ '../pages/MyWSKM/MyWSKMPl')
);

const UniUserAdminPanel = lazy(() =>
  import(
    /* webpackChunkName: "Polish University Users Admin Panel page" */ '../pages/Streams/UserAdminPanel/UniUserAdminPanel'
  )
);

const PointsAdminPanel = lazy(() =>
  import(
    /* webpackChunkName: "Points Admin page" */ '../pages/Streams/AdminPanel/PointsAdminPanel'
  )
);

const NotFound = lazy(() =>
  import(/* webpackChunkName: "Not Found" */ '../pages/NotFound/NotFound')
);

export const App = () => {
  return (
    <>
      <Toaster
        containerStyle={{
          top: '10%',
        }}
      />
      <Suspense fallback={Loader} noindex={true}>
        <Routes noindex={true}>
          <Route index path="/" element={<MyWSKM />} noindex={true}></Route>
          <Route
            path="admin"
            element={<UniUserAdminPanel uni={'WSKM'} lang={'pl'} />}
            noindex={true}
          />
          <Route
            path="admin-points"
            element={<PointsAdminPanel />}
            noindex={true}
          />
          <Route path="*" element={<NotFound />} noindex={true} />
          <Route path="/demo" element={<MyWSKMPl />} noindex={true} />
          <Route path="lesson" element={<Streams />} noindex={true}>
            <Route path="cnc" element={<Stream />} noindex={true} />
            <Route
              path="cnc-chat"
              element={<WindowedChat />}
              noindex={true}
            />
            <Route path="prep" element={<Stream />} noindex={true} />
            <Route path="prep-chat" element={<WindowedChat />} noindex={true} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};
