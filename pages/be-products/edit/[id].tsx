import { WithDefaultLayout } from "@/components/DefautLayout";
import { ProductClient } from "@/functions/BackendApiClient";
import { useSwrFetcherWithAccessToken } from "@/functions/useSwrFetcherWithAccessToken";
import { CreateOrEditProductFormType, CreateOrEditProductFormSchema } from "@/schemas/CreateOrEditProductSchema";
import { Page } from "@/types/Page";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Alert, Button, Col, Form, Input, InputNumber, Row, Space } from "antd";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

// We could use the generated interface from the NSwag Studio or Swagger instead.
export interface ProductDetailResponse {
    productId?: string;
    name?: string | undefined;
    price?: number;
}

const EditProductPage: Page<{ id: string }> = ({ id }) => {
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    const queryFetcher = useSwrFetcherWithAccessToken();

    /**
     * Define the useQuery hook to fetch the product data from the server.
     */
    const { data } = useQuery<ProductDetailResponse>(
        {
            queryKey: ['products'],
            // We must provide our own fetch implementation.
            // Basic implementation: await (await fetch('/api/be-custom/api/v1/product')).json()
            // Or you can use useFetchWithAccessToken or useSwrFetcherWithAccessToken hook.
            // Or you can event implement your own fetcher, i.e.: useQueryFetcherWithAccessToken.
            queryFn: async () => await queryFetcher(`/api/be-custom/api/v1/product/${id}`)
        });

    const { handleSubmit, control, formState: { errors } } = useForm<CreateOrEditProductFormType>({
        resolver: zodResolver(CreateOrEditProductFormSchema),
        values: {
            id: data?.productId,
            name: data?.name as string,
            price: data?.price as number
        },
        mode: 'onChange'
    });

    /**
     * Handle the form submission event.
     * @param e 
     * @returns 
     */
    async function onFormSubmit(formData: CreateOrEditProductFormType) {
        // ID should not be empty, but whenever we have a nullable property,
        // we should always check if it is null or not first.
        // When validating the form data, including ID and we already using form validation library
        // such as React Hook Form, ideally we should configure the ID validation on the same level.
        // Doing ID validation manually like this just for fast demonstration.

        console.info(formData);
        if (!formData.id) {
            // The ideal way to handle this usually tell the user that the ID is not found using alert box.
            return;
        }

        // Using the generated client code from NSwag Studio.
        const productClient = new ProductClient('http://localhost:3000/api/be-custom');
        try {
            await productClient.productPUT(formData.id, {
                name: formData.name,
                price: formData.price
            });
        } catch (error) {
            console.error(error);
        }

        setIsAlertVisible(true);
    }

    return (
        <>
            <Space direction="vertical" size={"small"} style={{ display: 'flex' }}>
                <Row>
                    <Col span={24}>
                        <h1>Editing Product</h1>
                        <p><Link href={'/be-products'}>Or click here to go back to Products page.</Link></p>
                    </Col>
                </Row>

                {isAlertVisible &&
                    <Row>
                        <Col span={24}>
                            <Alert
                                message="Product has been updated successfully!"
                                type="success"
                                closable
                                onClose={() => setIsAlertVisible(false)}
                            />
                        </Col>
                    </Row>
                }

                <Form onFinish={(handleSubmit(onFormSubmit))}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}>
                    <Form.Item label="Product Name"
                        name='name'>
                        <Controller name="name"
                            control={control}
                            render={({ field }) => <Input id="name"
                                placeholder="Product Name" {...field} />} />
                    </Form.Item>
                    {errors.name && <span className="text-red-500">{errors.name.message}</span>}

                    <Form.Item label="Product Price"
                        name='price'>
                        <Controller name="price"
                            control={control}
                            render={({ field }) => <InputNumber id="price"
                                defaultValue={0} {...field} />} />
                    </Form.Item>
                    {errors.price && <span className="text-red-500">{errors.price.message}</span>}

                    <Form.Item wrapperCol={{ span: 16 }}>
                        <Button type="primary" htmlType="submit" className="bg-blue-500">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Space>

        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    // Fetch data from external API.
    const { id } = context.query;

    return { props: { id } };
}

EditProductPage.layout = WithDefaultLayout;
export default EditProductPage;