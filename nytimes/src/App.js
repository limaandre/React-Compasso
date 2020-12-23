import { Component } from 'react';
import api from './services/api';
import Header from './components/header';
import News from './components/news';

class App extends Component {

  state = {
    news: [],
  }

  async componentDidMount() {
    let scienceNews = (await api.get('science.json')).data.results;
    scienceNews = this.formatNews('science', scienceNews);
    let technologyNews = (await api.get('technology.json')).data.results;
    technologyNews = this.formatNews('technology', technologyNews);

    let allNews = scienceNews.concat(technologyNews);
    allNews = this.orderAllNews(allNews);
    this.setState({ news: allNews });
  }

  formatNews(category, newsApi) {
    return newsApi.map(news => {
      return {
        title: news.title,
        section: news.section,
        date: news.published_date,
        category,
        abstract: news.abstract,
        byline: news.byline,
        image: Array.isArray(news.multimedia) ? news.multimedia[0].url : '',
        url: news.url
      }
    })
  }

  orderAllNews(allNews) {
    allNews.sort(function (a, b) {
      return new Date(b.published_date) - new Date(a.published_date);
    });
    return allNews;
  }

  render() {
    return (
      <div>
        <Header />
        <News news={this.state.news} />
      </div>
    )
  }
}

export default App;
