import { moviesApi, tvApi, collectionApi } from "api";
import React from "react";
import DetailPresenter from "./DetailPresenter";

export default class extends React.Component{
    constructor(props){
        super(props);
        const{location: {
            pathname
        }} = props; 

        this.state = {
            result: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie/"),
            collections: null,
        };
    }

    async componentDidMount(){
        const {
            match: {
                params: {
                    id
                }
            },
            history: {
                push
            }
            
        } = this.props;
        
        const {isMovie} = this.state;
        const parsedId = parseInt(id);
        
        if (isNaN(parsedId)) {
            // int형이 아니라면, 메인페이지로 이동
            // return 하지 않는 경우, 다음 스크립트 내용으로 넘어감
            return push("/"); 
        }

        let result = null;
        let collectionDatas = null;
        
        try {
            if (isMovie){
                ({data: result} = await moviesApi.movieDetail(parsedId));
                if (result.belongs_to_collection) {
                    const {data: resultCollection} = await collectionApi.collections(result.belongs_to_collection.id);    
                    collectionDatas = resultCollection;
                    this.setState({collections: resultCollection.parts})
                }
            } else {
                ({data: result} = await tvApi.showDetail(parsedId));
                console.log(result);
            }
        } catch {
            this.setState({error: "Can't find anything."})
        } finally {
            this.setState({loading: false, result})
        }
        
        
    }

    render() {
            const { result, error, loading, collections } = this.state;
            console.log('render');
            return (
                <DetailPresenter 
                    result={result}  
                    error={error}
                    loading={loading}
                    collections={collections}
                />
        );
    }
}