import './App.css';
import Breadcrumb from './components/Breadcrumb';
import React from 'react';
const App2 = React.lazy(() => import('childApp1/App'));
function App() {
  return (
    <div className="App">
      <Breadcrumb />
      <React.Suspense fallback={<div>loading...</div>}>
        <App2 />
      </React.Suspense>
    </div>
  );
}

export default App;
