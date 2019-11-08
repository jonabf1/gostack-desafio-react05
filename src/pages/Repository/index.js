import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import {
  Loading,
  Span,
  IndexPages,
  Owner,
  IssuesList,
  IssueStatus,
} from './styles';
import Container from '../components/Container';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    issueType: [{ state: 'all' }, { state: 'open' }, { state: 'closed' }],
    issueIndex: 0,
    pageIndex: 0,
  };

  async componentDidMount() {
    const { match, issueType, issueIndex } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          per_page: 6,
          state: `all`,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  changeIndexIssue(index) {
    const { issueIndex } = this.state;
    this.setState({
      issueIndex: index,
    });
    this.loadNewIssues();
  }

  changeIndexPage(index) {
    const { pageIndex } = this.state;

    this.setState({
      pageIndex: index,
    });
    this.loadNewIssues();
  }

  async loadNewIssues() {
    const { issueType, issueIndex, pageIndex } = this.state;

    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        per_page: 6,
        state: `${issueType[issueIndex].state}`,
        page: pageIndex,
      },
    });

    this.setState({
      issues: issues.data,
    });
  }

  render() {
    const {
      repository,
      issues,
      loading,
      issueType,
      issueIndex,
      pageIndex,
    } = this.state;

    if (loading) {
      return <Loading>Loading</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Back to repositories</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueStatus active={issueIndex}>
          {issueType.map((item, index) => (
            <li onClick={() => this.changeIndexIssue(index)} key={item.state}>
              {item.state}
            </li>
          ))}
        </IssueStatus>
        <IssuesList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <Span colors={label.color} key={String(label.id)}>
                      {label.name}
                    </Span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssuesList>

        <IndexPages>
          <button
            disabled={pageIndex < 2}
            onClick={() => {
              this.changeIndexPage(pageIndex - 1);
            }}
          >
            Back
          </button>
          <span>Page {pageIndex}</span>
          <button
            onClick={() => {
              this.changeIndexPage(pageIndex + 1);
            }}
          >
            Next page
          </button>
        </IndexPages>
      </Container>
    );
  }
}
