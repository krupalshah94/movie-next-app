"use client";
/* eslint-disable */
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Third party
import { Button, Row, Col, Pagination } from "antd";
import { PlusCircleOutlined, LogoutOutlined } from "@ant-design/icons";

// Service
import { useApiCall } from "@/services/useApiCall";
import { getMovies } from "@/services/movie";

// Image
import MovieImg from "@/assets/images/movie.jpeg";
import ButtonComponent from "@/components/ButtonComponent";
import { deleteCookie } from "@/helper";

export default function Home() {
  const { call } = useApiCall();
  const router = useRouter();
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const handleLogout = () => {
    deleteCookie("token")
    router.push("/login");
  }

  const handleFetchMovies = async () => {
    call(
      () => getMovies(page),
      (response: any) => {
        setMovies(response.data.movies);
        setPage(response.data.page);
        setTotal(response.data.total);
      },
      (error: any) => {
        console.log(error);
      }
    );
  };

  const handleCreateMovie = () => {
    router.push("/create");
  };

  useEffect(() => {
    handleFetchMovies();
  }, [page]);

  return (
    <div className={`home-layout-wrapper`}>
      <div className="home-container">
        {movies.length <= 0 ? (
          <div className="title-main-block">
            <h2>Your movie list is empty</h2>
            <ButtonComponent
              text="Add a new movie"
              buttonType="submit"
              customClass="custom-button"
              onClick={handleCreateMovie}
            />
          </div>
        ) : (
          <div className="main-content-wrapepr">
            <div className="header-container">
              <h2 className="header-title">
                <span>My movies</span>
                <PlusCircleOutlined
                  className="addIcon"
                  onClick={handleCreateMovie}
                />
              </h2>
              <Button type="text" className="logoutButton" onClick={handleLogout}>
                Logout <LogoutOutlined />
              </Button>
            </div>
            <div className="grid-boxes-wrapper">
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {movies.map((movie: any, index) => {
                  return (
                    <Col
                      key={index}
                      className="gutter-row"
                      xl={6}
                      lg={6}
                      md={12}
                      sm={12}
                      xs={24}
                      onClick={() => router.push(`/movie/${movie.id}`)}
                    >
                      <div className="card-container">
                        <Image
                          className="movie-image"
                          src={movie?.image || MovieImg}
                          width={266}
                          height={400}
                          alt="movie"
                        />
                        <div className="movie-content">
                          <p className="movie-title">{movie?.name}</p>
                          <p className="movie-year">{movie?.publishDate}</p>
                        </div>
                      </div>
                    </Col>
                  );
                })}
                </Row>
                <Pagination align="center" defaultCurrent={page} total={total} onChange={(value) => setPage(value)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
