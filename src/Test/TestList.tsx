import React from 'react';
import { Tree, Icon } from 'antd';
import data from './store';
import { IStoryWithCase, ITestCase } from './interface';

const TestList: React.FC = () => {
  return (
    <Tree switcherIcon={<Icon type="folder"/>} showLine>
      <Tree.TreeNode title="测试计划">
        {
          data.map((story: IStoryWithCase) => (
            <Tree.TreeNode title={story.title}>
              {
                story.testCases.map((testCase: ITestCase) => <Tree.TreeNode title={testCase.title}/>)
              }
            </Tree.TreeNode>
          ))
        }
      </Tree.TreeNode>
    </Tree>
  );
}

export default TestList;