// src/hooks/useProductForm.js
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productsQuery } from "services/productsQuery";
import useFormFields from "./useFormFields";

export function useProductForm(productId, onClose) {
  const queryClient = useQueryClient();
  const isEditMode = !!productId;

  const defaultValues = {
    name: "",
    quantity: "",
    price: "",
  };

  const [formData, handleChange, setFormData] = useFormFields(defaultValues);

  const { data, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => productsQuery.getProductById(productId),
    enabled: isEditMode,
  });

  const { mutate, isLoading: isSaving } = useMutation({
    mutationFn: isEditMode ? productsQuery.updateProduct : productsQuery.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onClose();
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const productData = data?.data;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.quantity || !formData.price) console.log("Please fill all fields");

    mutate({
      id: productData?.id,
      name: formData.name,
      quantity: Number(formData.quantity),
      price: Number(formData.price),
    });
  };

  useEffect(() => {
    if (productData) {
      setFormData({
        name: productData.name,
        quantity: productData.quantity,
        price: productData.price,
      });
    }
  }, [productData, setFormData]);

  return {
    formData,
    handleChange,
    handleSubmit,
    isEditMode,
    isLoading: isLoadingProduct || isSaving,
  };
}
