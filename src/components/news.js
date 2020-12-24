import React, { useState } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,
    Row, Col,
    Button, Modal, ModalBody, ModalFooter,
    Badge
} from 'reactstrap';


const News = (props) => {
    const { news } = props;

    const [modal, setModal] = useState(false);
    const [modalNews, setModalNews] = useState(false);
    
    const toggle = async (indexNews) => {
        await setModal(!modal);
        await setModalNews(news[indexNews]);
    };

    const openNewsInNY = () => {
        window.open(modalNews.url, "_blank");
    }
 
    let modalComponent = '';
    if (modalNews) {
        modalComponent = <Modal isOpen={modal} toggle={toggle} >
                    <ModalBody>
                        <CardImg top width="100%" height="230px" src={modalNews.image} alt="Card image cap" />

                        <Badge className="m-t-10  first-letter-uppercase" color="info" pill>{modalNews.section}</Badge>
                        {
                            modalNews.category !== modalNews.section ?
                                <Badge className="m-t-10 m-l-10 first-letter-uppercase" color="info" pill>{modalNews.category}</Badge>
                            : ''
                        }
                        
                        <CardTitle className="m-t-10" tag="h5">{modalNews.title}</CardTitle>
                        <CardSubtitle tag="h6" className="m-t-10 mb-2 text-muted">{modalNews.byline} at {(new Date(modalNews.date)).toLocaleDateString('en-US')}</CardSubtitle>
                        <hr></hr>
                        <CardText>{modalNews.abstract}</CardText>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={openNewsInNY}>See complete news</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Close</Button>
                    </ModalFooter>
                </Modal>;
    }

    return (
        <div className="m-b-30" >
            <Row>
                {
                    news.map((news, i) => (
                        <Col xs="12" sm="12" md="6" lg="4" className={news.section + ' ' + news.category + ' m-t-30 d-flex align-items-stretch news'} key={i} data-id={i} onClick={toggle.bind(this, i)}>
                            <Card className="add-pointer">
                                {news.image ?
                                    <CardImg top width="100%" height="230px" src={news.image} alt="Card image cap" />
                                    : ''
                                }
                                <CardBody>
                                    <Badge className="m-b-10 first-letter-uppercase" color="info" pill>{news.section}</Badge>
                                    {
                                        news.category !== news.section ?
                                            <Badge className="m-b-10 m-l-10 first-letter-uppercase" color="info" pill>{news.category}</Badge>
                                        : ''
                                    }
                                    <CardTitle tag="h5">{news.title}</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">{news.byline} at {(new Date(news.date)).toLocaleDateString('en-US')}</CardSubtitle>
                                    <CardText>{news.abstract}</CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
            {modalComponent}
        </div>
    );
};

export default News;