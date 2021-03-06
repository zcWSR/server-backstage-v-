import fs from 'fs';
import path from 'path';
import knex from 'knex';
import logger from '../utils/logger';

const dbFilePath = path.resolve(__dirname, 'db.sqlite');
export const db = knex({
  client: 'sqlite3',
  connection: {
    filename: dbFilePath
  },
  useNullAsDefault: true
});

export async function createPostTable() {
  if (await db.schema.hasTable('Post')) return;
  return await db.schema.createTable(`Post`, table => {
    table.uuid('id').primary();
    table.string('title');
    table.dateTime('create_at');
    table.dateTime('update_at');
    table.text('section');
    table.text('rest').nullable();
    table.integer('cate_id').references('Category.id');
    table.string('bg_color').nullable();
    table.text('bg_url').nullable();
    table.boolean('lock').defaultTo(false);
  }).then(() => {
    logger.info(`table 'Post' 準備完了`);
  }).catch(err => {
    logger.error(err);
  });
}

export async function createCategoryTable() {
  if (await db.schema.hasTable('Category')) return;
  return await db.schema.createTable(`Category`, table => {
    table.increments('id').primary();
    table.string('name');
  }).then(() => {
    logger.info(`table 'Category' 準備完了`);
  }).catch(err => {
    logger.error(err);
  });
}

export async function createLabelTable() {
  if (await db.schema.hasTable('Label')) return;
  return await db.schema.createTable(`Label`, table => {
    table.increments('id').primary();
    table.string('name');
  }).then(() => {
    logger.info(`table 'Label' 準備完了`);
  }).catch(err => {
    logger.error(err);
  });
}

export async function createPostLabelRelationTable() {
  if (await db.schema.hasTable('Post_Label_Relation')) return;
  return await db.schema.createTable(`Post_Label_Relation`, table => {
    table.increments('id').primary();
    table.string('post_id').references('Post.id').onDelete('CASCADE');
    table.integer('label_id').references('Label.id').onDelete('CASCADE');
  }).then(() => {
    logger.info(`table 'Post_Label_Relation' 準備完了`);
  }).catch(err => {
    logger.error(err);
  });
}

export async function createArticalTable() {
  if (await db.schema.hasTable('Article')) return;
  return await db.schema.createTable('Article', table => {
    table.increments('id').primary();
    table.string('title');
    table.string('route');
    table.string('short_name');
    table.text('content').nullable();
    table.dateTime('create_at');
    table.dateTime('update_at');
    table.boolean('lock').defaultTo(false);
    table.integer('bg_url').nullable();
    table.string('bg_color').nullable();
  }).then(() => {
    logger.info(`table 'Article' 準備完了`);
  }).catch(err => {
    logger.error(err);
  });
}

export async function createUserTable() {
  if (await db.schema.hasTable('User')) return;
  return await db.schema.createTable('User', table => {
    table.increments('id').primary();
    table.string('user_name').notNullable();
    table.string('password').notNullable();
    table.string('token');
  }).then(() => {
    logger.info(`table 'User' 準備完了`);
  }).catch(err => {
    logger.error(err);
  });
}

export async function createViewHistoryTable() {
  if (await db.schema.hasTable('View_History')) return;
  return await db.schema.createTable('View_History', table => {
    table.increments('id').primary();
    table.uuid('post_id').nullable();
    table.integer('article_id').nullable();
    table.dateTime('create_at');
  }).then(() => {
    logger.info(`table 'View_History' 準備完了`);
  }).catch(err => {
    logger.error(err);
  });
}

export async function createBlogConfigTable() {
  if (await db.schema.hasTable('Blog_Config')) return ;
  return await db.schema.createTable('Blog_Config', table => {
    table.increments('id').primary().defaultTo(1);
    table.string('page_title').defaultTo('zcWSR的个人博客');
    table.string('blog_name').defaultTo('zcWSR');
    table.string('slogen').defaultTo('靡不有初, 鲜克有终');
    table.string('top_icon_url').defaultTo('https://a.ppy.sh/1434197?1519206255.png');
    table.text('weibo_link').defaultTo('https://weibo.com/u/5969891367');
    table.text('github_link').defaultTo('https://github.com/zcWSR');
    table.text('mail_link').defaultTo('zhaocong@zcwsr.com');
    table.string('page_size').defaultTo(5);
    table.string('footer').defaultTo('自豪的使用Angular2');
    table.text('footer_link').defaultTo('http://angular.io');
    table.text('bg_url').defaultTo('http://files.zcwsr.com/server-backstage-v2/src/imgs/bg5.jpg');
    table.string('bg_color').defaultTo('#4e7cb4');
  }).then(() => {
    logger.info(`table 'Blog_Config' 準備完了`);
  }).catch(err => {
    logger.error(err);
  });
}

export async function createImageTable() {
  if (await db.schema.hasTable('Image')) return ;
  return await db.schema.createTable('Image', table => {
    table.increments('id').primary();
    table.string('name').unique();
    table.string('main_color');
    table.integer('size');
    table.integer('width');
    table.integer('height');
    table.dateTime('create_at');
  })
}

// export async function createRoleTable() {
//   if (await db.schema.hasTable('Role')) return;
//   return await db.schema.createTable('Role', table => {
//     table.increments('id').primary();
//     table.string('name');
//   }).then(() => {
//     logger.info(`table 'Role' 準備完了`);
//   }).catch(err => {
//     logger.error(err);
//   });
// }

// export async function createRightTable() {
//   if (await db.schema.hasTable('Right')) return;
//   return await db.schema.createTable('Right', table => {
//     table.increments('id').primary();
//     table.string('name');
//   }).then(() => {
//     logger.info(`table 'Right' 準備完了`);
//   }).catch(err => {
//     logger.error(err);
  // });
// }

// export async function createUserRoleRelationTable() {
//   if (await db.schema.hasTable('User_Role_Relation')) return;
//   return db.schema.createTable('User_Role_Relation', table => {
//     table.increments('id').primary();
//     table.integer('user_id').references('User.id').onDelete('CASCADE');
//     table.integer('role_id').references('Role.id').onDelete('CASCADE')
//   }).then(() => {
//     logger.info(`table 'User_Role_Relation' 準備完了`);
//   }).catch(err => {
//     logger.error(err);
//   });
// }

// export async function createRoleRightRelationTable() {
//   if (await db.schema.hasTable('Role_Right_Relation')) return;
//   return db.schema.createTable('Role_Right_Relation', table => {
//     table.increments('id').primary();
//     table.integer('role_id').references('Role.id').onDelete('CASCADE');
//     table.integer('right_id').references('Right.id').onDelete('CASCADE');
//   }).then(() => {
//     logger.info(`table 'Role_Right_Relation' 準備完了`);
//   }).catch(err => {
//     logger.error(err);
//   });
// }

// export async function createQQBotTable() {
//   if (await db.schema.hasTable('qq_bot')) return;
//   return db.schema.createTable('qq_bot', table => {
//     table.integer('group_id').primary();
//     table.text('config');
//   });
// }

export async function createAllTables() {
  return await Promise.all([
    createPostTable(),
    createCategoryTable(),
    createLabelTable(),
    createPostLabelRelationTable(),
    createArticalTable(),
    createUserTable(),
    createViewHistoryTable(),
    createBlogConfigTable(),
    createImageTable()
  ]).then(() => {
    logger.info('全ての tables 準備完了');
  }).catch(err => {
    logger.error(err);
  });
}