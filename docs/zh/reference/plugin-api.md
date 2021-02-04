# 插件 API

插件需要在初始化之前使用。基础配置项会在使用插件时立即被处理：

- [name](#name)
- [multiple](#multiple)
- [plugins](#plugins)

下列 Hooks 会在初始化 App 时处理：

- [extendsMarkdown](#extendsmarkdown)
- [onInitialized](#oninitialized)

下列 Hooks 会在准备文件时处理：

- [extendsPageData](#extendspagedata)
- [clientAppEnhanceFiles](#clientappenhancefiles)
- [clientAppRootComponentFiles](#clientapprootcomponentfiles)
- [clientAppSetupFiles](#clientappsetupfiles)
- [onPrepared](#onprepared)

下列 Hooks 会在 dev / build 时处理：

- [alias](#alias)
- [define](#define)
- [onGenerated](#ongenerated)

## 基础配置项

### name

- 类型： `string`

- 详情：

  插件的名称。

  它会被用来识别插件，以避免多次使用同一个插件，因此应确保你的插件名称是独一无二的。

  建议使用以下命名格式：

  - 非 Scoped: `vuepress-plugin-foo`
  - Scoped: `@org/vuepress-plugin-foo`

- 参考：
  - [插件 API > multiple](#multiple)

### multiple

- 类型： `boolean`

- 默认值： `false`

- 详情：

  插件是否能够被多次使用。

  如果设置为 `false` ，当有相同名称的插件被使用时，先使用的会被后使用的替换掉。

  如果设置为 `true` ，相同名称的插件可以被多次使用且不会被替换。

- 参考：
  - [插件 API > name](#name)

### plugins

- 类型： `PluginConfig[]`

- 详情：

  要使用的插件。

  一个插件可以通过该选项来使用其他的插件。

  该配置项接收一个数组，其中的每一个数组项是一个包含两个元素的元组：

  - 第一个元素是插件名称或插件本身。它可以接收插件名称、插件简称、插件的绝对路径或插件对象。
  - 第二个元素是插件选项。它可以接收布尔值或一个对象。设置为 `false` 可以禁用该插件。设置为 `true` 可以启用该插件但不设置任何选项。使用对象可以启用该插件并且传入选项。

  为了简便起见，你可以将上述元组的第一个元素直接作为数组项，它等价于启用该插件但不设置任何选项。

- 示例：

```js
module.exports = {
  plugins: [
    // 包含两个元素的元组
    ['vuepress-plugin-foo', false],
    ['bar', true],
    ['/path/to/local/plugin', { /* 选项 */ }],
    [require('vuepress-plugin-baz'), true],

    // 只使用第一个元素
    'foobar', // 等价于 ['foobar', true]
  ],
}
```

- 参考：
  - [指南 > 插件](../guide/plugin.md)

## 开发 Hooks

### alias

- 类型： `Record<string, any> | ((app: App) => Record<string, any>)`

- 详情：

  定义路径别名。

  该 Hook 接收一个对象，或者一个返回对象的函数。

- 示例：

```js
module.exports = {
  alias: {
    '@alias': '/path/to/alias',
  },
}
```

### define

- 类型： `Record<string, any> | ((app: App) => Record<string, any>)`

- 详情：

  定义全局常量。

  该 Hook 接收一个对象，或者一个返回对象的函数。

  它可以被用于向客户端文件传递变量。注意这里的值都会自动被 `JSON.stringify()` 处理。

- 示例：

```js
module.exports = {
  define: {
    __GLOBAL_BOOLEAN__: true,
    __GLOBAL_STRING__: 'foobar',
    __GLOBAL_OBJECT__: { foo: 'bar' },
  },
}
```

### extendsMarkdown

- 类型： `(md: Markdown, app: App) => void`

- 详情：

  Markdown 增强。

  该 Hook 接收一个函数，在参数中会收到一个由 [markdown-it](https://github.com/markdown-it/markdown-it) 提供的 `Markdown` 实例。

  它可以用来添加额外的 markdown-it 插件、应用额外的自定义功能。

- 示例：

```js
module.exports = {
  extendsMarkdown: (md) => {
    md.use(plugin1)
    md.linkify.set({ fuzzyEmail: false })
  },
}
```

### extendsPageData

- 类型： `(page: Page, app: App) => Record<string, any> | Promise<Record<string, any>>`

- 详情：

  页面数据扩展。

  该 Hook 接收一个函数，在参数中会收到一个 `Page` 实例。返回的对象会被合并到页面数据中，可以在客户端代码中使用。

- 示例：

```js
module.exports = {
  extendsPageData: (page) => {
    const meta = 'foobar'
    return { meta }
  },
}
```

  在客户端组件中：

```js
import { usePageData } from '@vuepress/client'

export default {
  setup() {
    const page = usePageData()
    console.log(page.value.meta) // foobar
  },
}
```

## 客户端文件 Hooks

### clientAppEnhanceFiles

- 类型： `string | string[] | ((app: App) => string | string[] | Promise<string | string[]>)`

- 详情：

  Client App Enhancement 文件路径。

  该 Hook 接收文件绝对路径，或者一个返回路径的函数。

- 示例：

```js
module.exports = {
  clientAppEnhanceFiles: '/path/to/clientAppEnhance.js',
}
```

### clientAppRootComponentFiles

- 类型： `string | string[] | ((app: App) => string | string[] | Promise<string | string[]>)`

- 详情：

  Client Root Component 文件路径。

  该 Hook 接收文件绝对路径，或者一个返回路径的函数。

- 示例：

```js
module.exports = {
  clientAppRootComponentFiles: '/path/to/RootComponent.vue',
}
```

### clientAppSetupFiles

- 类型： `string | string[] | ((app: App) => string | string[] | Promise<string | string[]>)`

- 详情：

  Client App Setup 文件路径。

  该 Hook 接收文件绝对路径，或者一个返回路径的函数。

- 示例：

```js
module.exports = {
  clientAppSetupFiles: '/path/to/clientAppSetup.js',
}
```

## 生命周期 Hooks

### onInitialized

- 类型： `(app: App) => void | Promise<void>`

- 详情：

  该 Hook 会在 VuePress App 初始化后被立即调用。

### onPrepared

- 类型： `(app: App) => void | Promise<void>`

- 详情：

  该 Hook 会在 VuePress App 完成文件准备后被立即调用。

### onGenerated

- 类型： `(app: App) => void | Promise<void>`

- 详情：

  该 Hook 会在 VuePress App 完成静态文件生成后被立即调用。
