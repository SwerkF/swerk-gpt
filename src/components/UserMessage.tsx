import React from 'react';
import { Avatar, Space, Col, Row, Typography } from 'antd';
const { Paragraph, Text } = Typography;

const UserMessage = (props:any) => {
    return (
        <div className="user">
            <Row align="middle">
                <Col span={4} className="text-center p-4">
                    <Space>
                        <Avatar shape="square" size={64} icon={<img src="https://api.swerk.fr/api/images/logouser.jpg" />} />
                    </Space>
                </Col>
                <Col span={16}>
                    <div className="blue p-3"><Paragraph className="text-color">{props.text}</Paragraph></div>
                </Col>
            </Row>
        </div>
    );
};

export default UserMessage;