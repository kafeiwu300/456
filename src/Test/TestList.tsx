import React from 'react';
import { Tree, Icon } from 'antd';
import data from './store';
import { IStoryWithCase, ITestCase } from './interface';

const TestList: React.FC = () => {
  return (
    <Tree.DirectoryTree>
      <Tree.TreeNode title="用例包">
        {
          data.map((story: IStoryWithCase) => (
            <Tree.TreeNode title={story.title}>
              {
                story.testCases.map((testCase: ITestCase) => <Tree.TreeNode title={testCase.title} isLeaf={true}/>)
              }
            </Tree.TreeNode>
          ))
        }
      </Tree.TreeNode>
    </Tree.DirectoryTree>
  );
}

export default TestList;