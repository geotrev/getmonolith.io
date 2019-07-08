import React from "react"
import Markdown from "react-markdown"
import Loadable from "react-loadable"

import installNpm from "./installNpm.md"
import installAssets from "./installAssets.md"

const loader = () => import("./Badges")
const loading = () => <span className="is-visually-hidden">Loading badges</span>
export const StatusBadges = Loadable({ loader, loading })

export const InstallNpm = () => <Markdown source={installNpm} escapeHtml={false} />
export const InstallAssets = () => <Markdown source={installAssets} escapeHtml={false} />
