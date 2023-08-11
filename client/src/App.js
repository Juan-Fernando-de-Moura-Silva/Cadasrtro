import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [passwordList, setPasswordList] = useState([]);

  const addPassword = () => {
    axios.post("http://localhost:3001/addpassword", {
      password: password,
      title: title,
    }).then(() => {
      // Após adicionar a senha, você pode atualizar a lista de senhas
      fetchPasswordList();
    });
  };

  const fetchPasswordList = () => {
    axios.get("http://localhost:3001/showpasswords")
      .then((response) => {
        setPasswordList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching password list:", error);
      });
  };

  useEffect(() => {
    fetchPasswordList();
  }, []);

  return (
    <div className="App">
      <div className="AddingPassword">
        <input
          type="text"
          placeholder="Senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type="text"
          placeholder="Local"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <button onClick={addPassword}>Add Password</button>
      </div>

      <div className="Passwords">
        {passwordList.map((val, key) => (
          <div className="password" key={key}>
            <h3>{val.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
