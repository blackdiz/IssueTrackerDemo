'use strict';

const { assert } = require('chai');
const Account = require('../src/model/account.js');
const Project = require('../src/model/project');
const Issue = require('../src/model/issue');
const accountRepository = require('../src/repositories/account-repository');
const projectRepository = require('../src/repositories/project-repository');
const issueRepository = require('../src/repositories/issue-repository');
const transaction = require('../src/utils/transaction');

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
        startDate: '2018-06-01',
        endDate: '2018-07-30',
        finishedPercent: 80,
        creator: 'test_name'
      });
      savedIssue = await issueRepository.addIssueToProject(project, issue, tx);
      console.log(`savedIssue: ${savedIssue}`);
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
      assert.strictEqual(savedIssue.startDate, issue.startDate);
      assert.strictEqual(savedIssue.endDate, issue.endDate);
      assert.strictEqual(savedIssue.finishedPercent, issue.finishedPercent);
      assert.strictEqual(savedIssue.creator, issue.creator);
    });
  });
  describe('#findAllIssuesOfProject', () => {
    it('find all issues of a project', async () => {
      const dbIssue = await issueRepository.findAllByProject(project, tx);
      console.log(`dbIssue: ${dbIssue}`);
      assert.strictEqual(dbIssue.length, 1);
      assert.strictEqual(dbIssue[0].title, savedIssue.title);
      assert.strictEqual(dbIssue[0].creator, savedIssue.creator);
    });
  });
  after(async () => {
    await tx.rollback();
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
  await projectRepository.addProjectToAccount(account, project, tx);

  return project;
}
