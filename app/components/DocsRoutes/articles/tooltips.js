import React, { Fragment } from "react"
import Article from "app/components/Article"
import PageHeader from "app/components/PageHeader"
import SetMeta from "app/components/SetMeta"
import TooltipsMd from "app/docs/tooltips.md"

const Tooltips = () => {
  return (
    <Fragment>
      <SetMeta
        title="Tooltips"
        description="A component for showing basic text content in a small popup box."
      />
      <PageHeader>Tooltips</PageHeader>
      <Article>{TooltipsMd}</Article>
    </Fragment>
  )
}

export default Tooltips
