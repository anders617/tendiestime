import React from 'react';
import {Card, List } from 'antd';
import Heart from '../Heart/Heart';

const Category = ({category}) => {
    return (
        <div>
            <h2 style={{fontSize: '12pt', margin: '2px', marginTop: '10px', fontWeight: 600}}>{category.getName()}</h2>
            <Card 
                style={{boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.1)', borderRadius: '5px'}}
                bodyStyle={{padding: '10px'}}
            >
            <List 
                itemLayout="horizontal"
                dataSource={category.getMenuitemList()}
                size="small"
                split={false}
                renderItem={(item) => (
                    <List.Item style={{padding: '0px'}}>
                        <List.Item.Meta
                            style={{padding: '0px'}}
                            description={(
                                <div>
                                <h4 style={{padding: '0px', margin: '0px'}}>{item.getName()}</h4>
                                <p style={{margin: '0px', padding: '0px', display: 'block'}}>
                                    <i>{item.getAttributeList().reduce((a, b) => `${a} ${b}`, '')} - </i>
                                    <i>{item.getAllergensList().reduce((a, b) => `${a} ${b}`, '')}</i>
                                </p>
                                </div>
                            )}
                        />
                        <Heart food={item.getName().toLowerCase()} />
                    </List.Item>
                )}
            />
            </Card>
        </div>
    )
}

export default Category;
