import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Message from "Components/Message";
import Poster from "Components/Poster";
import Helmet from "react-helmet";

const Container = styled.div`
    padding: 20px;
`;

const Form = styled.form`
    margin-bottom: 50px;
    width:100%;
`;
const Input = styled.input`
    all: unset;
    font-size: 28px;
    width:100%;
`;

const SearchPresenter = ({tvResults, movieResults, searchTerm, handleSubmit, updateTerm, loading, error}) => 
<Container>
    <Helmet>
        <title>Movies | Nomflix</title>
    </Helmet>
    <Form onSubmit={handleSubmit}>
        <Input placeholder="Search Movies or TV Shows..." value={searchTerm} onChange={updateTerm}></Input>
    </Form>
    {loading ? <Loader /> : <>
        {movieResults && movieResults.length > 0 && (<Section title="Movie Results">{movieResults.map(movie => (
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
        ))}</Section>)}
        {tvResults && tvResults.length > 0 && (<Section title="TV Results">{tvResults.map(show => (
            <Poster 
            id={show.id} 
            key={show.id} 
            title={show.original_name} 
            rating={show.vote_average}
            imageUrl={show.poster_path} 
            year={show.first_air_date && show.first_air_date.substring(0,4)}
        />
        ))}</Section>)}

        {error && <Message text={error} color="#e74c3c" />}

        {tvResults && 
            movieResults && 
            tvResults.length === 0 && 
            movieResults.length === 0 && (
            // <Message text={`Nothing found for: ${searchTerm}`} color="#95a5a6" />
            <Message text="Nothing found" color="#95a5a6" />
        )}
    </>
    }
</Container>;

SearchPresenter.propTypes = {
    tvResults: PropTypes.array, 
    movieResults: PropTypes.array, 
    searchTerm: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    updateTerm:  PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired, 
    error: PropTypes.string
};

export default SearchPresenter;