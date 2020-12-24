import { Component } from 'react';
import api from './services/api';
import Header from './components/header';
import News from './components/news';
import { Spinner, Container, Alert } from 'reactstrap';

class App extends Component {

  state = {
    news: [],
    categoryNews: [],
    typeNews: null,
    loader: true
  }

  async componentDidMount() {
    try {
      let scienceNews = (await api.get('science.json')).data.results;
      scienceNews = this.formatNews('science', scienceNews);
      let technologyNews = (await api.get('technology.json')).data.results;
      technologyNews = this.formatNews('technology', technologyNews);
      let allNews = scienceNews.concat(technologyNews);
      allNews = this.orderAllNews(allNews);
      let categories = this.getCategoryNews(allNews);
      this.setState({ news: allNews, categoryNews: categories });
    } catch (error) { } 
    finally {
      this.setState({ loader: false });
    }
  }

  getCategoryNews(allNews) {
    let categories = [];
    allNews.forEach(news => {
      if (!categories.includes(news.section)) {
        if (news.section !== 'science' && news.section !== 'technology') {
          categories.push(news.section);
        }
      }
    });

    categories.sort((a, b) => {
      if (a < b) { return -1; }
      if (a > b) { return 1; }
      return 0;
    })
    return categories;
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
    allNews.sort((firstDate, secondDate) => {
      return new Date(secondDate.published_date) - new Date(firstDate.published_date);
    });
    return allNews;
  }

  setCategorySelected = (e) => {
    this.setState({ typeNews: e });
  }

  render() {

    let whatRender = <div className="center-spinner">
      <Spinner color="info" style={{ width: '5rem', height: '5rem' }} />{' '}
    </div>

    if (!this.state.loader && this.state.categoryNews.length === 0) {
      whatRender = <div>
        <Container className="m-t-30">
          <Alert color="danger">
            The news could not be loaded. Try again later.
        </Alert>
        </Container>
      </div>
    } else if (!this.state.loader && this.state.categoryNews.length > 0) {
      whatRender = <div>
        <Header setCategorySelected={this.setCategorySelected} categories={this.state.categoryNews} />
        <Container>
          {
            this.state.typeNews && this.state.typeNews !== 'news' ?
              <h4 className="m-t-30 first-letter-uppercase">News about {this.state.typeNews}</h4>
              : ''
          }
          <News news={this.state.news} />
        </Container>
      </div>
    }

    return (
      <div>
        {whatRender}
      </div>
    )
  }
}

export default App;
