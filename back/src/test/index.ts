import { reducer } from '../domain/reducer';
import { actions } from './test-data';

const [head, ...tail] = actions;
const state = reducer({} as any, head);

const res = tail.reduce(reducer, state);
console.log(JSON.stringify(res, null, 4));
