
import React from 'react';
import styles from './app.module.scss';
// import './app.css'//ModuleFederationPlugin 引入的模块无法隔离样式测试
import { lazy, Suspense } from 'react';
const RemoteApp1 = lazy(() => import('app1/App'));
const RemoteApp2 = lazy(() => import('app2/App'));
// const RemoteApp3 = lazy(() => import('viteRemote/App'));

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.item}>App主容器</div>
      <div className={styles.item}>
        <Suspense fallback={<div>Loading...</div>}>
          <RemoteApp1 className={styles.remote1} />
        </Suspense>
      </div>
      <div className={styles.item}>
        <Suspense fallback={<div>Loading...</div>}>
          <RemoteApp2 className={styles.remote2} />
        </Suspense>
      </div>
      {/* <div className={styles.item}>
        <Suspense fallback={<div>Loading...</div>}>
          <RemoteApp3 className={styles.remote3} />
        </Suspense>
      </div> */}

    </div>
  );
}

export default App;
