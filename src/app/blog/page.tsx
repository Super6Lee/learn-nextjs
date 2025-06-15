"use client";
import { Avatar, List } from "antd";
import React from "react";

import { photos } from '@/data/index';
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={photos}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta className="!items-center"
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={<Link href={`/blog/${item.id}`}>{item.alt}</Link>}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
