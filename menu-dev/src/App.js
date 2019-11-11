import React from 'react';
import './App.css';
import { Row, Col, Layout } from 'antd';
import Menu from './components/Menu/Menu';

const { Header, Footer, Content } = Layout;


function App() {
  return (
    <div className="App">
      <Layout style={{backgroundColor: 'transparent'}}>
        <Header style={{backgroundColor: 'transparent', fontSize: '18pt', fontWeight: 600}}>MDining Menus</Header>
        <Content style={{backgroundColor: 'transparent'}}>
          <Row type="flex" justify="center">
            <Col>
              <Menu style={{maxWidth: '700px'}}/>
            </Col>
          </Row>
        </Content>
        <Footer style={{backgroundColor: 'transparent'}}>&copy; 2019 Anders Boberg</Footer>
      </Layout>
    </div>
  );
}

export default App;
