import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos 
    {props.repos.map(repo =>(<div>{repo.username} : <a href src={repo.url}>{repo.dbName}</a>  {repo.rank}</div> ) )}
  </div>
)

export default RepoList;