var fetch = require('node-fetch');

const baseURL = 'https://jobs.github.com/positions.json';

async function fetchGithub()
{
  let resultCount = 1, onPage = 0;
  const jobsList = [];

  while(resultCount > 0){
    const response = await fetch(`${baseURL}?page=${onPage}`);
    const jobs = await response.json();
    jobsList.push(...jobs);
    resultCount = jobs.length;
    console.log('got ' + jobs.length + ' jobs');
    onPage++;
  }
  
  console.log('got ' + jobsList.length + ' jobs in total');
}

fetchGithub();

module.exports = fetchGithub;