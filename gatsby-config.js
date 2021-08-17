module.exports = {
    siteMetadata: {
        siteUrl: `https://shakepay-starter-site.com`,
    },
    plugins: [
        {
            resolve: `gatsby-plugin-sass`,
            options: {
                cssLoaderOptions: {
                esModule: false,
                modules: {
                    namedExport: false,
                },
                },
                postCssPlugins: [
                require('tailwindcss')('./tailwind.config.js')
                ],
            },
          },
    ]
}