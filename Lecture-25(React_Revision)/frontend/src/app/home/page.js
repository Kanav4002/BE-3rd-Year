"use client"
import { useState } from "react"
import Navbar from "../components/navbar";

const Page = () => {
  // let count = 0;

  // function IncrementCount() {
  //   count++;
  //   console.log(count);
  // }
  // [getter, setter] stored in an array
  const [count, setCount] = useState(0);
  function IncrementCount() {
    setCount(count + 1);
  }

  return <div>
    <Navbar/>
    <h1 className="text-5xl">this is Home page</h1>
    <h2 className="text-5xl text-center">{count}</h2>
    <button onClick={(e) => IncrementCount()}>Increment</button>
  </div>
}

export default Page;