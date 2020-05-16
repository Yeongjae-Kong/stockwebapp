import React from 'react';
import { Card, Row, Col, Avatar } from 'antd';
import { AlignLeftOutlined } from '@ant-design/icons';

class NewsBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: {}
    };
  }
  componentDidMount() {
    fetch("http://localhost:3001/news")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  conditionalRender(){
    if (this.state.isLoaded){
      const newsCards = [];
      const newsItems = this.state.items.articles;
      let headline, imageURL, url, loaded;
      for (let i = 0; i < newsItems.length; i++) {
        headline = newsItems[i].title;
        imageURL = newsItems[i].urlToImage;
        url = newsItems[i].url;
        loaded = this.state.isLoaded;
        newsCards.push(
          <>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <NewsContents loaded={loaded} image={imageURL} headline={headline} />
            </a>
          </>
        )
      }
      return newsCards;
    }else{
      return <BlankContents />
    }
  }
  render(){
    const display = this.conditionalRender();
    return (
      <div className="articles-news">
        <Card title="News" className="card-news">
          {display}
        </Card>
      </div>
    );
  }
}

function NewsContents(props) {
  return (
    <Row style={{width: "100%"}}>
      <Card loading={!props.loaded} className="article-single ant-btn-primary">
        <Row>
          <Col span={3} style={{marginRight: "10px"}}>
            <Avatar 
              shape="square" 
              size="large" 
              src={props.image} 
            />
          </Col>
          <Col span={19}>
            {props.headline}
          </Col>
        </Row>
      </Card>
    </Row>
  );
}

function BlankContents(){
  return(
    <>
        <NewsContents loaded={false} image={<AlignLeftOutlined />} headline="" />
        <NewsContents loaded={false} image={<AlignLeftOutlined />} headline="" />
        <NewsContents loaded={false} image={<AlignLeftOutlined />} headline="" />
    </>
  );
}

export {NewsBody};