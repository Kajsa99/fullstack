import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);
    const [error, setError] = useState(null);
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        fetch("/desc")
            .then((response) => response.json())
            .then(setAnimals)
            .catch((e) => setError(e.message));
    }, []);

    return (
        <>
            <div>
                <h1>Animals</h1>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nam</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {animals.length === 0 ? (
                            <tr>
                                <td colSpan="4">Inga poster</td>
                            </tr>
                        ) : (
                            animals.map((a) => (
                                <tr key={a.id}>
                                    <td>{a.id}</td>
                                    <td>{a.name}</td>
                                    <td>{a.amount}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <button>Lägg till grejer</button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
