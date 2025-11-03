"use client";
import Image from "next/image";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [content, setContent] = useState("");
  
  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // client connection
  useEffect(() => {
    socket?.on("connect", () => {
      console.log("user connected ->", socket.id);
    });
  }, [socket]);

  const handleRegister = (e) => {
    e.preventDefault();
    socket?.emit("register", username);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center bg-white text-black h-screen w-full">
        <form onSubmit={handleRegister} className="flex flex-col gap-4 border p-5 px-10 rounded-md">
        <label htmlFor="username">User</label>
          <input id="username" placeholder="Enter name" onChange={(e) => setUsername(e.target.value)}/>
          <button className="border rounded-lg">Register</button>
        </form>
      </div>
    )
  }

  const handleCreatePost = async(e) => {
    e.preventDefault();
    let payload = {
      content,
      username
    }
    let res = await axios.post("http://localhost:4000/create", payload);
    
  }

  return (
    <div className="h-screen justify-center items-center w-full bg-white text-black">
      hello {username}

      <form onSubmit={handleCreatePost} className="flex flex-col gap-3 border p-5 rounded-lg">
        <label>Enter Tweet</label>
        <textarea onChange={(e) => {setContent(e.target.value)}} className="border p-2" id="content" rows={3} col={10}></textarea>
        <button className="border">Create Post</button>
      </form>
    </div>
  )
}