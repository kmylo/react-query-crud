import useProducts from "../hooks/useProducts";


const Products = () => {
  const {
    isLoading,
    products,
    isError,
    error,
    deleteProductMutation,
    updateProductMutation,
  } = useProducts();

  const handleChange = (e) => {
    console.log({
      ...product,
      inStock: e.target.checked,
    });
    updateProductMutation.mutate({
      ...product,
      inStock: e.target.checked,
    });
  }

  const handleClick = () => {
    deleteProductMutation.mutate(product.id);
  }

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>{error.message}</div>;

  return products?.map((product) => (
    <div key={product.id} className="product">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button
        onClick={handleClick}
      >
        Delete
      </button>
      <input
        type="checkbox"
        checked={product.inStock}
        id={product.id}
        onChange={handleChange}
      />
      <label htmlFor={product.id}>In Stock</label>
    </div>
  ));
};

export default Products;
