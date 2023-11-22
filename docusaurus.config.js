// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'StarRocks',
  tagline: 'StarRocks documentation',
  favicon: 'img/favicon.ico',

  url: 'https://docs.starrocks.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'StarRocks', // Usually your GitHub org/user name.
  projectName: 'starrocks', // Usually your repo name.

  // needed for hosting in S3:
  trailingSlash: true,

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'ignore',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    localeConfigs: {
      en: {
        htmlLang: 'en-US',
      },
      zh: {
        htmlLang: 'zh-CN',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.json'),

          // Edit links for English and Chinese
          editUrl: ({locale, docPath}) => {
              return 'https://github.com/StarRocks/starrocks/edit/main/docs/' + locale + '/' + docPath
          },
          // Versions:
          // We don't want to show `main` or `current`, we want to show the released versions.
          // lastVersion identifies the latest release.
          // onlyIncludeVersions limits what we show.
          // By default Docusaurus shows an "unsupported" banner, but we support multiple
          // versions, so the banner is set to none on the versions other than latest (latest
          // doesn't get a banner by default).
          lastVersion: (() => {
                return 'current';
            })(),

          onlyIncludeVersions: (() => {
                return ['current'];
            })(),

          versions: (() => {
                return { current: { label: 'current' } };
            })(),

        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-VTBXVPZLHB',
          anonymizeIP: true,
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      // This image shows in Slack when you paste a link
      image: 'img/logo.svg',
      navbar: {
        title: 'StarRocks',
        logo: {
          alt: 'StarRocks Logo',
          src: 'img/logo.svg',
          href: 'https://www.starrocks.io/',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'English',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'docsVersionDropdown',
            position: 'left',
            dropdownActiveClassDisabled: true,
          },
          {
            href: 'https://github.com/StarRocks/starrocks',
            label: 'GitHub',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'left',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Documentation',
                to: '/docs/introduction/StarRocks_intro',
              },
            ],
          },
        ],
        copyright: `Docs built with Docusaurus.`,
      },

      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: [
          'java',
          'haskell',
          'matlab',
          'bash',
          'diff',
          'json',
          'scss',
        ],
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'ER08SJMRY1',
  
        // Public API key: it is safe to commit it
        apiKey: '08af8d37380974edb873fe8fd61e8dda',
  
        indexName: 'starrocks',
  
        // Optional: see doc section below
        contextualSearch: true,
  
        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',

      },
    }),
};

module.exports = config;
