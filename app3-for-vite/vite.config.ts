// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import federation from "@originjs/vite-plugin-federation";
// import topLevelAwait from 'vite-plugin-top-level-await'

// // https://cn.vitejs.dev/config/  用的是rollup打包
// export default defineConfig(({ command, mode }) => {
//     // 这里也引入app2 自身暴露出去
//     return {
//         server: {
//             port: 7004
//         },
//         build: {
//             modulePreload: false,
//             target: 'esnext',
//             minify: false,
//             cssCodeSplit: false
//         },
//         plugins: [
//             topLevelAwait(),
//             react(),
//             federation({
//                 name: 'viteRemote',
//                 filename: 'remoteEntry.js',
//                 exposes: {
//                     './App': './src/App.tsx'
//                 },
//                 shared: [
//                     "react", "react-dom"
//                 ]
//             })
//         ]
//     }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "viteRemote",
      filename: "remoteEntry.js",
      exposes: {
        './App': './src/App'
      },
      shared: ['react', 'react-dom']
    })
  ],
  server: {
    port: 7004
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})