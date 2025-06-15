import { Card, Col, Row } from "antd";
import React from "react";
import { photos } from "@/data/index";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const photo = photos.find(item => item.id === params.id);
  return {
    title: `博客详情 - ${photo?.id}`,
    description: `博客详情 - ${photo?.alt}`,
  };
}

export default function page({ params }: { params: { id: string } }) {
 
    const photo = photos.find(item => item.id === params.id);

    return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title={photo?.alt} variant="borderless">
            <img src={photo?.src} alt={photo?.alt} width={100} height={100} />
          </Card>
        </Col>
       
      </Row>
    </div>
  );
}
