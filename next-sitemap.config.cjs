/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://prompt-manager.marcel-breuer.dev',
    generateRobotsTxt: true,
    serverModuleFormat: 'cjs',
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ]
    },
};
