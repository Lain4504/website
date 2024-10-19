import { Tabs } from 'antd';
import { CommentOutlined, FileTextOutlined } from '@ant-design/icons';
import { useState } from 'react';
import parser from 'html-react-parser';
import FeedBack from '../pages/FeedBack';

const { TabPane } = Tabs;

const TabSwitchProductDetail = ({book, userId}) => {
  const [activeTab, setActiveTab] = useState("content");
  const description = book.description;
  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  return (
    <Tabs
      activeKey={activeTab}
      onChange={handleTabClick}
      className="hnt-tab"
      tabBarStyle={{
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        background: 'white',
        borderBottom: '1px solid #eaeaea',
      }}
    >
      <TabPane
        tab={
          <span className={`flex items-center space-x-1 ${activeTab === "content" ? "text-blue-600 font-bold" : "text-gray-600"}`}>
            <FileTextOutlined />
            <span>Nội dung</span>
          </span>
        }
        key="content"
      >
        {typeof description === 'string' ? parser(description) : 'Nội dung không có sẵn'}
      </TabPane>
      <TabPane
        tab={
          <span className={`flex items-center space-x-1 ${activeTab === "comment" ? "text-blue-600 font-bold" : "text-gray-600"}`}>
            <CommentOutlined />
            <span>Bình luận</span>
          </span>
        }
        key="comment"
      >
        {/* Nội dung cho tab Bình luận */}
        <FeedBack bookId={book.id} userId={userId}/>
      </TabPane>
    </Tabs>
  );
};

export default TabSwitchProductDetail;
