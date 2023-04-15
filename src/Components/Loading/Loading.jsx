import React from 'react'
import { Helmet } from 'react-helmet'
Helmet
export default function Loading() {
  return<>
  <Helmet> 
    <title>Loading</title>
</Helmet>
  <div className="loadingbg d-flex  justify-content-center align-items-center">
      <span className="loader">Loading</span>

  </div>
  </>
}
