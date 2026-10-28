// The way back to the place that opened VARTISTE, when one did. On GitHub Pages this fork is behind
// a picture on the art room's wall (https://ariamokr.github.io/art/), which opens it with the
// Hallway's door contract: `back`, the address to go back to, and `backname`, what to call it
// (AriaMoKr/common's door.js, hallLink). That is read once, kept for the tab, and taken off the
// address. On the page the way back is a link at the top right ("← art"); in VR, a Back to art
// button over the Quick Menu. VARTISTE never warns about unsaved work, so each asks first: the
// link with a confirm, the button with a second press. Opened any other way, nothing is added.
import { keptWay, leaveUrl, wayBack, withoutVisit } from 'common/door.js'

const KEY = 'vartiste.way'

function readWay() {
  const way = wayBack(location.search, 'vartiste', { origin: location.origin, always: false })
  try {
    if (way) sessionStorage.setItem(KEY, JSON.stringify(way))
    return way || keptWay(sessionStorage.getItem(KEY))
  } catch (e) {
    return way // no storage (a private window, blocked site data): it lasts this page only
  }
}

const way = readWay()
const unvisited = withoutVisit(location.href)
if (unvisited !== location.pathname + location.search + location.hash) history.replaceState(history.state, '', unvisited)

/** Where the way back goes now: the place, with the shared session it came in (?room=) still on it. */
function leaveTo() {
  return leaveUrl(way, new URLSearchParams(location.search).get('room'))
}

const QUESTION = way && `Go back to ${way.name}? Anything in VARTISTE that is not saved will be lost.`

const STYLE = `
.way-back-nav { position: fixed; top: max(12px, env(safe-area-inset-top)); right: max(12px, env(safe-area-inset-right)); z-index: 10000; }
.way-back-link {
  display: inline-flex; align-items: center; min-height: 32px; padding: 4px 14px; border-radius: 999px;
  border: 1px solid rgba(224, 187, 114, 0.6); background: rgba(20, 28, 25, 0.92); color: #f1e6d0;
  font: 600 15px/1.3 system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", sans-serif; text-decoration: none;
}
.way-back-link:hover { border-color: #e0bb72; color: #e0bb72; }
.way-back-link:focus-visible { outline: 2px solid #e0bb72; outline-offset: 2px; }
@media (forced-colors: active) { .way-back-link { border-color: LinkText; } }
`

/** The page's way back: a link, which asks before it goes. */
function addLink() {
  const style = document.createElement('style')
  style.textContent = STYLE
  const nav = document.createElement('nav')
  nav.className = 'way-back-nav'
  nav.setAttribute('aria-label', 'Way back')
  const a = document.createElement('a')
  a.className = 'way-back-link'
  a.href = leaveTo()
  a.title = way.title
  a.textContent = way.label
  a.addEventListener('click', e => {
    a.href = leaveTo()
    if (!confirm(QUESTION)) e.preventDefault()
  })
  nav.append(a)
  document.head.append(style)
  document.body.append(nav)
}

if (way)
{
  if (document.body) addLink()
  else document.addEventListener('DOMContentLoaded', addLink)

  // In VR: a button over the Quick Menu. The first press asks (the Quick Menu's message and the
  // popup say so), a second within a few seconds goes.
  AFRAME.registerSystem('way-back', {
    init() {
      this.asked = -Infinity
      this.el.addEventListener('loaded', () => {
        let menu = document.getElementById('quick-menu')
        if (!menu) return // the simplified interface has none
        let button = document.createElement('a-entity')
        button.setAttribute('icon-button', '#asset-arrow-left')
        button.setAttribute('tooltip', `Back to ${way.name}`)
        button.setAttribute('system-click-action', 'system: way-back; action: leave')
        button.setAttribute('position', '-1.1 0.78 0')
        menu.append(button)
      })
    },
    leave() {
      let now = Date.now()
      if (now - this.asked > 6000)
      {
        this.asked = now
        this.el.emit('open-popup', `${QUESTION} Press Back to ${way.name} again to go.`)
        return
      }
      location.assign(leaveTo())
    }
  })
}
