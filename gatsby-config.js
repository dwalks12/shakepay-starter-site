module.exports = {
    siteMetadata: {
        siteUrl: `https://shakepay.netlify.app`,
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