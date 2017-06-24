{
  "staticFileGlobs": [
    'build/**.html',
    'build/**.png',
    'build/**.ico',
    "build/static/css/**.css",
    "build/static/js/**.js",
    "build/static/media/**.**"
  ],
  "stripPrefix": "build/",
  "runtimeCaching": [{
    "urlPattern": "/express/style/path/(.*)",
    "handler": "networkFirst"
  }]
}
