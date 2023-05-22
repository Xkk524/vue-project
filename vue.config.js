module.exports = {
  publicPath: '/',
  lintOnSave: false, // 暂时关闭热更新
  devServer: {
    proxy: {
      '/api': {
        target: 'https://i.maoyan.com',
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    performance: {
	    //入口起点的最大体积
      maxEntrypointSize: 50000000,
	    //生成文件的最大体积
      maxAssetSize: 30000000,
    }
  }
}
