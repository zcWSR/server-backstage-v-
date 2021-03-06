import { Router } from 'express';
import logger from '../../utils/logger';


import loginCheck from '../../middleware/loginCheckMiddleware';
import * as PostService from '../../service/postService';
import ReturnJson from '../../utils/return-json';
import CatchAsyncError from '../../utils/catchAsyncError';
import * as ArticleService from '../../service/articleService';


/**
 * 
 * @param {Router} router 
 */
export default function (router) {
  router.get('/article/:id', CatchAsyncError(async (req, res) => {
    const id = req.params.id;
    const data = await ArticleService.queryOneById(id)
    ReturnJson.ok(res, data);
  }));

  router.get('/articles', CatchAsyncError(async (req, res) => {
    const rows = await ArticleService.queryAll();
    ReturnJson.ok(res, rows);
  }));

  router.post('/article/upload', loginCheck, CatchAsyncError(async (req, res) => {
    const article = req.body.article;
    await ArticleService.insertOne(article);
    ReturnJson.ok(res, '');
  }));

  router.post('/article/lock', loginCheck, CatchAsyncError(async (req, res) => {
    const id = req.body.id;
    const lock = eval(req.body.lock);
    const rows = await ArticleService.lockOne(id, lock);
    ReturnJson.ok(res, '');
  }));

  router.post('/article/delete', loginCheck, CatchAsyncError(async (req, res) => {
    const id = req.body.id;
    await ArticleService.deleteById(id);
    ReturnJson.ok(res, '');
  }))

  router.post('/article/update', loginCheck, CatchAsyncError(async (req, res) => {
    const id = req.body.id;
    const article = req.body.article;
    await ArticleService.updateOne(id, article);
    ReturnJson.ok(res, '');
  }));

  router.get('/article/report/:id', CatchAsyncError(async (req, res) => {
    const id  = req.params.id;
    await ArticleService.addViewHistory();
    ReturnJson.ok(res, '');
  }));
}
