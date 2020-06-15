import React from 'react';
import './App.css';
import { Row, Col, Layout } from 'antd';
import Menu from './components/Menu/Menu';

const { Header, Footer, Content } = Layout;

const linkStyle = {
  color: '#000000', 
  textDecoration: 'none',
};

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
        <Footer style={{backgroundColor: 'transparent'}} >
          <a href="/">tendies time</a><br />
          <a href="/stats">mdining statistics</a><br />
          &copy; 2019-2020 <a href="https://andersboberg.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>Anders Boberg</a>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
