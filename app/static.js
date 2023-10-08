const options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["htm", "html", "js", "css"],
  index: false,
  maxAge: "1d",
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set("x-timestamp", Date.now())
  },
}

export { options }
