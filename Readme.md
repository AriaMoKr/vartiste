# This fork

This is AriaMoKr's fork of Zach Capalbo's VARTISTE, built for GitHub Pages and published at
https://ariamokr.github.io/vartiste/. It is the painting studio of the
[art room](https://ariamokr.github.io/art/), a WebXR room behind the
[Hallway](https://ariamokr.github.io/hallway/)'s door: a picture on the art room's wall opens it,
and it shows the way back.

Upstream is [zach-geek/vartiste on GitLab](https://gitlab.com/zach-geek/vartiste), whose `release`
this fork follows; [zach-capalbo/vartiste on GitHub](https://github.com/zach-capalbo/vartiste),
which this repository was forked from, is its older mirror (to 2022). The licence is upstream's,
the Apache License 2.0, in [LICENSE](LICENSE). What this fork changes from upstream's `release`
(095259b, 2024-12-18):

- **The build on today's Node.** `package.json` drops the top-level `sharp` 0.24 devDependency,
  which nothing requires and which no longer compiles on Node 24. `package-lock.json` is made again
  in npm's current format: `sharp` 0.24 and what only it pulled in (`prebuild-install`, `npmlog` and
  theirs) are gone, and every other package is at the same version, each git dependency at the same
  commit. The new `.npmrc` sets `legacy-peer-deps`, so `npm ci` installs as npm 6, upstream's CI,
  did.
- **The Pages workflow.** The new `.github/workflows/pages.yml` makes the production build of every
  entry, as upstream's GitLab Pages job does, and publishes it on each push to `release`.
- **The way back.** The new `src/way-back.js`, required from `src/index.js`: when the art room
  opens VARTISTE (its address carrying `back` and `backname`, the door contract of
  [AriaMoKr/common](https://github.com/AriaMoKr/common)'s `door.js`, so `package.json` adds
  `common` at `v0.6.3`), the page shows "← art" at the top right, and in VR a Back to art button
  sits over the Quick Menu. Each asks first, since anything unsaved is lost. Opened any other way,
  it adds nothing.

From here down, this Readme is upstream's.

# VARTISTE

![logo](./src/assets/vartiste.png)

VARTISTE is a 2D / Surface drawing and painting app for virtual reality.

![moose](./src/static/moose.jpg)

- [Launch VARTISTE](https://zach-geek.gitlab.io/vartiste/index.html)
- [Instructions](https://zach-geek.gitlab.io/vartiste/landing.html)
- [Source Code](https://gitlab.com/zach-geek/vartiste)

# Using VARTISTE

The easiest way to get started using VARTISTE is to read through the
[Instructions](https://zach-geek.gitlab.io/vartiste/landing.html), or launch it
from [vartiste.xyz](https://vartiste.xyz)

# aframe-vartiste-toolkit

VARTISTE and the aframe-vartiste-toolkit are built from the same source code. The best places to start with the aframe-vartiste-toolkit are the [npm page](https://www.npmjs.com/package/aframe-vartiste-toolkit)
