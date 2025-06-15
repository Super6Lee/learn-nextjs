"use client";
import { photos } from '@/data'
import { Avatar, List } from 'antd'
import Link from 'next/link'
import React from 'react'

export default function BlogList() {
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
  )
}
