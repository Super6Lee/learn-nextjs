"use client";

import React, { useState, useEffect, useRef } from "react";

interface Article {
  id: string;
  title: string;
  content: string;
}

export default function Page() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 添加文章相关状态
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 编辑文章相关状态
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isEditSubmitting, setIsEditSubmitting] = useState(false);

  // 添加拖拽相关状态
  const [position, setPosition] = useState({ x: 0, y: 0 }); // 初始位置居中
  const [editPosition, setEditPosition] = useState({ x: 0, y: 0 }); // 编辑弹窗位置
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);
  const editModalRef = useRef<HTMLDivElement>(null);

  // 组件挂载时，pageNum 和 pageSize 变化时，获取文章列表
  useEffect(() => {
    fetchArticles();
  }, [pageNum, pageSize]);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        pageNum: pageNum.toString(),
        pageSize: pageSize.toString(),
        title,
        content,
      });

      // 打印请求参数  
      // queryParams.entries() 返回一个迭代器，迭代器中包含所有参数的键值对
      // Object.fromEntries(queryParams.entries()) 将迭代器转换为对象
      console.log("发送请求参数:", Object.fromEntries(queryParams.entries()));

      // 发送请求
      // fetch 函数 发送请求
      // /api/articles?pageNum=1&pageSize=4&title=&content=
      // 请求参数 会自动拼接在 url 后面
      const response = await fetch(`/api/articles?${queryParams}`);
      const data = await response.json();
      setArticles(data.data);
      setTotal(data.total);
    } catch (error) {
      console.error("获取文章失败:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 
   * @param e 事件对象    ? 表示可以为空    React.FormEvent 表单事件
   */
  const handleSearch = (e?: React.FormEvent) => {

    // 如果 e 存在，则阻止默认行为 (默认行为是 执行提交表单提交和刷新页面)，执行下面代码
    if (e) e.preventDefault();
    setTitle(searchTitle);
    setPageNum(1);
    fetchArticles();
  };

  const handleReset = () => {
    setSearchTitle("");
    setTitle("");
    setContent("");
    setPageNum(1);
    fetchArticles();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定要删除这篇文章吗？")) return;

    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("删除文章失败");
      }

      // 刷新文章列表
      fetchArticles();
    } catch (error) {
      console.error("删除文章错误:", error);
      alert("删除文章失败，请重试");
    }
  };

  const handlePageChange = (page: number) => {
    setPageNum(page);
  };

  // 处理模态框打开
  const handleOpenModal = () => {
    setIsModalOpen(true);
    // 设置弹窗初始位置居中，适配小屏幕
    setPosition({ x: 0, y: 0 });
  };

  // 处理编辑模态框打开
  const handleOpenEditModal = async (id: string) => {
    try {
      // 获取文章详情
      const response = await fetch(`/api/articles/${id}`);
      if (!response.ok) {
        throw new Error("获取文章详情失败");
      }

      const article = await response.json();
      setEditingArticle(article);
      setIsEditModalOpen(true);

      // 设置弹窗初始位置居中，适配小屏幕
      setEditPosition({ x: 0, y: 0 });
    } catch (error) {
      console.error("获取文章详情错误:", error);
      alert("获取文章详情失败，请重试");
    } finally {
    }
  };

  // 处理模态框关闭
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewArticle({
      title: "",
      content: "",
    });
  };

  // 处理编辑模态框关闭
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingArticle(null);
  };

  // 处理新文章表单输入变化
  const handleNewArticleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewArticle((prev: typeof newArticle) => ({
      // 旧对象的所有属性
      ...prev,
      // 新对象的属性
      [name]: value,
    }));
  };

  // 处理编辑文章表单输入变化
  const handleEditArticleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (editingArticle) {
      setEditingArticle({
        ...editingArticle,
        [name]: value,
      });
    }
  };

  // 处理添加文章提交
  const handleAddArticle = async (e: React.FormEvent) => {
    e.preventDefault();

    // 表单验证
    if (!newArticle.title.trim() || !newArticle.content.trim()) {
      alert("标题和内容不能为空");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArticle),
      });

      if (!response.ok) {
        throw new Error("添加文章失败");
      }

      const result = await response.json();
      console.log("添加文章成功:", result);

      // 关闭模态框并重置表单
      handleCloseModal();

      // 刷新文章列表
      fetchArticles();
    } catch (error) {
      console.error("添加文章错误:", error);
      alert("添加文章失败，请重试");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 处理编辑文章提交
  const handleUpdateArticle = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingArticle) return;

    // 表单验证
    if (!editingArticle.title.trim() || !editingArticle.content.trim()) {
      alert("标题和内容不能为空");
      return;
    }

    setIsEditSubmitting(true);

    try {
      const response = await fetch(`/api/articles/${editingArticle.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editingArticle.title,
          content: editingArticle.content,
        }),
      });

      if (!response.ok) {
        throw new Error("更新文章失败");
      }

      const result = await response.json();
      console.log("更新文章成功:", result);

      // 关闭模态框
      handleCloseEditModal();

      // 刷新文章列表
      fetchArticles();
    } catch (error) {
      console.error("更新文章错误:", error);
      alert("更新文章失败，请重试");
    } finally {
      setIsEditSubmitting(false);
    }
  };

  // 开始拖拽 - 整个弹窗可拖拽
  const handleMouseDown = (e: React.MouseEvent) => {
    // 排除表单元素，避免影响输入
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLButtonElement
    ) {
      return;
    }

    setIsDragging(true);
    setLastMousePosition({ x: e.clientX, y: e.clientY });

    // 防止文本选择和其他默认行为
    e.preventDefault();
  };

  // 拖拽中 - 直接跟随鼠标移动
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      // 计算鼠标移动的距离
      const deltaX = e.clientX - lastMousePosition.x;
      const deltaY = e.clientY - lastMousePosition.y;

      // 更新弹窗位置
      if (isEditModalOpen) {
        setEditPosition((prev: { x: number; y: number }) => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY,
        }));
      } else {
        setPosition((prev: { x: number; y: number }) => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY,
        }));
      }

      // 更新最后的鼠标位置
      setLastMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  // 结束拖拽
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 添加和移除全局鼠标事件监听器
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    // 移除全局鼠标事件监听器
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, lastMousePosition, isEditModalOpen]);

  return (

    /** 内边距 5, 最大宽度 7xl, 水平居中, 相对定位 */
    <div className="p-5 max-w-7xl mx-auto relative">
      {/** 提交会触发handleSearch函数    CSS 样式: 弹性布局, 底部外间距 5, 交叉轴居中对齐, 子元素间距 2.5 */}
      <form onSubmit={handleSearch} className="flex mb-5 items-center gap-2.5">
        <input
          type="text"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          placeholder="搜索标题"
          /** 内边距 2, 边框样式: 灰色 300, 圆角, 最大宽度 1/4, 弹性增长 */
          className="p-2 border border-gray-300 rounded max-w-xs flex-grow"
        />
        <button
          type="submit"
          /** 内边距水平轴 4, 内边距垂直轴 2, 背景颜色: 白色, 边框样式: 实线 1px边框, 灰色 300, 圆角, 鼠标悬停时背景颜色: 灰色 100 */
          className="px-4 py-2 bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
        >
          搜索
        </button>
        <button
          type="button"
          onClick={handleReset}
          /** 内边距水平轴 4, 内边距垂直轴 2, 背景颜色: 白色, 边框样式: 实线 1px边框, 灰色 300, 圆角, 鼠标悬停时背景颜色: 灰色 100 */
          className="px-4 py-2 bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
        >
          重置
        </button>
        <button
          type="button"
          onClick={handleOpenModal}
          /** 内边距水平轴 4, 内边距垂直轴 2, 背景颜色: 蓝色 500, 文本颜色: 白色, 边框样式: 实线 1px边框, 蓝色 500, 圆角, 鼠标悬停时背景颜色: 蓝色 400, 鼠标悬停时边框颜色: 蓝色 400 左外边距自动 */
          className="px-4 py-2 bg-blue-500 text-white border border-blue-500 rounded cursor-pointer hover:bg-blue-400 hover:border-blue-400 ml-auto"
        >
          添加
        </button>
      </form>

      {!isLoading ? (
        /** 表格宽度 100%, 边框样式: 无间隔, 底部外边距 5 */
        <table className="w-full border-collapse mb-5">
          <thead>
            <tr>
              {/** 内边距 3, 文本对齐: 左对齐, 边框样式: 实线 1px边框, 灰色 200, 背景颜色: 灰色 50, 字体粗细: 中等 */}
              <th className="p-3 text-left border border-gray-200 bg-gray-50 font-medium">
                标题
              </th>
              <th className="p-3 text-left border border-gray-200 bg-gray-50 font-medium">
                内容
              </th>
              <th className="p-3 text-left border border-gray-200 bg-gray-50 font-medium">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {articles.length > 0 ? (
              articles.map((article) => (
                <tr key={article.id}>
                  {/** 内边距 3, 文本对齐: 左对齐, 边框样式: 实线 1px边框, 灰色 200 */}
                  <td className="p-3 text-left border border-gray-200">
                    {article.title}
                  </td>
                  <td className="p-3 text-left border border-gray-200">
                    {article.content}
                  </td>
                  <td className="p-3 text-left border border-gray-200">
                    <button
                      onClick={() => {
                        handleOpenEditModal(article.id);
                      }}
                      /** 右外边距 2.5, 文本颜色: 蓝色 500, 无下划线, 背景颜色: 透明, 边框样式: 无, 鼠标悬停时文本颜色: 蓝色 400 */
                      className="mr-2.5 text-blue-500 no-underline bg-transparent border-none cursor-pointer"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(article.id);
                      }}
                      className="mr-2.5 text-red-500 no-underline bg-transparent border-none cursor-pointer"
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="p-3 text-center border-b border-gray-100"
                >
                  没有找到文章
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-10">加载中...</div>
      )}

      {total > 0 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handlePageChange(pageNum - 1)}
            disabled={pageNum <= 1}
            /** 最小宽度 32px, 高度 8px, 内边距水平轴 1.5, 边框样式: 实线 1px边框, 灰色 300, 背景颜色: 白色, 圆角, 弹性布局: 交叉轴居中对齐, 主轴居中对齐, 禁用时文本颜色: 灰色 400, 禁用时鼠标样式: 不可用, 鼠标悬停时边框颜色: 蓝色 500, 鼠标悬停时文本颜色: 蓝色 500 */
            className="min-w-[32px] h-8 px-1.5 border border-gray-300 bg-white rounded flex items-center justify-center disabled:text-gray-400 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-500"
          >
            &lt;
          </button>
          {Array.from({ length: Math.ceil(total / pageSize) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`min-w-[32px] h-8 px-1.5 border bg-white rounded flex items-center justify-center hover:border-blue-500 hover:text-blue-500 ${
                pageNum === i + 1
                  ? "border-blue-500 text-blue-500 font-medium"
                  : "border-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(pageNum + 1)}
            disabled={pageNum >= Math.ceil(total / pageSize)}
            className="min-w-[32px] h-8 px-1.5 border border-gray-300 bg-white rounded flex items-center justify-center disabled:text-gray-400 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-500"
          >
            &gt;
          </button>
        </div>
      )}

      {/* 添加文章模态框 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50">

          {/* 轻微透明背景，不遮挡内容，起到视觉聚焦、禁止背景交互的作用 */}
          <div
            className="absolute inset-0 bg-gray-100 opacity-50"
            style={{
              zIndex: 51,
            }}
          ></div>

          {/* 可拖拽的弹窗 - 整个弹窗可拖拽 */}
          <div
            // ref={modalRef}
            className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl absolute cursor-move left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-52"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
            }}
            onMouseDown={(e) => handleMouseDown(e)}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium select-none">添加文章</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                {/** 画一个 X 图标 */}
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddArticle}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  标题
                </label>
                <input
                  type="text"
                  name="title"
                  value={newArticle.title}
                  onChange={handleNewArticleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入文章标题"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  内容
                </label>
                <textarea
                  name="content"
                  value={newArticle.content}
                  onChange={handleNewArticleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入文章内容"
                  rows={8}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 bg-white border border-gray-300 rounded-md hover:bg-gray-100 font-medium"
                  disabled={isSubmitting}
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-500 text-white border border-blue-500 rounded-md hover:bg-blue-600 font-medium disabled:bg-blue-300 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "提交中..." : "提交"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 编辑文章模态框 */}
      {isEditModalOpen && editingArticle && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50">
          
          {/* 轻微透明背景，不遮挡内容，起到视觉聚焦、禁止背景交互的作用 */}
          <div
            className="absolute inset-0 bg-gray-100 opacity-50"
            style={{
              zIndex: 51,
            }}
          ></div>

          {/* 可拖拽的弹窗 - 整个弹窗可拖拽 */}
          <div
            // ref={editModalRef}
            className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl absolute cursor-move left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[52]"
            style={{
              transform: `translate(${editPosition.x}px, ${editPosition.y}px)`,
            }}
            onMouseDown={(e) => handleMouseDown(e)}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium select-none">编辑文章</h2>
              <button
                onClick={handleCloseEditModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleUpdateArticle}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  标题
                </label>
                <input
                  type="text"
                  name="title"
                  value={editingArticle.title}
                  onChange={handleEditArticleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入文章标题"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  内容
                </label>
                <textarea
                  name="content"
                  value={editingArticle.content}
                  onChange={handleEditArticleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入文章内容"
                  rows={8}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  className="px-5 py-2.5 bg-white border border-gray-300 rounded-md hover:bg-gray-100 font-medium"
                  disabled={isEditSubmitting}
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-500 text-white border border-blue-500 rounded-md hover:bg-blue-600 font-medium disabled:bg-blue-300 disabled:cursor-not-allowed"
                  disabled={isEditSubmitting}
                >
                  {isEditSubmitting ? "提交中..." : "提交"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
