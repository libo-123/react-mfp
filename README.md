# React Webpack 5 模块联邦项目

## 项目介绍

这个项目展示了如何使用 Webpack 5 的模块联邦（Module Federation）功能在 React 应用程序中实现微前端架构。模块联邦允许多个独立部署的应用程序共享代码和组件，从而实现真正的分布式前端开发。

## 什么是模块联邦？

模块联邦是 Webpack 5 引入的一项革命性功能，它允许 JavaScript 应用在运行时动态加载来自其他应用的代码。这使得：

- 多个团队可以独立开发和部署前端应用
- 应用之间可以共享组件和逻辑
- 实现真正的微前端架构，而不需要 iframe 或其他复杂解决方案

## 项目结构

```
project-root/
├── main_app/         # 主应用（消费远程模块）
├── app1/      # 远程应用1（提供模块）
├── app2/      # 远程应用2（提供模块）
├── app3-for-vite/    # 远程应用3（提供模块）
└── shared/           # 共享依赖和组件
```

## 核心概念

1. **Host（主机）**：消费远程模块的应用
2. **Remote（远程）**：暴露模块给其他应用的应用
3. **Shared（共享）**：在应用之间共享的依赖，如 React、Redux 等

## 配置示例

### 远程应用配置

```javascript
// webpack.config.js (remote-app)
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  // ...其他 webpack 配置
  plugins: [
    new ModuleFederationPlugin({
      name: 'remoteApp',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button',
        './Header': './src/components/Header',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^17.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^17.0.0' }
      },
    }),
  ],
};
```

### 主应用配置

```javascript
// webpack.config.js (host-app)
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  // ...其他 webpack 配置
  plugins: [
    new ModuleFederationPlugin({
      name: 'hostApp',
      remotes: {
        remoteApp: 'remoteApp@http://localhost:3001/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^17.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^17.0.0' }
      },
    }),
  ],
};
```

## 在主应用中使用远程组件

```jsx
import React, { Suspense } from 'react';

// 动态导入远程组件
const RemoteButton = React.lazy(() => import('remoteApp/Button'));
const RemoteHeader = React.lazy(() => import('remoteApp/Header'));

function App() {
  return (
    <div>
      <h1>主应用</h1>
      <Suspense fallback={<div>加载中...</div>}>
        <RemoteHeader />
        <RemoteButton />
      </Suspense>
    </div>
  );
}

export default App;
```

## 启动项目

1. 启动远程应用：
```bash
cd app1
npm install
npm start
```

2. 启动主应用：
```bash
cd main-app
npm install
npm start
```

## 模块联邦的优势

1. **独立部署**：每个应用可以独立开发、测试和部署
2. **团队自治**：不同团队可以使用不同的技术栈开发各自的应用
3. **代码共享**：避免重复开发相同的功能和组件
4. **运行时集成**：应用在运行时动态加载所需的模块
5. **版本控制**：可以指定共享依赖的版本要求

## 注意事项

1. 确保共享依赖的版本兼容
2. 处理好加载失败的情况
3. 考虑应用间通信的方式
4. 注意跨域问题的处理

## 参考资源

- [Webpack 模块联邦官方文档](https://webpack.js.org/concepts/module-federation/)
- [Module Federation Examples](https://github.com/module-federation/module-federation-examples)

## 贡献指南

欢迎提交 Issue 和 Pull Request 来完善这个项目！

## 许可证

MIT
