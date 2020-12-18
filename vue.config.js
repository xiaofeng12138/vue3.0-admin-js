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
};
