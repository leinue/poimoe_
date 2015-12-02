module.exports = {
  entry: './main.js',
  output: {
  	path: './dist',
    filename: 'bundle.js'       
  },
  module: {
  	loaders: [
  		{
  			test: /\.vue$/, loader: 'vue-loader'
  		}
  	]
  }
};