const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/birds/api/v1': {
        target: 'https://base.ewnc.org',  // Базовый URL твоего API
        changeOrigin: true,
        pathRewrite: {
          '^/birds/api/v1': '/birds/api/v1',  // Убираем префикс, если нужно
        },
        // Добавляем токен в заголовки
        onProxyReq: (proxyReq, req, res) => {
          proxyReq.setHeader('Authorization', 'Bearer b22b9cabbed38326c9a6a93e2f23372d29900b24');  // Замените на ваш токен
        },
      },
    },
  },
})
