import { WithDefaultLayout } from "@/components/DefautLayout";
import { Page } from "@/types/Page";
import { ProductDataResponse, ProductData } from "@/types/products/be/ProductData";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

    const [products, setProducts] = useState<ProductData[]>([]);

    // Reference: https://ant.design/components/modal.
    const [modal, contextHolder] = Modal.useModal();

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await fetch('/api/be-custom/api/v1/product');
            const productData = (await data.json()) as ProductDataResponse;
            const products = productData.productDatas;

            setProducts(products);
        }

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
            dataIndex: 'id',
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
    function onConfirmDeleteProduct(product: ProductData) {
        // Filter out the product based on the selected product ID and return it as new product list array.
        // This will remove the selected product from the list.
        const newProductList = products.filter(p => p.productId !== product.productId);

        setProducts(newProductList);
    }

    return <>
        <h1>Products</h1>

        <p>Welcome to the product page!</p>
        <Link href="/products/create">Click here to create a product</Link>

        <Table rowKey="id"
            dataSource={products}
            columns={productColumns}></Table>

        {contextHolder}

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
                    <tr key={product.id}>
                        <td>{index + 1}</td>
                        <td>
                            <Link href={`/products/edit/${product.id}`}>
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