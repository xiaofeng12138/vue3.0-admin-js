const path = require('path');
module.exports = {
   publicPath:process.env.NODE_ENV = 'production' ? '':'/',
   outputDir:process.env.NODE_ENV = 'production' ? 'dist':'Devdist',
   //关闭自动检测
   lintOnSave:false,
   css: {
    loaderOptions: {
      scss: { 
        prependData: `@import "./src/styles/main.scss";`
      }
    }
  },
  
  configureWebpack: (config) => {
    config.resolve = { // 配置解析别名
      extensions: ['.js', '.json', '.vue'],  // 自动添加文件名后缀
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@c': path.resolve(__dirname, './src/components')
      }
    }
  },
};
