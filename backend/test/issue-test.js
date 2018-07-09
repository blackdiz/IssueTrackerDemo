'use strict';

const { assert } = require('chai');
const Account = require('../src/model/account.js');
const Project = require('../src/model/project');
const Issue = require('../src/model/issue');
const accountRepository = require('../src/repositories/account-repository');
const projectRepository = require('../src/repositories/project-repository');
const issueRepository = require('../src/repositories/issue_repository');
const transaction = require('../src/utils/transaction');
const moment = require('moment-timezone');

describe('issueRepository test', () => {
  let tx;
  let project;
  let savedIssue;

  before(async () => {
    tx = await transaction();
    project = await prepareAccountAndProject(tx);
  });

  describe('#saveIssueOfProject', () => {
    it('test save issue and related fk field', async () => {
      const issue = Object.assign(new Issue(), {
        title: 'test_issue',
        description: 'test_issue1',
        statusId: 1,
        priorityId: 1,
        tagId: 1,
        assignedAccount: 'test_name',
        estimateWorkHour: 8,
        estimateStartDate: '2018-06-01',
        estimateEndDate: '2018-07-30',
        finishedPercent: 80,
        creator: 'test_name'
      });
      savedIssue = await issueRepository.saveIssueOfProject(project, issue, tx);
      console.log(savedIssue);
      assert.exists(savedIssue);
      assert.exists(savedIssue.createTime);
      assert.exists(savedIssue.lastUpdateTime);
      assert.strictEqual(savedIssue.projectId, project.id);
      assert.strictEqual(savedIssue.title, issue.title);
      assert.strictEqual(savedIssue.description, issue.description);
      assert.strictEqual(savedIssue.statusId, issue.statusId);
      assert.strictEqual(savedIssue.priorityId, issue.priorityId);
      assert.strictEqual(savedIssue.tagId, issue.tagId);
      assert.strictEqual(savedIssue.assignedAccount, issue.assignedAccount);
      assert.strictEqual(savedIssue.estimateWorkHour, issue.estimateWorkHour);
      assert.strictEqual(savedIssue.estimateStartDate, issue.estimateStartDate);
      assert.strictEqual(savedIssue.estimateEndDate, issue.estimateEndDate);
      assert.strictEqual(savedIssue.finishedPercent, issue.finishedPercent);
      assert.strictEqual(savedIssue.creator, issue.creator);
    });
  });
  describe('#findAllIssuesOfProject', () => {
    it('find all issues of a project', async () => {
      const dbIssue = await issueRepository.findAllByProject(project, tx);
      console.log(dbIssue);
      console.log(dbIssue[0].createTime);
      console.log(dbIssue[0].lastUpdateTime);
      assert.strictEqual(dbIssue.length, 1);
      assert.deepEqual(dbIssue[0], savedIssue);
    });
  });
  after(async () => {
    await tx.commit();
  });
});

async function prepareAccountAndProject(tx) {
  const account = Object.assign(new Account(), {
    name: 'test_name',
    password: 'test_password',
    active: true
  });
  await accountRepository.save(account, tx);
  const project = Object.assign(new Project(), {
    id: 'test_project1',
    name: 'test_project1',
    isPublic: true,
    creator: 'test_name'
  });
  await projectRepository.saveProjectOfAccount(account, project, tx);

  return project;
}
