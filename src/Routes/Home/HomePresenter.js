import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";
import { Helmet } from "react-helmet";

const Container = styled.div`
    padding: 20px;
`;

const HomePresenter = ({nowPlaying, popular, upcoming, loading, error}) => 
    <>
    <Helmet>
        <title>Movies | Nomflix</title>
    </Helmet>
    {
        loading ? <Loader/> :
            <Container>
                {upcoming && upcoming.length > 0 && (
                <Section title="Upcoming Movies">
                    {upcoming.map(movie => 
                        <Poster 
                            id={movie.id} 
                            key={movie.id} 
                            title={movie.original_title} 
                            rating={movie.vote_average}
                            imageUrl={movie.poster_path} 
                            year={movie.release_date && movie.release_date.substring(0,4)}
                            isMovie={true}
                        />
                        // <span key={movie.id}>{movie.title}</span>
                    )}
                </Section>
                )}

                {nowPlaying && nowPlaying.length > 0 && (
                <Section title="Now Playing">
                    {nowPlaying.map(movie => 
                        <Poster 
                        id={movie.id} 
                        key={movie.id} 
                        title={movie.original_title} 
                        rating={movie.vote_average}
                        imageUrl={movie.poster_path} 
                        year={movie.release_date && movie.release_date.substring(0,4)}
                        isMovie={true}
                    />
                        // <span key={movie.id}>{movie.title}</span>
                    )}
                </Section>
                )}

                {popular && popular.length > 0 && (
                    <Section title="Popular Movies">{popular.map(movie => 
                        <Poster 
                            id={movie.id} 
                            key={movie.id} 
                            title={movie.original_title} 
                            rating={movie.vote_average}
                            imageUrl={movie.poster_path} 
                            year={movie.release_date && movie.release_date.substring(0,4)}
                            isMovie={true}
                        />
                        // <span key={movie.id}>{movie.title}</span>
                    )}</Section>
                )}
                {error && <Message text={error} color="#e74c3c"/>}
            </Container>
        }
    </>

    
;

HomePresenter.propTypes = {
    nowPlaying: PropTypes.array, 
    popular: PropTypes.array, 
    upcoming: PropTypes.array, 
    loading: PropTypes.bool.isRequired, 
    error: PropTypes.string
};

export default HomePresenter;