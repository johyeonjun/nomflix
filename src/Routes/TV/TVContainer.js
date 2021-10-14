import { tvApi } from "../../api";
import React from "react";
import TVPresenter from "./TVPresenter";

export default class extends React.Component{
    state = {
        topRated: null,
        popualr: null,
        airingToday: null,
        loading: true,
        error: null
    };

    async componentDidMount(){
        try {
            // throw Error();
            const {data: {results: topRated}} = await tvApi.topRated();
            const {data: {results: popular}} = await tvApi.popular();
            const {data: {results: airingToday}} = await tvApi.airingToday();
            this.setState({
                topRated: topRated,
                popular: popular,
                airingToday: airingToday,
            })

        } catch {
            this.setState({
                error: "Can't find TV information"
            })
        } finally{
            this.setState({loading: false});            
        };
    }

    render() {
        const {topRated, popular, airingToday, loading, error} = this.state
        
        return <TVPresenter 
            topRated={topRated}
            popular={popular}
            airingToday={airingToday}
            loading={loading}
            error={error}
        />;

    }
}