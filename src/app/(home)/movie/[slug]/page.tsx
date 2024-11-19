"use client";

import ButtonComponent from "@/components/ButtonComponent";
import InputComponent from "@/components/InputComponent";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Row, Col, Upload, Form } from "antd";
import React, { useEffect, useState } from "react";

// Service
import { useApiCall } from "@/services/useApiCall";
import { getMovie, updateMovie, uploadImage } from "@/services/movie";
import { useRouter } from "next/navigation";

function page({ params }: any) {
  const { call } = useApiCall();
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<any>();

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleUploadImage = (values: any) => {
    setLoading(true);
    if (selectedFile) {
      call(
        () => uploadImage({ image: selectedFile}),
        (response: any) => {
          handleUpdateMovie({ ...values, image: response.data.fileUrl });
        },
        (error: any) => {
          console.log(error);
          setLoading(false);
        }
      )
    } else {
      handleUpdateMovie({...values, image: imageUrl});
    }
  };

  const handleUpdateMovie = (values: any) => {
    call(
      () => updateMovie(params.slug, values),
      (response: any) => {
        router.push(`/`);
        setLoading(false);
      },
      (error: any) => {
        console.log(error);
        setLoading(false);
      }
    );
  };

  const getMovieById = async (id: string) => {
    call(
      () => getMovie(id),
      (response: any) => {
        setImageUrl(response.data.image);
        form.setFieldsValue({
          name: response.data.name,
          publishDate: response.data.publishDate,
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    getMovieById(params.slug);
  }, []);

  return (
    <div className={`home-layout-wrapper`}>
      <div className="home-container">
        <div className="main-content-wrapepr">
          <h2 className="header-title">
            <span>Create a new movie </span>
          </h2>

          <Form
            form={form}
            className="grid-boxes-wrapper"
            name="basic"
            labelCol={{ span: 8 }}
            layout="vertical"
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={(value) => handleUploadImage(value)}
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                xl={14}
                lg={14}
                md={14}
                sm={24}
                xs={24}
              >
                <Form.Item className="upload-img-wrapper">
                  <Upload
                    name="avatar"
                    className="avatar-uploader custom-uploader"
                    listType="picture-card"
                    maxCount={1}
                    beforeUpload={() => false}
                    onChange={(info) => {
                      setImageUrl("")
                      setSelectedFile(info.file);
                    }}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Form.Item>
              </Col>
              <Col
                className="gutter-row"
                xl={10}
                lg={10}
                md={10}
                sm={24}
                xs={24}
              >
                <div className="form-inner-container">
                  <InputComponent
                    name="name"
                    rules={[{ required: true, message: "Title is required" }]}
                    placeholder="Title"
                  />

                  <InputComponent
                    name="publishDate"
                    rules={[
                      {
                        required: true,
                        message: "Publishing year is required",
                      },
                    ]}
                    placeholder="Publishing year"
                  />

                  <Form.Item>
                    <ButtonComponent text="Submit" buttonType="submit" disabled={loading} />
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default page;
