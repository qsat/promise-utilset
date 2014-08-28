require "es6-promise"

defer=  ->
  reject = resolve = null
  p = new Promise (res, rej) -> [resolve, reject] = [res, rej]
  p.resolve = resolve
  p.reject = reject
  p

module.exports =
  defer:defer

  loadimg: (src) ->
    d = defer()
    i = new Image
    if "onreadystatechange" in i
      i.onreadystatechange = (e) ->
        d.resolve() if i.readyState is "loaded" or i.readyState is "complete"
    else
      i.onload = -> d.resolve()
      i.onerror = -> d.resolve()
    i.src = src
    d

  
  wait: (ms) ->
    d = defer()
    id = setTimeout d.resolve(), ms
    d.then null, -> clearTimeout id
    d


  transEnd: (e)->
    d = defer()
    e.addEventListener "webkitTransitionEnd", d.resolve, false
    e.addEventListener    "mozTransitionEnd", d.resolve, false
    e.addEventListener     "msTransitionEnd", d.resolve, false
    e.addEventListener      "oTransitionEnd", d.resolve, false
    e.addEventListener       "transitionend", d.resolve, false
    d.done ->
      e.removeEventListener "webkitTransitionEnd", d.resolve, false
      e.removeEventListener    "mozTransitionEnd", d.resolve, false
      e.removeEventListener     "msTransitionEnd", d.resolve, false
      e.removeEventListener      "oTransitionEnd", d.resolve, false
      e.removeEventListener       "transitionend", d.resolve, false
    d
