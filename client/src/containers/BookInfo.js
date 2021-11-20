import * as React from 'react'
import { useParams } from 'react-router'

const BookInfo = () => {
  let params = useParams()

  React.useEffect(() => {}, [])
  return <div>{params.id}</div>
}

export default BookInfo
