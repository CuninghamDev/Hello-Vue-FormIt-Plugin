module.exports = {
  publicPath: "",
  //set this to false to get rid of the source map files
  productionSourceMap: false,
  //index path sets the name of the file that will exist at index of the built webpage
  indexPath: "plugin.html",
  //dependencies written in ts will be transpiled to js before use in building application
  transpileDependencies: ["vuetify"],
};
