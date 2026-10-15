import { useState } from "react";

const emptyItem = {
  name: "",
  category: "",
  price: "",
  discountPercentage: "",
  description: "",
  imageUrl: "",
};

function ItemForm({ initialValues, onSubmit, submitText }) {
  // Merge with defaults so items created before a field existed still get a value
  const [formData, setFormData] = useState({
    ...emptyItem,
    ...initialValues,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: Number(formData.price),
      discountPercentage: Number(formData.discountPercentage) || 0,
    });
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>{submitText}</h2>

      <label>Item Name</label>
      <input name="name" value={formData.name} onChange={handleChange} required />

      <label>Category</label>
      <input name="category" value={formData.category} onChange={handleChange} required />

      <label>Price</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <label>Discount Percentage</label>
      <input
        type="number"
        name="discountPercentage"
        min="0"
        max="100"
        step="0.01"
        placeholder="0"
        value={formData.discountPercentage}
        onChange={handleChange}
      />

      <label>Description</label>
      <textarea
        name="description"
        rows="4"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label>Image URL</label>
      <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} />

      <button className="btn primary" type="submit">{submitText}</button>
    </form>
  );
}

export default ItemForm;