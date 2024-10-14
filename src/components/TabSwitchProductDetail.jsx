import { Tabs } from 'antd';
import { CommentOutlined, FileTextOutlined } from '@ant-design/icons';
import { useState } from 'react';
import parser from 'html-react-parser';

const { TabPane } = Tabs;

const TabSwitchProductDetail = ({description}) => {
  const [activeTab, setActiveTab] = useState("new");

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
          <span className={`flex items-center space-x-1 ${activeTab === "new" ? "text-blue-600 font-bold" : "text-gray-600"}`}>
            <FileTextOutlined />
            <span>Nội dung</span>
          </span>
        }
        key="new"
      >
        {typeof description === 'string' ? parser(description) : 'Nội dung không có sẵn'}
      </TabPane>
      <TabPane
        tab={
          <span className={`flex items-center space-x-1 ${activeTab === "bestseller" ? "text-blue-600 font-bold" : "text-gray-600"}`}>
            <CommentOutlined />
            <span>Bình luận</span>
          </span>
        }
        key="bestseller"
      >
        {/* Nội dung cho tab Bình luận */}
      </TabPane>
    </Tabs>
  );
};

export default TabSwitchProductDetail;
