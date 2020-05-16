import React, { useState, useEffect } from "react";
import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => setRepositories(response.data));
  }, []);

  function handleAddRepository() {
    const url = "https://github.com/josepholiveira";
    const title = "Desafio ReactJS";
    const techs = ["React", "Node.js"];

    api
      .post("/repositories", {
        title,
        url,
        techs,
      })
      .then((response) => setRepositories((prev) => [...prev, response.data]));
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(() => {
      const newRepo = repositories.filter((repo) => repo.id !== id);
      setRepositories(newRepo);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo, index) => (
          <li key={index}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
