// ========================= //
// My code without styling //
// ========================= //

// import { useEffect, useRef, useState } from "react"

// function App() {

//   const [socket, setSocket] = useState<null | WebSocket>(null);
//   const [prevMessages, setPrevMessages] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null)


//   useEffect(()=>{
  //     const newSocket = new WebSocket("ws://localhost:8080")

//     newSocket.onopen = ()=>{
  //       console.log("Socket connected");
  //       setSocket(newSocket)
  //     }
  //     newSocket.onmessage = (message)=>{
    //       console.log("Received messages are : ", message.data);
    //       setPrevMessages((prev) => prev + "\n" + message.data)
    //     }

    //     return () => newSocket.close()

    //   },[])

    //   if (!socket) {
      //     return <div>Connecting to socket server.....</div>
      //   }

      //   const handleSendMessage = ()=>{
        //     const message = inputRef.current?.value;
        //     if (socket && message) {
          //       socket.send(message);
          //       if (inputRef.current) {
            //         inputRef.current.value = ""
            //         inputRef.current.focus()
            //       }
            //     }
            //   }


            //   return (
              //     <><input ref={inputRef} type="text" />
              //       <br />
              //       <button onClick={handleSendMessage}>
              //         Send Message
              //         </button>
              //       <br />
              //      <pre>
              //         {prevMessages}
              //       </pre>
//     </>
//   )
// }

// export default App

// ========================= //
// Chatgpt code with styling //
// ========================= //

import { useEffect, useRef, useState } from "react";

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [prevMessages, setPrevMessages] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");

    newSocket.onopen = () => {
      console.log("Socket connected");
      setSocket(newSocket);
    };

    newSocket.onmessage = (message) => {
      console.log("Received messages are : ", message.data);
      setPrevMessages((prev) => prev + "\n" + message.data);
    };

    return () => newSocket.close();
  }, []);

  if (!socket) {
    return (
      <div
        style={{
          background: "#0d1117",
          color: "#c9d1d9",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          fontFamily: "Segoe UI, sans-serif",
        }}
      >
        Connecting to socket server...
      </div>
    );
  }

  const handleSendMessage = () => {
    const message = inputRef.current?.value;
    if (socket && message) {
      socket.send(message);
      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    }
  };

  return (
    <div style={{ backgroundColor: "ThreeDDarkShadow", height: "81vh", padding: "5rem" }}>
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          padding: "30px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "white" }}>
          💬 Chat with WebSockets
        </h2>

        <input
          ref={inputRef}
          type="text"
          placeholder="Type your message..."
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #30363d",
            background: "#161b22",
            color: "#c9d1d9",
            fontSize: "16px",
            fontWeight:"bold",
            outline: "none",
          }}
        />
        <br />
        <button
          onClick={handleSendMessage}
          style={{
            padding: "10px 24px",
            fontSize: "16px",
            borderRadius: "8px",
            background: "#238636",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#2ea043")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#238636")}
        >
          Send Message
        </button>

        <pre
          style={{
            marginTop: "24px",
            background: "#161b22",
            padding: "20px",
            borderRadius: "12px",
            maxHeight: "300px",
            overflowY: "auto",
            whiteSpace: "pre-wrap",
            textAlign: "left",
            color: "#c9d1d9",
            fontFamily: "monospace",
            fontWeight: "bold",
            border: "1px solid #30363d",
          }}
        >
          {prevMessages || "No messages yet."}
        </pre>
      </div>
    </div>
  );
}

export default App;
