import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import moviesRouter from './api/movies'; // 引入你的 movies 路由
import reviewsRouter from './api/reviews'; // 引入你的 reviews 路由
import favoritesRouter from './api/favorites'; // 引入你的 favorites 路由
import './db'; // 确保数据库连接成功
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// 中间件
app.use(cors()); // 允许跨域
app.use(express.json()); // 解析 JSON 格式的请求体
app.use(express.urlencoded({ extended: true })); // 解析 URL-encoded 格式请求体

// 路由
app.use('/api/movies', moviesRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/favorites', favoritesRouter);

// 错误处理中间件（必须放在所有路由之后）
app.use((err, req, res, next) => {
  console.error(err.stack); // 打印错误堆栈
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    status: err.status || 500,
  });
});

// 启动服务
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
