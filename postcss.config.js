module.exports = {
  plugins: [
    require("autoprefixer")({
        ie:true,
      browsers: ["last 10 version", "ie>=9"]
    })
  ]
};
