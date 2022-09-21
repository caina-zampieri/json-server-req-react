import "./App.css";
import { useState, useEffect } from "react";

// Custom Hooks
import { useFetch } from "./hooks/useFetch";

const App = () => {

  const url = 'http://localhost:3000/products';

  const [products, setProducts] = useState([]);

  // 4 - Custom Hooks

  const { data: items, httpConfig, loading, error } = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 1- Resgatando dados

  // useEffect(() => {

  //   const fetchData = async () => {
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     setProducts(data);
  //   }
  //   fetchData();
  // }, [url]);

  // 2-  Add products

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const product = {
      name,
      price,
    };

    // const res = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   },
    //   body: JSON.stringify(product),
    // });

    // // 3- dynamically loading products

    // const addedProduct = await res.json();

    // setProducts((prevProducts) => [...prevProducts, addedProduct]);

    // 5 - refatorando post

    httpConfig(product, "POST");

    setName("");
    setPrice("");

  };

  // Remove products 
  const handleRemove = async (id) => {

    httpConfig(id, "DELETE");

    setName("");
    setPrice("");
  }


  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {/* {loading} */}
      {loading && <p>Carregando Dados...</p>}
      {error && { error }}
      {!error &&
        <ul>
          {items && items.map((product) => (
            <><p key={product.id}>{product.name} - R$: {product.price} <button onClick={() => handleRemove(product.id)}>Remover</button></p> </>
          ))}
        </ul>
      }
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input required type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Preço:
            <input required type="number" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </label>
          {/* {State de loading no post} */}
          {loading && <input type="submit" disabled value="Aguarde!" />}

          {!loading && <input type="submit" value="Criar" />}

        </form>
      </div>
    </div>
  )
}

export default App;