import { BugState } from "../enums";
import { IBug, IDragObject, IPage } from "./interfaces";
import { useDrop } from "react-dnd";
import { store } from "../store";
import React, { CSSProperties, useEffect, useReducer, useContext } from "react";
import BugCard from "./BugCard";
import { Icon, Modal, Pagination, Form } from "antd";
import BugForm from "./BugForm";
import useRouter from "use-react-router";
import ProjectContext from "../common/contexts/ProjectContext";

const BugCardContainer: React.FC<{
  status: BugState;
  bugs: IBug[];
  canAddBug: boolean
}> = ({ status, bugs, canAddBug }) => {
  const { match } = useRouter<{
    projectId: string
  }>();
  const { projectId } = match.params;

  const project = useContext(ProjectContext);

  const outerStyle = {
    // backgroundColor: '#e8e8e8',
    backgroundColor: "#FFFFFF",
    padding: "4px 8px",
    height: "700px",
    border: "1px solid #d9d9d9",
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

  const paginationStyle: CSSProperties = {
    float: "left",
    width: "100%",
    textAlign: "center",
    paddingTop: "15px"
  };

  // react-dnd拖拽
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

  let bugForm: Form;

  const addBug = () => {
    Modal.confirm({
      title: "添加缺陷",
      okText: "保存",
      cancelText: "取消",
      icon: <Icon type="plus-circle" />,
      width: 600,
      content: (
        <BugForm
          bugStatus={project.bugStatusList!}
          wrappedComponentRef={(form: Form) => (bugForm = form)}
          bug={{ status }}
        />
      ),
      centered: true,
      onOk: () => {
        // (bugForm.props);
        console.log(bugForm);
        store.dispatch({
          type: "bug-addBug",
          bug: {
            status,
            ...bugForm.props.form!.getFieldsValue()
          },
          status,
          projectId
        });
      },
      getContainer: false
    });
  };

  const pageSize: number = 12;

  // 根据bug生成的JSX数组
  const list: JSX.Element[] = bugs
    .filter((bug: IBug) => bug.status === status)
    .map((bug: IBug) => <BugCard bug={bug} />);

  // 切除当前页需要显示的list
  const slicecurrentList = (pageNumber: number) => {
    return list.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };

  // 用于处理list的reducer，这样就不用两个state了
  const listReducer = (_state: IPage, action: number) => ({
    pageNumber: action,
    currentList: slicecurrentList(action)
  });

  const [listState, dispatchList] = useReducer(listReducer, {
    pageNumber: 1,
    currentList: slicecurrentList(1)
  });

  // 分页器处理函数
  const onPaginationChange = (page: number) => {
    //console.log(page, pageSize, currentList);
    dispatchList(page);
  };

  useEffect(() => {
    // console.log("list is" + list, listState.pageNumber);
    // dispatchList(Math.ceil(list.length / pageSize));
    if (
      listState.pageNumber > 1 &&
      (listState.pageNumber - 1) * pageSize === list.length
    ) {
      // 当前页的bug都被拖走了则翻到上一页，但不能翻到第0页
      dispatchList(listState.pageNumber - 1);
    } else {
      dispatchList(listState.pageNumber);
    }
  }, [list.length]);

  // 显示当前页的list
  const showCurrentList = () => {
    return list.length === 0 && status !== "待确认" ? (
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

  // 在第一栏显示添加缺陷按钮
  const showAddBugButton = () => {
    // return status === "to-be-acknowledged" ? (
    return canAddBug ? (
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
      <div style={paginationStyle}>
        <Pagination
          onChange={onPaginationChange}
          current={listState.pageNumber}
          total={list.length}
          pageSize={pageSize}
          size="small"
          hideOnSinglePage={true}
        />
      </div>
    </div>
  );
};

export default BugCardContainer;
