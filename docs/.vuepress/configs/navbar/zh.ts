import type { NavbarConfig } from '@vuepress/theme-default'

export const zh: NavbarConfig = [
  {
    text: '指南',
    link: '/zh/guide/',
  },
  {
    text: '参考',
    children: [
      {
        text: 'VuePress',
        children: [
          '/zh/reference/cli.md',
          '/zh/reference/config.md',
          '/zh/reference/frontmatter.md',
          '/zh/reference/components.md',
          '/zh/reference/plugin-api.md',
          '/zh/reference/theme-api.md',
        ],
      },
      {
        text: '打包工具',
        children: [
          '/zh/reference/bundler/webpack.md',
          '/zh/reference/bundler/vite.md',
        ],
      },
      {
        text: '默认主题',
        children: [
          '/zh/reference/default-theme/config.md',
          '/zh/reference/default-theme/frontmatter.md',
          '/zh/reference/default-theme/components.md',
        ],
      },
    ],
  },
  {
    text: '了解更多',
    children: [
      {
        text: '深入',
        children: [
          '/zh/guide/advanced/markdown.md',
          '/zh/guide/advanced/theme.md',
          '/zh/guide/advanced/plugin.md',
        ],
      },
      {
        text: '其他资源',
        children: [
          '/zh/contributing.md',
          {
            text: '更新日志',
            link:
              'https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md',
          },
          {
            text: 'Awesome VuePress',
            link: 'https://github.com/vuepress/awesome-vuepress',
          },
          {
            text: 'v1 文档',
            link: 'https://v1.vuepress.vuejs.org/zh/',
          },
          {
            text: 'v0 文档',
            link: 'https://v0.vuepress.vuejs.org/zh/',
          },
        ],
      },
    ],
  },
]
