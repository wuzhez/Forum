﻿// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from './node_modules/redux-thunk/es/index';
import error, { ErrorStore } from './Reducers/Error';
import post, { TopicState } from './Reducers/Post';
import userInfo, { UserInfoStore } from './Reducers/UserInfo';
import * as UserCenterActions from './Actions/UserCenter';
//import { getReturnOfExpression, getType } from 'react-redux-typescript';
import { routerReducer as router, RouterState, routerActions, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

function values<T>(o: { [s: string]: T }): T[] {
    return Object.keys(o).map(key => o[key]);
};

///**
// * Action构造函数的集合
// */
//const Actions = { ...UserCenterActions };
//const returnOfActions = values(Actions).map(getReturnOfExpression);

///**
// * 全部action的类型定义
// */
//export type RootAction = typeof returnOfActions[number];

/**
 * 全局store的类型定义
 */
export interface RootState {
    error: ErrorStore;
    post: TopicState;
    userInfo: UserInfoStore;
    router: RouterState;
}

/**
 * 合并reducer
 */
const reducer = combineReducers<RootState>({
    error,
    post,
    userInfo,
    router
});

export const history = createHistory();

/**
 * 连接到redux开发者工具
 */
const composeEnhancers: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, composeEnhancers(applyMiddleware(thunk, routerMiddleware(history))));