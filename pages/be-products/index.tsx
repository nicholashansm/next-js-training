import { WithDefaultLayout } from "@/components/DefautLayout";
import { ProductClient, ProductDataListResponse } from "@/functions/BackendApiClient";
import { useSwrFetcherWithAccessToken } from "@/functions/useSwrFetcherWithAccessToken";
import { Page } from "@/types/Page";
import { ProductData } from "@/types/products/be/ProductData";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { Button, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductIndexPage: Page = () => {
    /**
     * Define the current page number.
     */
    const [page] = useState(1);

    /**
     * Define how many data rows to show per page.
     */
    const pageRows = 10;

    const [__products, setProducts] = useState<ProductData[]>([]);

    // Reference: https://ant.design/components/modal.
    const [modal, contextHolder] = Modal.useModal();

    const queryFetcher = useSwrFetcherWithAccessToken();

    /**
     * Define the useQuery hook to fetch the product data from the server.
     */
    const { data, refetch, isFetching, isError } = useQuery<ProductDataListResponse>(
        {
            queryKey: ['products'],
            // We must provide our own fetch implementation.
            // Basic implementation: await (await fetch('/api/be-custom/api/v1/product')).json()
            // Or you can use useFetchWithAccessToken or useSwrFetcherWithAccessToken hook.
            // Or you can event implement your own fetcher, i.e.: useQueryFetcherWithAccessToken.
            queryFn: async () => await queryFetcher('/api/be-custom/api/v1/product')
        });


    async function fetchProducts() {
        // Basic way.
        // const data = await fetch('/api/be-custom/api/v1/product');
        // const productData = (await data.json()) as ProductDataResponse;
        // const products = productData.productDatas;

        // Using the generated client code from NSwag Studio / Swagger.
        const productClient = new ProductClient('http://localhost:3000/api/be-custom');
        const productData = await productClient.productGET('', 1, 10);
        const products = productData.productDatas as ProductData[];

        if (!products) {
            return;
        }
        setProducts(products);
    }

    // For manual client-side fetching demonstration.
    // DO NOT USE THIS TECHNIQUE IN REAL CASE.
    // Use swr or React Query instead for best practice.
    useEffect(() => {
        try {
            fetchProducts();
        } catch (error) {
            console.error(error);
        }
    }, []);

    /**
     * Define the columns for the product table using antd Table component.
     */
    const productColumns: ColumnsType<ProductData> = [
        {
            title: 'No.', dataIndex: 'rowNumber',
            render: (__value, __item, index) => (page - 1) * pageRows + index + 1
        },
        {
            title: 'Name', dataIndex: 'name',
            render: (value: string, product) => <Link href={`/products/edit/${product.productId}`}>{value}</Link>
        },
        { title: 'Price', dataIndex: 'price' },
        {
            title: 'Action',
            dataIndex: 'productId',
            render: (__value, product) => <Button className="bg-red-500" onClick={() => onClickDeleteProduct(product)}>
                <FontAwesomeIcon className="text-white" icon={faTrash} />
            </Button>
        }
    ]

    /**
     * On click delete product button.
     * @param product 
     */
    function onClickDeleteProduct(product: ProductData) {
        modal.confirm({
            title: 'Delete Product Confirmation',
            content: `Are you sure you want to delete product "${product.name}"?`,
            okButtonProps: {
                className: 'bg-red-500 text-white'
            },
            okText: 'Yes',
            onOk: () => onConfirmDeleteProduct(product),
            cancelText: 'No',
        });
    }

    /**
     * On click confirm delete product.
     * @param product
     */
    async function onConfirmDeleteProduct(product: ProductData) {
        const productClient = new ProductClient('http://localhost:3000/api/be-custom');

        try {
            await productClient.productDELETE(product.productId);
        } catch (error) {
            console.error(error);
        }

        refetch();
    }

    /**
     * Render the product data table.
     * @returns 
     */
    function renderTable() {
        if (isFetching) {
            return <p>Loading...</p>;
        }

        if (isError) {
            return <p>An error has occurred, please contact your admin.</p>;
        }

        return <>
            <Table rowKey="productId"
                dataSource={data?.productDatas}
                columns={productColumns}></Table>

            <Button type="primary" htmlType="button"
                className="bg-blue-500"
                onClick={() => refetch()}>
                Refresh
            </Button>
            {contextHolder}
        </>
    }

    return <>
        <h1>Products</h1>

        <p>Welcome to the product page!</p>
        <Link href="/products/create">Click here to create a product</Link>
        {renderTable()}

        {/* <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>

            <tbody>
                {products.map((product, index) =>
                    <tr key={product.productId}>
                        <td>{index + 1}</td>
                        <td>
                            <Link href={`/products/edit/${product.productId}`}>
                                {product.name}
                            </Link>
                        </td>
                        <td>{product.price}</td>
                    </tr>
                )}
            </tbody>
        </table> */}
    </>
}

ProductIndexPage.layout = WithDefaultLayout;
export default ProductIndexPage;