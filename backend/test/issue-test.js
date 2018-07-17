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

  beforeEach(async () => {
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
      const dbIssues = await issueRepository.findAllByProject(project, tx);
      console.log(`dbIssue: ${JSON.stringify(dbIssues)}`);
      const dbIssue = dbIssues[0];
      assert.strictEqual(dbIssue.title, savedIssue.title);
      assert.strictEqual(dbIssue.creator, savedIssue.creator);
      assert.strictEqual(dbIssue.priorityId, 1);
      assert.strictEqual(dbIssue.tagId, 1);
      assert.strictEqual(dbIssue.statusId, 1);
      const { priority, tag, status } = dbIssue;
      assert.strictEqual(priority.id, 1);
      assert.strictEqual(tag.id, 1);
      assert.strictEqual(status.id, 1);
    });
    it('find all dbIssues of a project with filter', async () => {
      const issue1 = Object.assign(new Issue(), {
        title: 'test_issue_1',
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
      const issue2 = Object.assign(new Issue(), {
        title: 'test_issue_2',
        description: 'test_issue1',
        statusId: 2,
        priorityId: 2,
        tagId: 2,
        assignedAccount: 'test_name',
        estimateWorkHour: 8,
        startDate: '2018-06-01',
        endDate: '2018-07-30',
        finishedPercent: 80,
        creator: 'test_name'
      });
      const issue3 = Object.assign(new Issue(), {
        title: 'test_issue_3',
        description: 'test_issue1',
        statusId: 3,
        priorityId: 3,
        tagId: 3,
        assignedAccount: 'test_name',
        estimateWorkHour: 8,
        startDate: '2018-06-01',
        endDate: '2018-07-30',
        finishedPercent: 80,
        creator: 'test_name'
      });
      const issue4 = Object.assign(new Issue(), {
        title: 'test_issue_4',
        description: 'test_issue1',
        statusId: 5,
        priorityId: 3,
        tagId: 3,
        assignedAccount: 'test_name',
        estimateWorkHour: 8,
        startDate: '2018-06-01',
        endDate: '2018-07-30',
        finishedPercent: 80,
        creator: 'test_name'
      });
      await issueRepository.addIssueToProject(project, issue1, tx);
      await issueRepository.addIssueToProject(project, issue2, tx);
      await issueRepository.addIssueToProject(project, issue3, tx);
      await issueRepository.addIssueToProject(project, issue4, tx);

      const filter1 = { tagId: 1 };
      const filter2 = { tagId: 2 };
      const filter3 = { tagId: 3 };
      const filter4 = { tagId: 3, statusId: 5 };

      const result1 = await issueRepository.findAllByProject(project, tx, filter1);
      const result2 = await issueRepository.findAllByProject(project, tx, filter2);
      const result3 = await issueRepository.findAllByProject(project, tx, filter3);
      const result4 = await issueRepository.findAllByProject(project, tx, filter4);

      console.log(result1);
      console.log(result2);
      console.log(result3);
      console.log(result4);

      assert.strictEqual(result1.length, 1);
      assert.strictEqual(result2.length, 1);
      assert.strictEqual(result3.length, 2);
      assert.strictEqual(result4.length, 1);
    });
  });
  afterEach(async () => {
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
