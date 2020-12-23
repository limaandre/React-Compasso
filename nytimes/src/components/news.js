import React, { useState } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,
    Container, Row, Col,
    Button, Modal, ModalBody, ModalFooter
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
        <Container className="m-b-30" >
            <Row className="m-t-30">
                {
                    news.map((news, i) => (
                        <Col xs="12" sm="12" md="6" lg="4" className="m-t-30 d-flex align-items-stretch " key={i} data-id={i} onClick={toggle.bind(this, i)}>
                            <Card className="add-pointer">
                                {news.image ?
                                    <CardImg top width="100%" height="230px" src={news.image} alt="Card image cap" />
                                    : ''
                                }
                                <CardBody>
                                    <CardTitle tag="h5">{news.title} Teste</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">{news.byline} at {(new Date(news.date)).toLocaleDateString('en-US')}</CardSubtitle>
                                    <CardText>{news.abstract}</CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
            {modalComponent}
        </Container>
    );
};

export default News;