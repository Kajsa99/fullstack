import { useState } from "react";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);
    const [error, setError] = useState(null);
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);

    async function FetchAnimals() {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch("/asc");
            if (!res.ok) throw new Error("Error fetching data");
            const data = await res.json();
            setAnimals(data);
        } catch (e) {
            setError(e.message);
            setAnimals([]);
        } finally {
            setLoading(false);
            setLoaded(true);
        }
    }

    return (
        <>
            <div>
                <h1>Animals</h1>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>

            <div className="card">
                <button onClick={() => setCount((c) => c + 1)}>
                    count is {count}
                </button>
                <button onClick={FetchAnimals}>All animals</button>
            </div>

            {loaded && (
                <div>
                    <h2>Resultat</h2>
                    {loading ? (
                        <p>Laddar...</p>
                    ) : animals.length === 0 ? (
                        <p>Inga poster</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Name</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {animals.map((a) => (
                                    <tr key={a.id}>
                                        <td>{a.id}</td>
                                        <td>{a.name}</td>
                                        <td>{a.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </>
    );
}

export default App;
