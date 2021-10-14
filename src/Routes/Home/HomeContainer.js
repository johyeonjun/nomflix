import React from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "api";



export default class extends React.Component{
    state = {
        nowPlaying: null,
        upcoming: null,
        popular: null,
        error: null,
        loading: true
    };

    async componentDidMount(){
        try {
            // await: 해당 메서드가 끝날떄까지 기다려줌
            // 결과 object 내 data -> results 오브젝트값을 넣어주고, 변수명을 nowPlaying으로 변경
            const {
                data: {results: nowPlaying}
            } = await moviesApi.nowPlaying(); 
            const {data: {results: upcoming}} = await moviesApi.upcoming();
            const {data: {results: popular}} = await moviesApi.popular();
            // throw Error(); // 에러를 발생시킬 수 있음
            console.log(popular)
            this.setState({
                nowPlaying: nowPlaying,
                upcoming: upcoming,
                popular: popular
            })
        } catch {
            this.setState({
                error: "Can't find movie information."
            })
        } finally {
            this.setState({
                loading: false
            });
        }
    }

    render() {
            const { nowPlaying, upcoming, popular, error, loading } = this.state;
            
            return (
                <HomePresenter 
                    nowPlaying={nowPlaying}  
                    upcoming={upcoming}
                    popular={popular}
                    error={error}
                    loading={loading}
                />
        );
    }
} 