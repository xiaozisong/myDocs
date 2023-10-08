
const { defaultTheme } = require('vuepress')

import { sitemapPlugin } from "vuepress-plugin-sitemap2";
const { googleAnalyticsPlugin } = require('@vuepress/plugin-google-analytics')
const { docsearchPlugin } = require('@vuepress/plugin-docsearch')
import { navbarZh, sidebarZh } from './configs'

module.exports = {
  base: './',
  lang: 'zh-CN',
  title: 'xzs',
  description: '前端学习',
  head: [['link', { rel: 'icon', href: '/images/head.jpeg' }]],

  open: true,
  theme: defaultTheme({
    logo: '/images/head.jpeg',
    sidebarDepth: 3,
    repo: 'https://github.com/xiaozisong',
    editLinkText: '编辑此页',
    lastUpdatedText: '上次更新',
    contributorsText: '贡献者',
    tip: '提示',
    warning: '注意',
    danger: '警告',
    // 默认主题配置
    navbar: navbarZh,
    sidebar: sidebarZh
  }),
  // 插件
  plugins: [
    docsearchPlugin({
      appId: 'X81WIK02LW',
      apiKey: 'c1f93da97a38f22309a344413bd81a5c',
      indexName: 'sthawn',
      locales: {
        '/zh/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
              buttonAriaLabel: '搜索文档',
            },
            modal: {
              searchBox: {
                resetButtonTitle: '清除查询条件',
                resetButtonAriaLabel: '清除查询条件',
                cancelButtonText: '取消',
                cancelButtonAriaLabel: '取消',
              },
              startScreen: {
                recentSearchesTitle: '搜索历史',
                noRecentSearchesText: '没有搜索历史',
                saveRecentSearchButtonTitle: '保存至搜索历史',
                removeRecentSearchButtonTitle: '从搜索历史中移除',
                favoriteSearchesTitle: '收藏',
                removeFavoriteSearchButtonTitle: '从收藏中移除',
              },
              errorScreen: {
                titleText: '无法获取结果',
                helpText: '你可能需要检查你的网络连接',
              },
              footer: {
                selectText: '选择',
                navigateText: '切换',
                closeText: '关闭',
                searchByText: '搜索提供者',
              },
              noResultsScreen: {
                noResultsText: '无法找到相关结果',
                suggestedQueryText: '你可以尝试查询',
                reportMissingResultsText: '你认为该查询应该有结果？',
                reportMissingResultsLinkText: '点击反馈',
              },
            },
          },
        },
      },
    }),
    sitemapPlugin({
      hostname: "https://xiaozisong.github.io",
    }),
    googleAnalyticsPlugin({
      id: 'G-KEP9J329HR'
    }),
  ],

  markdown: {
    anchor: {
      level: [1, 2, 3, 4, 5, 6]
    },
  },
}