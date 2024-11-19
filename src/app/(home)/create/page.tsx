"use client";
/* eslint-disable */
import ButtonComponent from "@/components/ButtonComponent";
import InputComponent from "@/components/InputComponent";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Row, Col, Upload, Form } from "antd";
import React, { useState } from "react";

// Service
import { useApiCall } from "@/services/useApiCall";
import { createMovie, uploadImage } from "@/services/movie";
import { useRouter } from "next/navigation";

function page() {
  const { call } = useApiCall();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
        () => uploadImage({ image: selectedFile }),
        (response: any) => {
          handleCreateMovie({ ...values, image: response.data.fileUrl });
        },
        (error: any) => {
          console.log(error);
          setLoading(false);
        }
      );
    } else {
      handleCreateMovie(values);
    }
  };

  const handleCreateMovie = (values: any) => {
    call(
      () => createMovie(values),
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

  return (
    <div className={`home-layout-wrapper`}>
      <div className="home-container">
        <div className="main-content-wrapepr">
          <h2 className="header-title">
            <span>Create a new movie </span>
          </h2>

          <Form
            className="grid-boxes-wrapper"
            name="basic"
            labelCol={{ span: 8 }}
            layout="vertical"
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={(value) => handleUploadImage(value)}
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="mt-120">
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
                      setSelectedFile(info.file);
                    }}
                  >
                    {uploadButton}
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
                    <ButtonComponent
                      text="Submit"
                      buttonType="submit"
                      disabled={loading}
                    />
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
