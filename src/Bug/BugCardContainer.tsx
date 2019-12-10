import { BugState } from "../enums";
import { IBug, IDragObject, IPage } from "./interfaces";
import { useDrop } from "react-dnd";
import { store } from "../store";
import React, { CSSProperties, useState, useEffect, useReducer } from "react";
import BugCard from "./BugCard";
import { Icon, Modal, Pagination } from "antd";
import BugForm from "./BugForm";
import { guid } from "../Kanban/store";
import useRouter from "use-react-router";

const BugCardContainer: React.FC<{
  status: BugState;
  bugs: IBug[];
}> = ({ status, bugs }) => {
  const { match } = useRouter<{
    projectId: string
  }>();
  const { projectId } = match.params;

  const outerStyle = {
    // backgroundColor: '#e8e8e8',
    backgroundColor: "#FFFFFF",
    padding: "4px 8px",
    height: "800px"
  };
  const addTaskStyle: CSSProperties = {
    padding: "12px 16px",
    borderRadius: "4px",
    backgroundColor: "white",
    textAlign: "center",
    border: "1px solid #d9d9d9",
    margin: "4px 0",
    float: "left",
    width: "100%"
  };
  const [, drop] = useDrop({
    accept: "bugCard",
    drop: (item: IDragObject) => {
      store.dispatch({
        type: "bug-moveBug",
        bug: item.bug,
        status,
        projectId
      });
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  let bugForm: JSX.Element;
  const addBug = () => {
    Modal.confirm({
      title: "添加缺陷",
      okText: "保存",
      cancelText: "取消",
      icon: <Icon type="plus-circle" />,
      width: 600,
      content: (
        <BugForm
          wrappedComponentRef={(form: JSX.Element) => (bugForm = form)}
          bug={{ id: guid(), status }}
        />
      ),
      centered: true,
      onOk: () => {
        console.log(bugForm.props);
        store.dispatch({
          type: "bug-addBug",
          bug: {
            ...bugForm.props.bug,
            ...bugForm.props.form.getFieldsValue()
          },
          status,
          projectId
        });
      }
    });
  };

  const pageSize: number = 12;

  const list: JSX.Element[] = bugs
    .filter((bug: IBug) => bug.status === status)
    .map((bug: IBug) => <BugCard bug={bug} />);

  const slicecurrentList = (pageNumber: number) => {
    return list.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };

  const listReducer = (_state: IPage, action: number) => ({
    pageNumber: action,
    currentList: slicecurrentList(action)
  });

  const [listState, dispatchList] = useReducer(listReducer, {
    pageNumber: 1,
    currentList: slicecurrentList(1)
  });

  const onPaginationChange = (page: number) => {
    //console.log(page, pageSize, currentList);
    dispatchList(page);
  };

  useEffect(() => {
    console.log("list is" + list);
    if (listState.pageNumber * pageSize < list.length) {
      // 拖拽到列表时自动翻到最后一页
      dispatchList(Math.ceil(list.length / pageSize));
    } else if ((listState.pageNumber - 1) * pageSize === list.length) {
      dispatchList(listState.pageNumber - 1);
    } else {
      dispatchList(listState.pageNumber);
    }
  }, [bugs]);

  const showCurrentList = () => {
    return list.length === 0 && status !== "to-be-acknowledged" ? (
      <div
        style={{
          textAlign: "center",
          minHeight: "50px",
          lineHeight: "50px",
          color: "#aaa"
        }}
      >
        无缺陷
      </div>
    ) : (
      listState.currentList
    );
  };

  const showAddBugButton = () => {
    // return status === "to-be-acknowledged" ? (
    return status === "待确认" ? (
      <div style={addTaskStyle} onClick={addBug}>
        <span style={{ cursor: "pointer" }}>
          <Icon type="plus" />
          添加缺陷
        </span>
      </div>
    ) : (
      <></>
    );
  };

  return (
    <div ref={drop} style={outerStyle}>
      {showCurrentList()}
      {showAddBugButton()}
      <Pagination
        onChange={onPaginationChange}
        current={listState.pageNumber}
        total={list.length}
        pageSize={pageSize}
        size="small"
        hideOnSinglePage={true}
      />
    </div>
  );
};

export default BugCardContainer;
