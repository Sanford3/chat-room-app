import { useRef, useState } from "react";
import "./App.css";
import "./Styles.css";
import Authentication from "./components/Authentication";
import Cookies from "universal-cookie/cjs/Cookies";
import Chat from "./components/Chat";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  if (!isAuth) {
    return (
      <div className="App">
        <Authentication setIsAuth={ setIsAuth} />
      </div>
    );
  }

  return (
    <div>
      {room ? (
        <div><Chat room={ room} /></div>
      ) : (
        <div className="room">
          <div className="container">
            <h1>Enter Room Name</h1>
            <input type="text" ref={roomInputRef} />
            <button onClick={() => setRoom(roomInputRef.current.value)}>
              Create Room
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
