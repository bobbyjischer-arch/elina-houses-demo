import test from 'node:test';
import assert from 'node:assert/strict';
import {filterProjects,toggleSelection,readSelection,validateRequest,escapeHTML} from '../domain.js';
const fixtures=[{id:'a',type:'frame'},{id:'b',type:'module'},{id:'c',type:'sip'}];
// Breaks caught: ignored filter, duplicate/max selection, trusting storage, missing form validation, injected HTML.
test('all filter preserves all real records',()=>assert.deepEqual(filterProjects(fixtures,'all'),fixtures));
test('type filter excludes other technologies',()=>assert.deepEqual(filterProjects(fixtures,'module'),[{id:'b',type:'module'}]));
test('unknown filter yields empty state',()=>assert.deepEqual(filterProjects(fixtures,'nope'),[]));
test('selection adds known ID and removes selected ID',()=>{assert.deepEqual(toggleSelection(['a'],'b',['a','b','c'],3),['a','b']);assert.deepEqual(toggleSelection(['a','b'],'a',['a','b','c'],3),['b']);});
test('selection rejects unknown and enforces limit',()=>{assert.deepEqual(toggleSelection(['a','b'],'c',['a','b','c'],2),['a','b']);assert.deepEqual(toggleSelection(['a'],'z',['a','b','c'],3),['a']);});
test('storage sanitizes duplicate unknown and over-limit IDs',()=>assert.deepEqual(readSelection('["a","z","a","b","c"]',['a','b','c'],2),['a','b']));
test('malformed and non-array storage are harmless',()=>{for(const text of ['nope','null','{}','[2]',null])assert.deepEqual(readSelection(text,['a'],3),[]);});
test('empty form exposes all required errors',()=>assert.deepEqual(Object.keys(validateRequest({})).sort(),['consent','contact','goal','name']));
test('valid Telegram contact is accepted',()=>assert.deepEqual(validateRequest({goal:'live',name:'Анна',contact:'@anna_house',consent:true}),{}));
test('valid phone and email are accepted',()=>{for(const contact of ['+7 (999) 123-45-67','anna@example.com'])assert.deepEqual(validateRequest({goal:'live',name:'Анна',contact,consent:true}),{});});
test('rejects fabricated goal, bad contact and false consent',()=>assert.deepEqual(Object.keys(validateRequest({goal:'bogus',name:' ',contact:'abc',consent:false})).sort(),['consent','contact','goal','name']));
test('escapes markup and attributes',()=>assert.equal(escapeHTML('<img src="x" onerror=\'1\'>&'), '&lt;img src=&quot;x&quot; onerror=&#39;1&#39;&gt;&amp;'));
