import type { DefaultTheme } from 'vitepress'

export const legalEN = {
  text: 'English',
  collapsed: false,
  items: [
    { text: 'Legal Notice', link: '/legal/legal-notice' },
    { text: 'Cookie Notice', link: '/legal/cookie-notice' },
    { text: 'Privacy Policy', link: '/legal/privacy-policy' },
    { text: 'Terms and Conditions', link: '/legal/terms-and-conditions' },
  ],
}

export const legalES = {
  text: 'Español',
  collapsed: false,
  items: [
    { text: 'Aviso legal', link: '/es/legal/legal-notice' },
    { text: 'Aviso de cookies', link: '/es/legal/cookie-notice' },
    { text: 'Política de privacidad', link: '/es/legal/privacy-policy' },
    { text: 'Términos y condiciones', link: '/es/legal/terms-and-conditions' },
  ],
}

export const sidebarEN: DefaultTheme.Sidebar = {
  // '/blog/': [
  //   {
  //     text: 'Announcements',
  //     collapsed: false,
  //     items: [
  //       { text: 'Netzo Beta 01', link: '/blog/posts/announcements-netzo-beta-01' },
  //     ],
  //   },
  //   {
  //     text: 'Technology and Tools',
  //     collapsed: false,
  //     items: [
  //       { text: 'Problems of UI-based Platforms', link: '/blog/posts/technology-problems-of-ui-based-tools' },
  //       { text: 'Maximizing Efficiency and Productivity Through Automation', link: '/blog/posts/technology-maximizing-efficiency-and-productivity-through-automation' },
  //     ],
  //   },
  //   // {
  //   //   text: 'Vision',
  //   //   collapsed: false,
  //   //   items: [
  //   //     { text: 'Unlock the Power of IoT Interoperability', link: '/blog/posts/vision-unlock-the-power-of-iot-interoperability' },
  //   //     { text: 'The Unexploited Potential of IoT', link: '/blog/posts/vision-the-unexploited-potential-of-iot' },
  //   //     { text: 'A Small Team on a Grand Mission', link: '/blog/posts/vision-a-small-team-on-a-grand-mission' },
  //   //   ],
  //   // },
  // ],
  '/docs/': [
    {
      text: 'Introduction',
      collapsed: false,
      items: [
        { text: 'Getting Started', link: '/docs/introduction/getting-started' },
        { text: 'What is a Project?', link: '/docs/introduction/what-is-a-project' },
        { text: 'How to Deploy', link: '/docs/introduction/how-to-deploy' },
        { text: 'Use Cases', link: '/docs/introduction/use-cases' },
        { text: 'Core Concepts', link: '/docs/introduction/core-concepts' },
        // { text: 'Troubleshooting', link: '/docs/introduction/troubleshooting' }
        // { text: 'Help Center', link: 'https://help.netzo.io/' },
      ],
    },
    // {
    //   text: 'Examples',
    //   collapsed: true,
    //   items: [
    //     { text: '<code>minimal</code>', link: '/docs/examples/minimal' },
    //     { text: '<code>starter</code>', link: '/docs/examples/starter' },
    //   ],
    // },
    {
      text: 'Guides',
      collapsed: true,
      items: [
        {
          text: 'Basics',
          link: '/docs/guides/basics',
          items: [
            { text: 'Import/Export', link: '/docs/guides/basics/import-export' },
            { text: 'HTTP', link: '/docs/guides/basics/http' },
            { text: 'HTML', link: '/docs/guides/basics/html' },
            { text: 'JSX/TSX', link: '/docs/guides/basics/jsx-tsx' },
            { text: 'Fetch', link: '/docs/guides/basics/fetch' },
            { text: 'Environment Variables', link: '/docs/guides/basics/environment-variables' },
          ],
        },
        { text: 'Routing', link: '/docs/guides/routing' },
        { text: 'Interacting with APIs', link: '/docs/guides/interacting-with-apis' },
        { text: 'WebAssembly', link: '/docs/guides/webassembly' },
      ],
    },
    {
      text: 'Platform',
      collapsed: true,
      items: [
        { text: 'Home', link: '/docs/platform/home' },
        { text: 'Workspaces', link: '/docs/platform/workspaces' },
        {
          text: 'Projects',
          link: '/docs/platform/projects',
          items: [
            // { text: 'Overview', link: '/docs/platform/projects/overview' },
            { text: 'Studio', link: '/docs/platform/projects/studio' },
            { text: 'Preview', link: '/docs/platform/projects/preview' },
            { text: 'Deployments', link: '/docs/platform/projects/deployments' },
            { text: 'Requests', link: '/docs/platform/projects/requests' },
            // { text: 'Logs', link: '/docs/platform/projects/logs' },
            { text: 'Settings', link: '/docs/platform/projects/settings' },
          ],
        },
        { text: 'Variables', link: '/docs/platform/variables' },
        { text: 'Templates', link: '/docs/platform/templates' },
        { text: 'Users', link: '/docs/platform/users' },
      ],
    },
    {
      text: 'Templates',
      collapsed: false,
      items: [
        { text: 'Apps', link: '/docs/templates/apps' },
        { text: 'APIs', link: '/docs/templates/apis' },
        { text: 'Workflows', link: '/docs/templates/workflows' },
      ],
    },
    {
      text: '<code>https://deno.land/x/netzo</code>',
      collapsed: false,
      items: [
        {
          text: '<code>apis</code>',
          link: '/docs/netzo/apis',
          collapsed: true,
          items: [
            { text: '<code>activecampaign</code>', link: '/docs/netzo/apis/activecampaign' },
            { text: '<code>airtable</code>', link: '/docs/netzo/apis/airtable' },
            { text: '<code>brevo</code>', link: '/docs/netzo/apis/brevo' },
            { text: '<code>chartmogul</code>', link: '/docs/netzo/apis/chartmogul' },
            { text: '<code>clickup</code>', link: '/docs/netzo/apis/clickup' },
            { text: '<code>cloudflare</code>', link: '/docs/netzo/apis/cloudflare' },
            { text: '<code>discord</code>', link: '/docs/netzo/apis/discord' },
            { text: '<code>facturama</code>', link: '/docs/netzo/apis/facturama' },
            { text: '<code>fathomanalytics</code>', link: '/docs/netzo/apis/fathomanalytics' },
            { text: '<code>github</code>', link: '/docs/netzo/apis/github' },
            { text: '<code>googleappsheet</code>', link: '/docs/netzo/apis/googleappsheet' },
            { text: '<code>googledrive</code>', link: '/docs/netzo/apis/googledrive' },
            { text: '<code>googlesheets</code>', link: '/docs/netzo/apis/googlesheets' },
            { text: '<code>holded</code>', link: '/docs/netzo/apis/holded' },
            { text: '<code>hubspot</code>', link: '/docs/netzo/apis/hubspot' },
            { text: '<code>ipgeolocation</code>', link: '/docs/netzo/apis/ipgeolocation' },
            { text: '<code>jsonplaceholder</code>', link: '/docs/netzo/apis/jsonplaceholder' },
            { text: '<code>mailchimpmarketing</code>', link: '/docs/netzo/apis/mailchimpmarketing' },
            { text: '<code>mailgun</code>', link: '/docs/netzo/apis/mailgun' },
            { text: '<code>medium</code>', link: '/docs/netzo/apis/medium' },
            { text: '<code>monday</code>', link: '/docs/netzo/apis/monday' },
            { text: '<code>mongodbatlasdata</code>', link: '/docs/netzo/apis/mongodbatlasdata' },
            { text: '<code>netzo</code>', link: '/docs/netzo/apis/netzo' },
            { text: '<code>notion</code>', link: '/docs/netzo/apis/notion' },
            { text: '<code>openai</code>', link: '/docs/netzo/apis/openai' },
            { text: '<code>pandadoc</code>', link: '/docs/netzo/apis/pandadoc' },
            { text: '<code>pipedrive</code>', link: '/docs/netzo/apis/pipedrive' },
            { text: '<code>rest</code>', link: '/docs/netzo/apis/rest' },
            { text: '<code>restdb</code>', link: '/docs/netzo/apis/restdb' },
            { text: '<code>sendgrid</code>', link: '/docs/netzo/apis/sendgrid' },
            { text: '<code>shopify</code>', link: '/docs/netzo/apis/shopify' },
            { text: '<code>stripe</code>', link: '/docs/netzo/apis/stripe' },
            { text: '<code>whatsappbusiness</code>', link: '/docs/netzo/apis/whatsappbusiness' },
            { text: '<code>wix</code>', link: '/docs/netzo/apis/wix' },
          ],
        },
        { text: '<code>cli</code>', link: '/docs/netzo/cli' },
        {
          text: '<code>components</code>',
          link: '/docs/netzo/components',
          collapsed: true,
          items: [
            {
              text: '<code>data</code>',
              link: '/docs/netzo/components#data',
              collapsed: true,
              items: [
                { text: '<code>NTable</code>', link: '/docs/netzo/components/NTable' },
              ],
            },
            {
              text: '<code>elements</code>',
              link: '/docs/netzo/components#elements',
              collapsed: true,
              items: [
                { text: '<code>NButton</code>', link: '/docs/netzo/components/NButton' },
                { text: '<code>NChip</code>', link: '/docs/netzo/components/NChip' },
                { text: '<code>NDarkToggle</code>', link: '/docs/netzo/components/NDarkToggle' },
                { text: '<code>NDropdown</code>', link: '/docs/netzo/components/NDropdown' },
                { text: '<code>NIcon</code>', link: '/docs/netzo/components/NIcon' },
                { text: '<code>NIconButton</code>', link: '/docs/netzo/components/NIconButton' },
                { text: '<code>NIconTitle</code>', link: '/docs/netzo/components/NIconTitle' },
                { text: '<code>NLink</code>', link: '/docs/netzo/components/NLink' },
                { text: '<code>NLoading</code>', link: '/docs/netzo/components/NLoading' },
                { text: '<code>NTip</code>', link: '/docs/netzo/components/NTip' },
              ],
            },
            {
              text: '<code>form</code>',
              link: '/docs/netzo/components#form',
              collapsed: true,
              items: [
                { text: '<code>NCheckbox</code>', link: '/docs/netzo/components/NCheckbox' },
                { text: '<code>NForm</code>', link: '/docs/netzo/components/NForm' },
                { text: '<code>NInputText</code>', link: '/docs/netzo/components/NInputText' },
                { text: '<code>NInputDate</code>', link: '/docs/netzo/components/NInputDate' },
                { text: '<code>NInputDateRange</code>', link: '/docs/netzo/components/NInputDateRange' },
                { text: '<code>NRadio</code>', link: '/docs/netzo/components/NRadio' },
                { text: '<code>NSelect</code>', link: '/docs/netzo/components/NSelect' },
                { text: '<code>NSwitch</code>', link: '/docs/netzo/components/NSwitch' },
              ],
            },
            {
              text: '<code>layout</code>',
              link: '/docs/netzo/components#layout',
              collapsed: true,
              items: [
                { text: '<code>NCard</code>', link: '/docs/netzo/components/NCard' },
                { text: '<code>NPanelGrids</code>', link: '/docs/netzo/components/NPanelGrids' },
                { text: '<code>NSectionBlock</code>', link: '/docs/netzo/components/NSectionBlock' },
              ],
            },
            {
              text: '<code>overlay</code>',
              link: '/docs/netzo/components#overlay',
              collapsed: true,
              items: [
                { text: '<code>NDialog</code>', link: '/docs/netzo/components/NDialog' },
              ],
            },
          ],
        },
        { text: '<code>composables</code>', link: '/docs/netzo/composables' },
        {
          text: '<code>plugins</code>',
          link: '/docs/netzo/plugins',
          collapsed: true,
          items: [
            { text: '<code>daisyui</code>', link: '/docs/netzo/plugins/daisyui' },
            { text: '<code>flowbite</code>', link: '/docs/netzo/plugins/flowbite' },
            { text: '<code>netzoAppLayout</code>', link: '/docs/netzo/plugins/netzoAppLayout' },
            { text: '<code>netzoAuth</code>', link: '/docs/netzo/plugins/netzoAuth' },
            { text: '<code>netzoErrorPages</code>', link: '/docs/netzo/plugins/netzoErrorPages' },
            { text: '<code>unocss</code>', link: '/docs/netzo/plugins/unocss' },
          ],
        },
      ],
    },
    {
      text: 'API Reference',
      link: '/docs/api-reference/index',
      collapsed: true,
      items: [
        { text: 'Authentication', link: '/docs/api-reference/authentication' },
        { text: 'Reference', link: 'https://api.netzo.io/docs/' },
      ],
    },
    {
      text: 'Legal',
      collapsed: true,
      items: [
        { text: 'Fair Use Policy', link: '/docs/legal/fair-use-policy' },
        { text: 'Code of Conduct', link: '/docs/legal/code-of-conduct' },
        { text: 'Security Notice', link: '/docs/legal/security-notice' },
        {
          text: 'Quick links',
          collapsed: false,
          items: legalEN.items,
        },
      ],
    },
  ],
  '/netzo/': [
    {
      items: [
        { text: 'What is Netzo?', link: '/netzo/what-is-netzo' },
        { text: 'Why use Netzo?', link: '/netzo/why-use-netzo' },
        {
          text: 'Who is Netzo for?',
          items: [
            { text: '🧑‍💻 Developer Teams', link: '/netzo/who-is-netzo-for#developer-teams' },
            { text: '🚀 Startups and SMBs', link: '/netzo/who-is-netzo-for#smbs-and-startups' },
            { text: '🏢 Enterprises', link: '/netzo/who-is-netzo-for#enterprises' },
          ],
        },
      ],
    },
  ],
  '/use-cases/': [
    {
      items: [
        {
          text: 'Use Cases',
          items: [
            { text: '📊 Business Intelligence', link: '/use-cases#business-intelligence-bi' },
            { text: '💻 Admin Panels', link: '/use-cases#admin-panels-crud' },
            { text: '🔗 APIs (REST)', link: '/use-cases#rest-apis' },
            { text: '🤖 Workflow Automation', link: '/use-cases#workflows' },
            { text: '🌐 Websites', link: '/use-cases#websites-and-landing-pages' },
          ],
        },
      ],
    },
  ],
  '/legal/': [legalEN],
}

export const sidebarES: DefaultTheme.Sidebar = {
  // '/blog/': sidebarEN['/blog/'],
  // '/docs/': sidebarEN['/docs/'],
  '/es/netzo/': [
    {
      items: [
        { text: '¿Qué es Netzo?', link: '/es/netzo/what-is-netzo' },
        { text: '¿Por qué usar Netzo?', link: '/es/netzo/why-use-netzo' },
        {
          text: '¿Para quién es Netzo?',
          items: [
            { text: '🧑‍💻 Equipos de Desarrollo', link: '/es/netzo/who-is-netzo-for#equipos-de-desarrollo' },
            { text: '🚀 Startups y PYMEs', link: '/es/netzo/who-is-netzo-for#pymes-y-startups' },
            { text: '🏢 Empresas', link: '/es/netzo/who-is-netzo-for#corporaciones' },
          ],
        },
      ],
    },
  ],
  '/es/use-cases/': [
    {
      items: [
        {
          text: 'Casos de Uso',
          items: [
            { text: '📊 Inteligencia de Negocios', link: '/es/use-cases#inteligencia-de-negocios-bi' },
            { text: '💻 Cuadros de Mando', link: '/es/use-cases#cuadros-de-mando-crud' },
            { text: '🔗 APIs (REST)', link: '/es/use-cases#apis-rest' },
            { text: '🤖 Flujos de Trabajo', link: '/es/use-cases#flujos-de-trabajo' },
            { text: '🌐 Sitios Web', link: '/use-cases#sitios-web-y-landing-pages' },
          ],
        },
      ],
    },
  ],
  '/es/legal/': [legalES],
}