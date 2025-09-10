// rafce : react app functional component export
"use client" // apply this whenever applying hooks on the page
import { useParams } from 'next/navigation';
import React from 'react'

// CSR
const Page = () => {
  const params = useParams();

  return (
    <div></div>
  )
}

// SSR
// const Page = ({ params }) => {
//   const {id} = params;
//   return (
//     <div>
//       Hello {id}
//     </div>
//   )
// }

export default Page;
