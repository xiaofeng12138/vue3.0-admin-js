const path = require('path');
module.exports = {
   publicPath:process.env.NODE_ENV = 'production' ? '':'/',
   outputDir:process.env.NODE_ENV = 'production' ? 'dist':'Devdist',
   //关闭自动检测
   lintOnSave:false,
   chainWebpack:config=>{
    //svg配置
    config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
    config.module
      .rule('svg-sprite-loader').test(/\.svg$/)
      .include
      .add(path.resolve('./src/assets/svg')) //处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },



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
