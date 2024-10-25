import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsQuery } from "services/productsQuery";
import useFormFields from "hooks/useFormFields";

function ProductForm() {
  const queryClient = useQueryClient();

  const [formData, handleChange] = useFormFields({
    name: "",
    quantity: 0,
    price: 0,
  });

  const { name, quantity, price } = formData;

  const { mutate } = useMutation({
    mutationFn: productsQuery.createProduct,
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !quantity || !price) return;

    const dataToSubmit = {
      name: name,
      quantity: Number(quantity) || 0,
      price: Number(price) || 0,
    };

    mutate(dataToSubmit);
  };

  return (
    <form onChange={handleChange}>
      <div>
        <h3>ایجاد محصول جدید</h3>
        <div>
          <label htmlFor="name">نام کالا</label>
          <input type="text" name="name" placeholder="نام کالا را وارد کنید" />

          <label htmlFor="quantity">تعداد موجودی</label>
          <input type="number" name="quantity" placeholder="تعداد موجودی را وارد کنید" />

          <label htmlFor="price">قیمت</label>
          <input type="number" name="price" placeholder="قیمت را وارد کنید" />
        </div>
        <div>
          <button onClick={handleSubmit}>ایجاد</button>
          <button>انصراف</button>
        </div>
      </div>
    </form>
  );
}

export default ProductForm;
