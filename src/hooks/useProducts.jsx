import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProducts, updateProduct } from "../api/productsApi";

const useProducts = () => {
    const {
        isLoading,
        data: products,
        isError,
        error,
    } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
        select: (data) => data.sort((a, b) => b.id - a.id),
    });
    const queryClient = useQueryClient();

    const deleteProductMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries("products");
        },
    });
    
    const updateProductMutation = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries("products");
        },
    });

    return {
        isLoading,
        products,
        isError,
        error,
        deleteProductMutation,
        updateProductMutation,
    };
};

export default useProducts